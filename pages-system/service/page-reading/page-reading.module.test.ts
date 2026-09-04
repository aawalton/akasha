import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { said as gitIn } from "@akasha/git/git-running"
import { namedIn, type Placing, placedIn, reading, refusalIn } from "./page-reading.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const A_PAGE = "akasha/a-page.module.ts"

const A_SECRET = "akasha/a-page.module.sops.yaml"

const AN_UNCOMMITTED = "akasha/a-page.module.uncommitted.ts"

const NOT_A_SECRET = "held: a fixture standing where a secret would\n"

const nowhere: Placing = () => []

function placedAt(...paths: readonly string[]): Placing {
  return () => paths.map((one) => ({ path: one }))
}

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-page-reading-")
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  return root
}

test("a read carrying neither a path nor a page is refused", () => {
  expect(refusalIn({})).toContain("at least one path")
})

test("a path outside akasha is refused", () => {
  expect(refusalIn({ paths: ["tools/a.ts"] })).toContain("outside")
})

test("a path reaching above the root is refused", () => {
  expect(refusalIn({ paths: ["akasha/../tools/a.ts"] })).toContain("above the root")
})

test("a page naming an empty slug is refused", () => {
  expect(refusalIn({ pages: [{ pageTypeSlug: "module", slug: "" }] })).toContain("neither is empty")
})

test("a path inside akasha is taken", () => {
  expect(refusalIn({ paths: [A_PAGE] })).toBe(null)
})

test("a page is named by its page type and its slug", () => {
  expect(namedIn({ pageTypeSlug: "module", slug: "a-page" })).toBe("module/a-page")
})

test("a page the index places nowhere is said to be unplaced", () => {
  const said = placedIn(
    "/nowhere",
    { pages: [{ pageTypeSlug: "module", slug: "a-page" }] },
    nowhere
  )
  expect("unplaced" in said && said.unplaced).toEqual(["module/a-page"])
})

test("a page the index places is answered as the path it stands at", () => {
  const places = placedAt(A_PAGE)
  const said = placedIn("/nowhere", { pages: [{ pageTypeSlug: "module", slug: "a-page" }] }, places)
  expect("paths" in said && said.paths).toEqual([A_PAGE])
})

test("a page the index places at more than one path refuses the read", () => {
  const places = placedAt(A_PAGE, "akasha/another.module.ts")
  const said = placedIn("/nowhere", { pages: [{ pageTypeSlug: "module", slug: "a-page" }] }, places)
  expect("refused" in said && said.refused).toContain("2 paths")
})

test("a read answers with the whole body standing at a path", () => {
  const root = repoWith({ [A_PAGE]: "the whole body\n" })
  const said = reading({ root }, { paths: [A_PAGE] }, nowhere)
  expect("refused" in said).toBe(false)
  if ("refused" in said) return
  expect(said.bodies[0]?.content).toBe("the whole body\n")
})

test("a read names the commit its bodies were read at", () => {
  const root = repoWith({ [A_PAGE]: "one" })
  const said = reading({ root }, { paths: [A_PAGE] }, nowhere)
  if ("refused" in said) throw new Error(said.refused)
  expect(said.at).toBe(gitIn(root, ["rev-parse", "HEAD"]).trim())
})

test("a body is read out of the commit rather than off the working tree", () => {
  const root = repoWith({ [A_PAGE]: "committed" })
  writeFileSync(join(root, A_PAGE), "dirty in the worktree")
  const said = reading({ root }, { paths: [A_PAGE] }, nowhere)
  if ("refused" in said) throw new Error(said.refused)
  expect(said.bodies[0]?.content).toBe("committed")
})

test("a path the commit does not carry answers as nothing", () => {
  const root = repoWith({ [A_PAGE]: "one" })
  const said = reading({ root }, { paths: ["akasha/no-such-file.ts"] }, nowhere)
  if ("refused" in said) throw new Error(said.refused)
  expect(said.bodies[0]?.content).toBe(null)
})

test("every body one read answers with is read at that one commit", () => {
  const root = repoWith({ [A_PAGE]: "one", "akasha/two.module.ts": "two" })
  const said = reading({ root }, { paths: [A_PAGE, "akasha/two.module.ts"] }, nowhere)
  if ("refused" in said) throw new Error(said.refused)
  expect(said.bodies.map((one) => one.content)).toEqual(["one", "two"])
})

test("a page named by page type and slug is read without its path being known", () => {
  const root = repoWith({ [A_PAGE]: "the whole body\n" })
  const places = placedAt(A_PAGE)
  const asked = { pages: [{ pageTypeSlug: "module", slug: "a-page" }] }
  const said = reading({ root }, asked, places)
  if ("refused" in said) throw new Error(said.refused)
  expect(said.bodies[0]?.path).toBe(A_PAGE)
  expect(said.bodies[0]?.content).toBe("the whole body\n")
})

test("a commit landing after a read leaves that read's commit standing", () => {
  const root = repoWith({ [A_PAGE]: "one" })
  const before = reading({ root }, { paths: [A_PAGE] }, nowhere)
  writeFileSync(join(root, A_PAGE), "two")
  gitIn(root, ["commit", "--quiet", "-a", "-m", "second"])
  const after = reading({ root }, { paths: [A_PAGE] }, nowhere)
  if ("refused" in before || "refused" in after) throw new Error("both reads were meant to answer")
  expect(before.at).not.toBe(after.at)
  expect(before.bodies[0]?.content).toBe("one")
  expect(after.bodies[0]?.content).toBe("two")
})

test("a root that is no repository is refused rather than thrown", () => {
  const said = reading({ root: "/var/tmp/no-such-root-stands-here" }, { paths: [A_PAGE] }, nowhere)
  expect("refused" in said).toBe(true)
})

test("a path holding a page's secret values is refused", () => {
  expect(refusalIn({ paths: [A_SECRET] })).toContain("no secret")
})

test("a path holding a page's uncommitted values is refused", () => {
  expect(refusalIn({ paths: [AN_UNCOMMITTED] })).toContain("no uncommitted value")
})

test("a secret the commit carries is refused rather than answered", () => {
  const root = repoWith({ [A_PAGE]: "one", [A_SECRET]: NOT_A_SECRET })
  const said = reading({ root }, { paths: [A_SECRET] }, nowhere)
  expect("refused" in said && said.refused).toContain("no secret")
})

test("a refusal over a secret is told apart from a body the commit does not carry", () => {
  const root = repoWith({ [A_PAGE]: "one", [A_SECRET]: NOT_A_SECRET })
  const missing = reading({ root }, { paths: ["akasha/no-such-file.ts"] }, nowhere)
  const withheld = reading({ root }, { paths: [A_SECRET] }, nowhere)
  if ("refused" in missing) throw new Error(missing.refused)
  expect(missing.bodies[0]?.content).toBe(null)
  expect("refused" in withheld).toBe(true)
})

test("a page the index places at a secret is refused rather than answered", () => {
  const root = repoWith({ [A_SECRET]: NOT_A_SECRET })
  const asked = { pages: [{ pageTypeSlug: "module", slug: "a-page" }] }
  const said = reading({ root }, asked, placedAt(A_SECRET))
  expect("refused" in said && said.refused).toContain("no secret")
})

test("a read carrying one secret among ordinary paths is refused whole", () => {
  const root = repoWith({ [A_PAGE]: "one", [A_SECRET]: NOT_A_SECRET })
  const said = reading({ root }, { paths: [A_PAGE, A_SECRET] }, nowhere)
  expect("refused" in said).toBe(true)
})
