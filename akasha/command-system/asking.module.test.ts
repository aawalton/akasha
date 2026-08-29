import { expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { Asked } from "./asking.module.code.ts"
import { committedLine, judgedBy, landingAsked, passedOver } from "./asking.module.code.ts"
import { write } from "./command/write/write.command.code.ts"
import { UNNAMED } from "./landing.module.code.ts"

const CHECKS_AT = ".git/data/index/identity/check/slug"

const ADMITS_AT = "akasha/checks-system/check/admits/"

function git(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}

function put(root: string, path: string, body: string): string {
  const at = join(root, path)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, body)
  return at
}

function repoWith(
  named: Readonly<Record<string, string>> = { "akasha/one.ts": "committed\n" }
): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-asking-"))
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) put(root, path, body)
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  put(root, ".git/info/exclude", `${ADMITS_AT}\n`)
  checking(root, "admits", ADMITS)
  return root
}

let minted = 0

function checking(root: string, slug: string, body: string, phase = "patch"): void {
  const at = `akasha/checks-system/check/${slug}/${slug}.check.ts`
  const camel = slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
  put(
    root,
    at,
    `export const ${camel} = {\n  slug: "${slug}",\n  code: "ts",\n  runsOn: ["${phase}"],\n}\n`
  )
  put(root, `${at.slice(0, -".ts".length)}.code.ts`, body)
  minted = minted + 1
  const id = `01a04bc4-0000-7000-8000-${String(minted).padStart(12, "0")}`
  put(root, join(CHECKS_AT, `${slug}.jsonl`), `${JSON.stringify({ path: at, id })}\n`)
}

const REFUSES =
  "export function refuses(leaving) {\n" +
  '  return leaving.changed.map((path) => ({ path, reason: "refused for the test" }))\n' +
  "}\n"

const ADMITS = "export function admits() {\n  return []\n}\n"

const REFUSES_TAKING =
  "export function refusesTaking(leaving) {\n" +
  "  return leaving.changed\n" +
  "    .filter((path) => leaving.at(path) === null)\n" +
  '    .map((path) => ({ path, reason: "a check judged this going away" }))\n' +
  "}\n"

const headOf = (root: string): string => git(root, ["rev-parse", "HEAD"]).trim()

const givenIn = (root: string) => ({ root, calledAs: "akasha write", from: root, writer: null })

const bodyIn = (root: string): string => put(root, "body.txt", "proposed\n")

const bytes = (said: string): Uint8Array => new TextEncoder().encode(said)

function asking(over: Partial<Asked>): Asked {
  return {
    changes: [{ path: "akasha/two.ts", body: bytes("proposed\n") }],
    message: "held",
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: () => {
      throw new Error("a report that could not be built")
    },
    ...over,
  }
}

test("a report that could not be built leaves the landing standing, and says so", () => {
  const root = repoWith()
  const was = headOf(root)
  const said = landingAsked(givenIn(root), asking({}))
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(headOf(root)).not.toBe(was)
  expect(said.report).toContain("wrote akasha/two.ts")
  expect(said.report).toContain(`committed as ${headOf(root)}`)
  expect(said.report.join("\n")).toContain(
    "the report could not be built — a report that could not be built"
  )
  rmSync(root, { recursive: true })
})

test("a report that could not be built over a removal leaves the removal standing", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  const was = headOf(root)
  const said = landingAsked(
    givenIn(root),
    asking({ changes: [{ path: "akasha/two.ts", body: null }] })
  )
  expect(said.code).toBe(0)
  expect(headOf(root)).not.toBe(was)
  expect(said.report).toContain("took away akasha/two.ts")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  rmSync(root, { recursive: true })
})

test("a report that could not be built over a broken glass leaves the stamp on the commit", () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES)
  const said = landingAsked(givenIn(root), asking({ glass: "the checks are themselves broken" }))
  expect(said.code).toBe(0)
  expect(said.report).toContain(`committed as ${headOf(root)}`)
  expect(git(root, ["log", "-1", "--pretty=%B"])).toContain(
    "Checks-bypassed: the checks are themselves broken"
  )
  rmSync(root, { recursive: true })
})

function blocked(root: string): Asked {
  mkdirSync(join(root, "akasha/three.ts"), { recursive: true })
  return asking({
    changes: [
      { path: "akasha/two.ts", body: bytes("proposed\n") },
      { path: "akasha/three.ts", body: bytes("proposed\n") },
    ],
    saying: () => [],
  })
}

test("a landing that threw before its commit is operational rather than unclassified", () => {
  const root = repoWith()
  const was = headOf(root)
  const said = landingAsked(givenIn(root), blocked(root))
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals.join("\n")).toContain("nothing was committed")
  expect(said.refusals.join("\n")).toContain("akasha/three.ts")
  expect(headOf(root)).toBe(was)
  rmSync(root, { recursive: true })
})

