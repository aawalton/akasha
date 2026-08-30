import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, utimesSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { until } from "../../../testing-system/waiting/waiting.module.code.ts"
import {
  bodyFor,
  dropUncommitted,
  keepUncommitted,
  mergeUncommitted,
  nameFor,
  removeUncommitted,
  uncommittedIn,
} from "./page-uncommitted.module.code.ts"

const PAGE = "akasha/one/amy.seat.ts"

const BESIDE = "akasha/one/amy.seat.uncommitted.ts"

const LOCK = `${BESIDE}.lock`

const CODE_AT = join(dirname(import.meta.path), "page-uncommitted.module.code.ts")

const OWNERS = ["beats", "gateway", "usage"]

const ROUNDS = 6

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-uncommitted-")
  mkdirSync(join(root, dirname(PAGE)), { recursive: true })
  return root
}

function standing(root: string, body: string): undefined {
  writeFileSync(join(root, BESIDE), body, "utf8")
}

function bunning(said: string): Bun.Subprocess {
  return Bun.spawn(["bun", "-e", said], { stderr: "inherit", stdout: "inherit" })
}

function merging(root: string, key: string, ready: string, go: string): string {
  return `import { mergeUncommitted } from ${JSON.stringify(CODE_AT)}
import { existsSync, writeFileSync } from "node:fs"
writeFileSync(${JSON.stringify(ready)}, "ready")
while (!existsSync(${JSON.stringify(go)})) Bun.sleepSync(1)
for (let n = 0; n < ${ROUNDS}; n += 1) {
  mergeUncommitted(${JSON.stringify(root)}, ${JSON.stringify(PAGE)}, { ${key}: n })
}`
}

function keeping(root: string, rounds: number, size: number): string {
  return `import { keepUncommitted } from ${JSON.stringify(CODE_AT)}
const body = "x".repeat(${size})
for (let n = 0; n < ${rounds}; n += 1) {
  keepUncommitted(${JSON.stringify(root)}, ${JSON.stringify(PAGE)}, { n, body })
}`
}

async function gonePid(): Promise<number> {
  const kid = bunning("Bun.sleepSync(60000)")
  kid.kill("SIGKILL")
  await kid.exited
  return kid.pid
}

function locked(root: string, mark: string): string {
  const lock = join(root, LOCK)
  mkdirSync(lock)
  writeFileSync(join(lock, "held-by"), mark, "utf8")
  return lock
}

test("a page with no file beside it carries no uncommitted values", () => {
  expect(uncommittedIn(rooted(), PAGE)).toBeNull()
})

test("what is kept beside a page is read back from it", () => {
  const root = rooted()
  keepUncommitted(root, PAGE, { claudeCodeSessionUuid: "one", beats: 3 })
  expect(uncommittedIn(root, PAGE)).toEqual({ claudeCodeSessionUuid: "one", beats: 3 })
})

test("what is kept stands beside the page under the reserved tail", () => {
  const root = rooted()
  keepUncommitted(root, PAGE, { held: "one" })
  expect(existsSync(join(root, BESIDE))).toBe(true)
})

test("keeping again replaces what stood there", () => {
  const root = rooted()
  keepUncommitted(root, PAGE, { held: "one" })
  keepUncommitted(root, PAGE, { held: "two" })
  expect(uncommittedIn(root, PAGE)).toEqual({ held: "two" })
})

test("a file that stands but will not load is refused rather than read as empty", () => {
  const root = rooted()
  standing(root, "export const amySeatUncommitted = (\n")
  expect(() => uncommittedIn(root, PAGE)).toThrow(/could not be loaded/)
})

test("a file that loads declaring nothing is refused rather than read as empty", () => {
  const root = rooted()
  standing(root, "export const amySeatUncommitted = 7\n")
  expect(() => uncommittedIn(root, PAGE)).toThrow(/declares no values/)
})

test("merging keeps what stands and sets only the keys it names", () => {
  const root = rooted()
  keepUncommitted(root, PAGE, { held: "one", beats: 1 })
  mergeUncommitted(root, PAGE, { beats: 2, gateway: "up" })
  expect(uncommittedIn(root, PAGE)).toEqual({ held: "one", beats: 2, gateway: "up" })
})

test("merging where nothing stands writes what it was handed", () => {
  const root = rooted()
  mergeUncommitted(root, PAGE, { beats: 1 })
  expect(uncommittedIn(root, PAGE)).toEqual({ beats: 1 })
})

test("dropping named keys leaves the rest standing", () => {
  const root = rooted()
  keepUncommitted(root, PAGE, { held: "one", beats: 1, gateway: "up" })
  dropUncommitted(root, PAGE, ["beats", "never stood"])
  expect(uncommittedIn(root, PAGE)).toEqual({ held: "one", gateway: "up" })
  expect(existsSync(join(root, BESIDE))).toBe(true)
})

test("dropping keys of a page carrying nothing is an answer rather than a failure", () => {
  const root = rooted()
  expect(() => dropUncommitted(root, PAGE, ["beats"])).not.toThrow()
  expect(existsSync(join(root, BESIDE))).toBe(false)
})

