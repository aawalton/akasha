import { afterAll, expect, test } from "bun:test"
import { chmodSync, readdirSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { writeFileAtomicSync } from "akasha/file/system/modules/atomic-write/atomic-write.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const OLD = "a".repeat(300_000)

const NEW = "b".repeat(600_000)

const READER = `
const { readFileSync } = require("node:fs")
const seen = new Set()
const until = Date.now() + Number(process.env.READ_FOR_MS)
while (Date.now() < until) seen.add(readFileSync(process.env.READ_AT, "utf8").length)
console.log(JSON.stringify([...seen]))
`

test("a reader reading while a large body is written over and over sees only whole bodies", async () => {
  const at = join(scratch.rootFor("akasha-atomic-write-"), "page.ts")
  writeFileSync(at, OLD)
  const reader = Bun.spawn([process.execPath, "-e", READER], {
    env: { ...process.env, READ_AT: at, READ_FOR_MS: "900" },
    stdout: "pipe",
  })
  const until = Date.now() + 700
  let turn = 0
  while (Date.now() < until) {
    writeFileAtomicSync(at, turn % 2 === 0 ? NEW : OLD)
    turn += 1
    await Bun.sleep(2)
  }
  const seen = JSON.parse(await new Response(reader.stdout).text()) as number[]
  await reader.exited
  expect(turn).toBeGreaterThan(10)
  expect(seen.length).toBeGreaterThan(0)
  expect(seen.every((length) => length === OLD.length || length === NEW.length)).toBe(true)
})

test("a body written over a file keeps that file's mode and leaves nothing beside it", () => {
  const root = scratch.rootFor("akasha-atomic-mode-")
  const at = join(root, "run.sh")
  writeFileSync(at, "old")
  chmodSync(at, 0o755)
  writeFileAtomicSync(at, "new", { keepMode: true })
  expect(statSync(at).mode & 0o777).toBe(0o755)
  expect(readdirSync(root)).toEqual(["run.sh"])
})
