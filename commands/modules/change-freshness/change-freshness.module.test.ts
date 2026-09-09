import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Judging } from "@akasha/checks/judging"
import { said as git } from "@akasha/git/git-running"
import { until } from "@akasha/testing-system/waiting"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { landing } from "../landing/landing.module.code.ts"
import { A, ADMITS, bytes, MODULE_AT, TYPE } from "../landing/landing.module.test-fixtures.ts"
import { blobIdOf, type Reading } from "../reading/reading.module.code.ts"
import { commitNamed, movedOnDisk, reachedSince, unfresh } from "./change-freshness.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGES = { "akasha/a.domain.ts": A, "akasha/domain.page-type.ts": TYPE }

const AT = "akasha/a.domain.ts"

const MOVED = "what is on disk is not the body you read"

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-freshness-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

const headOf = (root: string): string => git(root, ["rev-parse", "HEAD"]).trim()

function asRead(path: string, oid: string, carriedOid: string | null = null): Reading {
  return { path, oid, seenAt: 0, carriedOid }
}

const readA = (): Reading => asRead(AT, blobIdOf(bytes(A)))

test("a body at the object id it was read at has moved nothing", () => {
  const root = repoWith(PAGES)
  expect(movedOnDisk(root, headOf(root), [readA()])).toEqual([])
})

test("a body at another object id has moved", () => {
  const root = repoWith(PAGES)
  writeFileSync(join(root, AT), `${A}\n`)
  expect(movedOnDisk(root, headOf(root), [readA()])).toEqual([AT])
})

test("a body carried mechanically since it was read still holds for its reader", () => {
  const root = repoWith(PAGES)
  writeFileSync(join(root, AT), `${A}\n`)
  const held = asRead(AT, blobIdOf(bytes(A)), blobIdOf(bytes(`${A}\n`)))
  expect(movedOnDisk(root, headOf(root), [held])).toEqual([])
})

test("a path the base holds a body at whose body will not read counts as moved", () => {
  const root = repoWith(PAGES)
  rmSync(join(root, AT))
  expect(movedOnDisk(root, headOf(root), [readA()])).toEqual([AT])
})

test("a path the base holds nothing at and disk holds nothing at has moved nothing", () => {
  const root = repoWith(PAGES)
  const held = asRead("akasha/nowhere.ts", blobIdOf(bytes(A)))
  expect(movedOnDisk(root, headOf(root), [held])).toEqual([])
})

test("a path no reading was recorded for is held to nothing", () => {
  const root = repoWith(PAGES)
  writeFileSync(join(root, AT), "moved with nobody watching")
  expect(movedOnDisk(root, headOf(root), [])).toEqual([])
})

test("a body still as its writer read it is written rather than refused", async () => {
  const root = repoWith(PAGES)
  const said = await landing(
    root,
    [{ path: AT, body: bytes("written over") }],
    "held",
    ADMITS,
    null,
    null,
    [readA()]
  )
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, AT), "utf8")).toBe("written over")
})

test("a body that moved on disk since its writer read it is refused unwritten", async () => {
  const root = repoWith(PAGES)
  const held = readA()
  writeFileSync(join(root, AT), `${A}\n`)
  const said = await landing(
    root,
    [{ path: AT, body: bytes("written over") }],
    "held",
    ADMITS,
    null,
    null,
    [held]
  )
  expect("refusals" in said).toBe(true)
  expect("refusals" in said ? said.refusals.join("\n") : "").toContain(MOVED)
  expect(readFileSync(join(root, AT), "utf8")).toBe(`${A}\n`)
})

