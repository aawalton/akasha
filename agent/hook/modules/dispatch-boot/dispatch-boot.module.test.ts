import { expect, test } from "bun:test"
import { REFUSED } from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"

const BOOT_AT = new URL("./dispatch-boot.module.code.ts", import.meta.url).pathname

const ENCODER = new TextEncoder()

function booted(payload: string): { readonly code: number; readonly err: string } {
  const done = ran(["bun", BOOT_AT], { stdin: ENCODER.encode(payload) })
  return { code: done.code, err: done.err }
}

test("a payload that will not read is refused by the dispatch the boot loaded", () => {
  const said = booted("not a payload")
  expect(said.code).toBe(REFUSED)
  expect(said.err).toContain("hook-dispatch: the payload would not read")
})
