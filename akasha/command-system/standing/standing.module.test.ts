import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Judging } from "../../checks-system/judging/judging.module.code.ts"
import { gitIn as git } from "../../testing-system/gitting/gitting.module.code.ts"
import { until } from "../../testing-system/waiting/waiting.module.code.ts"
import { landing } from "../landing/landing.module.code.ts"
import { A, ADMITS, bytes, MODULE_AT, TYPE } from "../landing/landing.module.test-fixtures.ts"
import { blobIdOf, type Reading } from "../reading/reading.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { movedOnDisk, reachedSince } from "./standing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGES = { "akasha/a.domain.ts": A, "akasha/domain.page-type.ts": TYPE }

const AT = "akasha/a.domain.ts"

const MOVED = "what stands on disk is not the body you read"

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-standing-")
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

function asRead(path: string, oid: string, mechanicalOid: string | null = null): Reading {
  return { path, oid, seenAt: 0, mechanicalOid }
}

const readA = (): Reading => asRead(AT, blobIdOf(bytes(A)))

test("a body standing at the object id it was read at has moved nothing", () => {
  const root = repoWith(PAGES)
  expect(movedOnDisk(root, [readA()])).toEqual([])
})

test("a body standing at another object id has moved", () => {
  const root = repoWith(PAGES)
  writeFileSync(join(root, AT), `${A}\n`)
  expect(movedOnDisk(root, [readA()])).toEqual([AT])
})

test("a body carried mechanically since it was read still stands for its reader", () => {
  const root = repoWith(PAGES)
  writeFileSync(join(root, AT), `${A}\n`)
  const held = asRead(AT, blobIdOf(bytes(A)), blobIdOf(bytes(`${A}\n`)))
  expect(movedOnDisk(root, [held])).toEqual([])
})

test("a path that will not read at all counts as moved rather than as standing", () => {
  const root = repoWith(PAGES)
  expect(movedOnDisk(root, [asRead("akasha/nowhere.ts", blobIdOf(bytes(A)))])).toEqual([
    "akasha/nowhere.ts",
  ])
})

test("a path no reading was recorded for is held to nothing", () => {
  const root = repoWith(PAGES)
  writeFileSync(join(root, AT), "moved with nobody watching")
  expect(movedOnDisk(root, [])).toEqual([])
})

test("a body standing as its writer read it is written rather than refused", () => {
  const root = repoWith(PAGES)
  const said = landing(
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

test("a body that moved on disk since its writer read it is refused unwritten", () => {
  const root = repoWith(PAGES)
  const held = readA()
  writeFileSync(join(root, AT), `${A}\n`)
  const said = landing(
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
while (!existsSync(${JSON.stringify(go)})) Bun.sleepSync(1)
const said = landing(
  ${JSON.stringify(root)},
  [{ path: ${JSON.stringify(AT)}, body: new TextEncoder().encode("written over") }],
  "held",
  { named: ["admits"], over: () => [] },
  null,
  null,
  [{ path: ${JSON.stringify(AT)}, oid: ${JSON.stringify(oid)}, seenAt: 0, mechanicalOid: null }]
)
console.log("refusals" in said ? said.refusals.join("\\n") : "landed")`,
    ],
    { stdout: "pipe" }
  )
  expect(await until(() => existsSync(ready))).toBe(true)
  const held = landing(root, [{ path: AT, body: bytes("moved by the other") }], "held", ADMITS)
  expect("refusals" in held).toBe(false)
  writeFileSync(go, "go")
  const said = await new Response(kid.stdout).text()
  await kid.exited
  expect(said).toContain(MOVED)
  expect(readFileSync(join(root, AT), "utf8")).toBe("moved by the other")
})

function landedMeanwhile(root: string, path: string, body: string): Judging {
  return {
    named: ["landed-meanwhile"],
    over: () => {
      const at = join(root, path)
      mkdirSync(join(at, ".."), { recursive: true })
      writeFileSync(at, body)
      git(root, ["add", "--", path])
      git(root, ["commit", "--quiet", "-m", "meanwhile", "--", path])
      return []
    },
  }
}

const headOf = (root: string): string => git(root, ["rev-parse", "HEAD"]).trim()

test("a commit reaching `akasha/` is named, and one reaching nothing under it is not", () => {
  const root = repoWith(PAGES)
  const base = headOf(root)
  expect(reachedSince(root, base, base)).toEqual([])
  writeFileSync(join(root, "outside.txt"), "elsewhere")
  git(root, ["add", "--", "outside.txt"])
  git(root, ["commit", "--quiet", "-m", "outside", "--", "outside.txt"])
  expect(reachedSince(root, base, headOf(root))).toEqual([])
  writeFileSync(join(root, "akasha/inside.txt"), "inside")
  git(root, ["add", "--", "akasha/inside.txt"])
  git(root, ["commit", "--quiet", "-m", "inside", "--", "akasha/inside.txt"])
  expect(reachedSince(root, base, headOf(root))).toEqual(["akasha/inside.txt"])
})

test("a commit reaching `akasha/` while the change was judged refuses it unwritten", () => {
  const root = repoWith(PAGES)
  const said = landing(
    root,
    [{ path: AT, body: bytes("written over") }],
    "held",
    landedMeanwhile(root, "akasha/meanwhile.txt", "landed inside")
  )
  expect("refusals" in said).toBe(true)
  expect("refusals" in said ? said.refusals.join("\n") : "").toContain("reaching `akasha/` landed")
  expect("refusals" in said ? said.refusals.join("\n") : "").toContain("akasha/meanwhile.txt")
  expect(readFileSync(join(root, AT), "utf8")).toBe(A)
})

test("a commit reaching nothing under `akasha/` while the change was judged refuses nothing", () => {
  const root = repoWith(PAGES)
  const said = landing(
    root,
    [{ path: AT, body: bytes("written over") }],
    "held",
    landedMeanwhile(root, "outside.txt", "landed elsewhere")
  )
  expect("refusals" in said).toBe(false)
  expect(readFileSync(join(root, AT), "utf8")).toBe("written over")
  expect(readFileSync(join(root, "outside.txt"), "utf8")).toBe("landed elsewhere")
})