test("removing takes the file away, and the page carries nothing again", () => {
  const root = rooted()
  keepUncommitted(root, PAGE, { held: "one" })
  removeUncommitted(root, PAGE)
  expect(existsSync(join(root, BESIDE))).toBe(false)
  expect(uncommittedIn(root, PAGE)).toBeNull()
})

test("removing what never stood is an answer rather than a failure", () => {
  expect(() => removeUncommitted(rooted(), PAGE)).not.toThrow()
})

test("the exported name carries the page's own name", () => {
  expect(nameFor(PAGE)).toBe("amySeatUncommitted")
  expect(nameFor("akasha/one/file-length.check.ts")).toBe("fileLengthCheckUncommitted")
})

test("what is written is a page's own shape, so one loader answers both", () => {
  expect(bodyFor(PAGE, { held: "one" })).toBe(
    'export const amySeatUncommitted = {\n  "held": "one"\n} as const\n'
  )
})

test("a path that is no TypeScript file holds nothing and is refused for keeping", () => {
  const root = rooted()
  expect(uncommittedIn(root, "akasha/one/notes.txt")).toBeNull()
  expect(() => keepUncommitted(root, "akasha/one/notes.txt", {})).toThrow(/no TypeScript file/)
  expect(() => mergeUncommitted(root, "akasha/one/notes.txt", {})).toThrow(/no TypeScript file/)
})

test("a write takes the lock and leaves none standing after it", () => {
  const root = rooted()
  keepUncommitted(root, PAGE, { held: "one" })
  mergeUncommitted(root, PAGE, { beats: 1 })
  dropUncommitted(root, PAGE, ["beats"])
  removeUncommitted(root, PAGE)
  expect(existsSync(join(root, LOCK))).toBe(false)
})

test("the lock is released however the act inside it ends", () => {
  const root = rooted()
  standing(root, "export const amySeatUncommitted = (\n")
  expect(() => mergeUncommitted(root, PAGE, { beats: 1 })).toThrow(/could not be loaded/)
  expect(existsSync(join(root, LOCK))).toBe(false)
  keepUncommitted(root, PAGE, { beats: 1 })
  expect(uncommittedIn(root, PAGE)).toEqual({ beats: 1 })
})

test("writers owning different keys of one page keep all of them", async () => {
  const root = rooted()
  const go = join(root, "go")
  const readied = OWNERS.map((one) => join(root, `readied-${one}`))
  keepUncommitted(root, PAGE, { stood: "first" })
  const kids = OWNERS.map((one, at) => bunning(merging(root, one, readied[at] ?? "", go)))
  expect(await until(() => readied.every(existsSync))).toBe(true)
  writeFileSync(go, "go")
  expect(await Promise.all(kids.map((one) => one.exited))).toEqual(OWNERS.map(() => 0))
  expect(uncommittedIn(root, PAGE)).toEqual({
    stood: "first",
    beats: ROUNDS - 1,
    gateway: ROUNDS - 1,
    usage: ROUNDS - 1,
  })
  expect(existsSync(join(root, LOCK))).toBe(false)
})

test("a lock left by a process that is gone is taken rather than waited on", async () => {
  const root = rooted()
  keepUncommitted(root, PAGE, { held: "one" })
  locked(root, `${await gonePid()} 1`)
  const from = Date.now()
  mergeUncommitted(root, PAGE, { beats: 1 })
  expect(Date.now() - from).toBeLessThan(3000)
  expect(uncommittedIn(root, PAGE)).toEqual({ held: "one", beats: 1 })
})

test("a lock whose pid stands for another process than the one that took it is no lock", () => {
  const root = rooted()
  locked(root, `${process.pid} 1`)
  const from = Date.now()
  keepUncommitted(root, PAGE, { held: "one" })
  expect(Date.now() - from).toBeLessThan(3000)
  expect(uncommittedIn(root, PAGE)).toEqual({ held: "one" })
})

test("a lock naming no holder that can be read wedges nothing once it has stood too long", () => {
  const root = rooted()
  const lock = locked(root, "nothing a holder reads from")
  const long = new Date(Date.now() - 60000)
  utimesSync(lock, long, long)
  const from = Date.now()
  keepUncommitted(root, PAGE, { held: "one" })
  expect(Date.now() - from).toBeLessThan(3000)
  expect(uncommittedIn(root, PAGE)).toEqual({ held: "one" })
})

test("a reader reading through a write never sees a partial body", async () => {
  const root = rooted()
  const kid = bunning(keeping(root, 600, 40000))
  let read = 0
  while (kid.exitCode === null && read < 60) {
    const held = uncommittedIn(root, PAGE)
    if (held !== null) expect(Object.keys(held).length).toBe(2)
    read += 1
    await Bun.sleep(1)
  }
  expect(await kid.exited).toBe(0)
  expect(read).toBeGreaterThan(9)
  expect(uncommittedIn(root, PAGE)).not.toBeNull()
})
