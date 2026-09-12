import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "akasha/agents/read-record/read-record.module.code.ts"
import { owing } from "akasha/commands/pages/read/modules/body-owing/body-owing.module.code.ts"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a04e96-c80a-79ef-819f-a455a96a0e54"

const ONE = "akasha/one.ts"

const TWO = "akasha/two.ts"

const BODY = "one\n"

function rooted(): string {
  const root = scratch.rootFor("body-owing-")
  for (const at of [ONE, TWO]) {
    const said = join(root, at)
    mkdirSync(said.slice(0, said.lastIndexOf("/")), { recursive: true })
    writeFileSync(said, BODY)
  }
  return root
}

function left(root: string) {
  return [ONE, TWO].map((named) => ({ named, absolute: join(root, named) }))
}

function reading(path: string, body: string, through: number | null) {
  return { path, oid: blobIdOf(bytesOf(body)), seenAt: 1, carriedOid: null, readThrough: through }
}

test("a body the record holds whole is owed nothing, and the rest keep their order", () => {
  const root = rooted()
  recordRead(root, AGENT, reading(ONE, BODY, null))
  expect(owing(root, AGENT, left(root)).map((one) => one.named)).toEqual([TWO])
})

test("a body that moved is owed, and so is one the agent read only part of", () => {
  const root = rooted()
  recordRead(root, AGENT, reading(ONE, "other\n", null))
  recordRead(root, AGENT, reading(TWO, BODY, 1))
  expect(owing(root, AGENT, left(root)).length).toBe(2)
})

test("a file that is not there is owed its body rather than passed over", () => {
  const root = rooted()
  const gone = [{ named: "gone.ts", absolute: join(root, "gone.ts") }]
  expect(owing(root, AGENT, gone).length).toBe(1)
})
