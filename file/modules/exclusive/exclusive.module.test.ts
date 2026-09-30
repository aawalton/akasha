import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { exclusively, writtenOver } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"

const PAGE = "turn.story-turn-played.ts"

const WAITED_MS = 5_000

const QUICK_MS = 1_000

const SHORT_MS = 50

const NOWHERE = "no-such-folder"

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("an act runs inside the turn, and no turn is left after it", () => {
  const root = scratch.rootFor("akasha-exclusive-")
  const at = join(root, PAGE)
  expect(exclusively(at, () => existsSync(`${at}.lock`))).toBe(true)
  expect(existsSync(`${at}.lock`)).toBe(false)
})

test("a turn that cannot be made is refused at once rather than waited on", () => {
  const root = scratch.rootFor("akasha-exclusive-")
  const at = join(root, NOWHERE, PAGE)
  let acted = false
  const from = Date.now()
  expect(() =>
    exclusively(
      at,
      () => {
        acted = true
      },
      WAITED_MS
    )
  ).toThrow(/could not be made/)
  expect(Date.now() - from).toBeLessThan(QUICK_MS)
  expect(acted).toBe(false)
})

test("a turn a live holder has is waited on and refused once the wait ends", () => {
  const root = scratch.rootFor("akasha-exclusive-")
  const at = join(root, PAGE)
  expect(() => exclusively(at, () => exclusively(at, () => true, SHORT_MS))).toThrow(
    /did not come free/
  )
  expect(existsSync(`${at}.lock`)).toBe(false)
})

test("an act that settles later keeps the turn until it settles, then gives it up", async () => {
  const root = scratch.rootFor("akasha-exclusive-")
  const at = join(root, PAGE)
  const held = exclusively(at, async () => {
    await Bun.sleep(SHORT_MS)
    return existsSync(`${at}.lock`)
  })
  expect(existsSync(`${at}.lock`)).toBe(true)
  expect(await held).toBe(true)
  expect(existsSync(`${at}.lock`)).toBe(false)
})

const APPENDING = `
const { appendFileSync, readFileSync } = require("node:fs")
const { exclusively } = require(process.env.CODE_AT)
let torn = 0
for (let turn = 0; turn < Number(process.env.TURNS); turn += 1) {
  exclusively(process.env.AT, () => appendFileSync(process.env.AT, "read " + turn + "\\n"))
  if (!readFileSync(process.env.AT, "utf8").startsWith("held\\n")) torn += 1
}
console.log(JSON.stringify(torn))
`

const TURNS = 300

test("a line another process appends while a file is written over is kept, and never seen torn", async () => {
  const at = join(scratch.rootFor("akasha-exclusive-"), PAGE)
  writeFileSync(at, "held\n")
  const other = Bun.spawn([process.execPath, "-e", APPENDING], {
    env: {
      ...process.env,
      CODE_AT: join(import.meta.dir, "exclusive.module.code.ts"),
      AT: at,
      TURNS: String(TURNS),
    },
    stdout: "pipe",
  })
  let writes = 0
  while (other.exitCode === null) {
    writtenOver(at, (text) => `${text}landed\n`)
    writtenOver(at, (text) => text.replace("landed\n", ""))
    writes += 1
    await Bun.sleep(1)
  }
  const torn = JSON.parse(await new Response(other.stdout).text()) as number
  const lines = readFileSync(at, "utf8").split("\n")
  expect(writes).toBeGreaterThan(10)
  expect(torn).toBe(0)
  for (let turn = 0; turn < TURNS; turn += 1) expect(lines).toContain(`read ${turn}`)
  expect(lines).not.toContain("landed")
})

test("a write over that answers nothing leaves the file as it was", () => {
  const at = join(scratch.rootFor("akasha-exclusive-"), PAGE)
  writeFileSync(at, "held\n")
  expect(writtenOver(at, () => null)).toBe(false)
  expect(readFileSync(at, "utf8")).toBe("held\n")
  expect(
    writtenOver(join(scratch.rootFor("akasha-exclusive-"), PAGE), (text) => `${text}new\n`)
  ).toBe(true)
})