test("a landing that threw before its commit leaves what it wrote outside any commit", () => {
  const root = repoWith()
  landingAsked(givenIn(root), blocked(root))
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe("proposed\n")
  expect(git(root, ["ls-tree", "--name-only", "HEAD", "akasha/two.ts"]).trim()).toBe("")
  rmSync(root, { recursive: true })
})

test("a commit that could not be named is said to stand rather than said to be nothing", () => {
  const held = { base: "held", wrote: ["akasha/two.ts"], took: [], noted: [] }
  expect(committedLine({ ...held, commit: UNNAMED })).toBe(
    "committed — the commit could not be named"
  )
  expect(committedLine({ ...held, commit: "c0ffee" })).toBe("committed as c0ffee")
  expect(committedLine({ ...held, commit: null })).toBe(
    "nothing was committed — what was asked for already stands"
  )
})

test("a dry run gates and writes nothing at all, index entry included", () => {
  const root = repoWith()
  const was = headOf(root)
  const from = put(root, "body.txt", 'import { one } from "./one.ts"\n')
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--dry-run"],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("nothing was written")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  expect(headOf(root)).toBe(was)
  expect(git(root, ["status", "--porcelain", "--", "akasha"]).trim()).toBe("")
  expect(existsSync(join(root, ".git/data/index/import"))).toBe(false)
  rmSync(root, { recursive: true })
})

test("a dry run over a change the checks refuse reports the refusal", () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES)
  const from = bodyIn(root)
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--dry-run"],
    givenIn(root)
  )
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  rmSync(root, { recursive: true })
})

test("a check is handed a removal, and can refuse it", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  checking(root, "refuses-taking", REFUSES_TAKING)
  const said = write(["--remove", "akasha/two.ts", "--dry-run"], givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("akasha/two.ts — a check judged this going away")
  rmSync(root, { recursive: true })
})

test("that same check lets a written body through, so it refuses the going and not the arriving", () => {
  const root = repoWith()
  checking(root, "refuses-taking", REFUSES_TAKING)
  const from = bodyIn(root)
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--dry-run"],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  rmSync(root, { recursive: true })
})

test("a gate counts the removal it judged beside the body it wrote, so a move is not doubled", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  checking(root, "admits", ADMITS)
  const from = bodyIn(root)
  const said = write(
    [
      "--file-path",
      "akasha/three.ts",
      "--content-file",
      from,
      "--remove",
      "akasha/two.ts",
      "--dry-run",
    ],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("1 check passed over the 2 paths asked for")
  rmSync(root, { recursive: true })
})

test("a pass names how many checks ran and how many paths they were handed", () => {
  expect(passedOver(1, 1)).toBe("1 check passed over the 1 path asked for")
  expect(passedOver(12, 6)).toBe("12 checks passed over the 6 paths asked for")
  expect(passedOver(0, 2)).toBe(
    "no check runs at this phase, so the 2 paths asked for went unjudged"
  )
})

test("a landing names what judged it, and says so when nothing did", () => {
  expect(judgedBy(1, 1)).toBe("1 check judged the 1 path asked for, and none refused")
  expect(judgedBy(0, 1)).toBe(
    "no check runs at this phase, so the 1 path asked for landed unjudged"
  )
})

test("a landing whose phase runs no check says the paths landed unjudged", () => {
  const root = repoWith()
  rmSync(join(root, CHECKS_AT, "admits.jsonl"))
  checking(root, "later", ADMITS, "deploy")
  const from = bodyIn(root)
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--message", "held"],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(said.report).toContain(
    "no check runs at this phase, so the 1 path asked for landed unjudged"
  )
  rmSync(root, { recursive: true })
})

test("breaking the glass runs no check and says so in the commit", () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES)
  const from = bodyIn(root)
  const said = write(
    [
      "--file-path",
      "akasha/two.ts",
      "--content-file",
      from,
      "--message",
      "held",
      "--break-the-glass",
      "the checks are themselves broken",
    ],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe("proposed\n")
  expect(git(root, ["log", "-1", "--pretty=%B"])).toContain(
    "Checks-bypassed: the checks are themselves broken"
  )
  rmSync(root, { recursive: true })
})

test("a dry run that breaks the glass is refused, having nothing to report", () => {
  const root = repoWith()
  const from = bodyIn(root)
  const said = write(
    [
      "--file-path",
      "akasha/two.ts",
      "--content-file",
      from,
      "--dry-run",
      "--break-the-glass",
      "why",
    ],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("report nothing")
  rmSync(root, { recursive: true })
})