test("a body another landing moved while this one waited is refused, and that body is not lost", async () => {
  const root = repoWith(PAGES)
  const oid = blobIdOf(bytes(A))
  const ready = join(root, "ready")
  const go = join(root, "go")
  const kid = Bun.spawn(
    [
      "bun",
      "-e",
      `import { landing } from ${JSON.stringify(MODULE_AT)}
import { existsSync, writeFileSync } from "node:fs"
writeFileSync(${JSON.stringify(ready)}, "ready")
const deadline = Date.now() + 60000
while (!existsSync(${JSON.stringify(go)})) {
  if (Date.now() > deadline) process.exit(1)
  Bun.sleepSync(1)
}
const said = await landing(
  ${JSON.stringify(root)},
  [{ path: ${JSON.stringify(AT)}, body: new TextEncoder().encode("written over") }],
  "held",
  { named: ["admits"], over: async () => [] },
  null,
  null,
  [{ path: ${JSON.stringify(AT)}, oid: ${JSON.stringify(oid)}, seenAt: 0, carriedOid: null }]
)
console.log("refusals" in said ? said.refusals.join("\\n") : "landed")`,
    ],
    { stdout: "pipe" }
  )
  try {
    expect(await until(() => existsSync(ready))).toBe(true)
    const held = await landing(
      root,
      [{ path: AT, body: bytes("moved by the other") }],
      "held",
      ADMITS
    )
    expect("refusals" in held).toBe(false)
    writeFileSync(go, "go")
    const said = await new Response(kid.stdout).text()
    await kid.exited
    expect(said).toContain(MOVED)
    expect(readFileSync(join(root, AT), "utf8")).toBe("moved by the other")
  } finally {
    kid.kill()
  }
})

function landedMeanwhile(root: string, path: string, body: string): Judging {
  return {
    named: ["landed-meanwhile"],
    checksFor: () => ["landed-meanwhile"],
    over: async () => {
      const at = join(root, path)
      mkdirSync(join(at, ".."), { recursive: true })
      writeFileSync(at, body)
      git(root, ["add", "--", path])
      git(root, ["commit", "--quiet", "-m", "meanwhile", "--", path])
      return []
    },
  }
}

test("a commit reaching the tree is named, and a base that is already head names nothing", () => {
  const root = repoWith(PAGES)
  const base = headOf(root)
  expect(reachedSince(root, base, base)).toEqual([])
  writeFileSync(join(root, "akasha/inside.txt"), "inside")
  git(root, ["add", "--", "akasha/inside.txt"])
  git(root, ["commit", "--quiet", "-m", "inside", "--", "akasha/inside.txt"])
  expect(reachedSince(root, base, headOf(root))).toEqual(["akasha/inside.txt"])
})

test("a commit reaching `akasha/` while the change was judged refuses nothing", async () => {
  const root = repoWith(PAGES)
  const said = await landing(
    root,
    [{ path: AT, body: bytes("written over") }],
    "held",
    landedMeanwhile(root, "akasha/meanwhile.txt", "landed inside")
  )
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, AT), "utf8")).toBe("written over")
  expect(readFileSync(join(root, "akasha/meanwhile.txt"), "utf8")).toBe("landed inside")
})

test("a name git resolves to one commit is answered as that commit", () => {
  const root = repoWith(PAGES)
  const head = headOf(root)
  expect(commitNamed(root, "HEAD")).toBe(head)
  expect(commitNamed(root, head)).toBe(head)
})

test("a name resolving to no commit is answered as nothing", () => {
  const root = repoWith(PAGES)
  expect(commitNamed(root, "no-such-ref")).toBe(null)
})

test("a body on disk that is not the body read is answered as moved, with the tail last", () => {
  const root = repoWith(PAGES)
  const held = readA()
  writeFileSync(join(root, AT), "moved")
  const said = unfresh(root, null, headOf(root), [AT], [held], "tail")
  expect(said?.[0]).toContain(MOVED)
  expect(said?.at(-1)).toBe("tail")
})

test("a body on disk that is the body read is answered as nothing", () => {
  const root = repoWith(PAGES)
  expect(unfresh(root, null, headOf(root), [AT], [readA()], "tail")).toBe(null)
})

test("a commit reaching nothing under `akasha/` while the change was judged refuses nothing", async () => {
  const root = repoWith(PAGES)
  const said = await landing(
    root,
    [{ path: AT, body: bytes("written over") }],
    "held",
    landedMeanwhile(root, "outside.txt", "landed elsewhere")
  )
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, AT), "utf8")).toBe("written over")
  expect(readFileSync(join(root, "outside.txt"), "utf8")).toBe("landed elsewhere")
})
