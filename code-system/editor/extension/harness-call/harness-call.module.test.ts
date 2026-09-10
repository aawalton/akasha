import { describe, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import * as path from "node:path"
import { WAITED_AT_MOST } from "../../../../commands/modules/holding/holding.module.code.ts"
import { rootOf } from "../../../../commands/modules/rooting/rooting.module.code.ts"
import { akashaRoot, LANDING_TIMEOUT_MS, serverPath } from "./harness-call.module.code.ts"

const CHECKOUT = rootOf(import.meta.path)

function within(named: string): string {
  return path.relative(akashaRoot(), named)
}

describe("the files the harness names", () => {
  test("the checkout this test sits in is the one the paths are judged against", () => {
    expect(existsSync(path.join(CHECKOUT, "akasha.domain.ts"))).toBe(true)
    expect(existsSync(path.join(CHECKOUT, "commands"))).toBe(true)
  })

  test("the command server has the file its assembled path names", () => {
    expect(existsSync(path.join(CHECKOUT, within(serverPath())))).toBe(true)
  })
})

describe("how long a caller is given", () => {
  test("a call that can land waits longer than a landing waits for the lock", () => {
    expect(LANDING_TIMEOUT_MS).toBeGreaterThan(WAITED_AT_MOST)
  })

  test("what is left over the lock's own wait is time for the landing itself", () => {
    expect(LANDING_TIMEOUT_MS - WAITED_AT_MOST).toBeGreaterThanOrEqual(20_000)
  })
})
