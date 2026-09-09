import { describe, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import * as path from "node:path"
import { akashaRoot, dispatcherPath, serverPath } from "./harness-call.module.code.ts"

const CHECKOUT = path.join(import.meta.dir, "..", "..")

function within(named: string): string {
  return path.relative(akashaRoot(), named)
}

describe("the files the harness names", () => {
  test("the checkout this test sits in is the one the paths are judged against", () => {
    expect(existsSync(path.join(CHECKOUT, "akasha.domain.ts"))).toBe(true)
    expect(existsSync(path.join(CHECKOUT, "commands"))).toBe(true)
  })

  test("a command the server does not answer is spawned as the dispatcher on PATH", () => {
    expect(within(dispatcherPath())).toBe(
      path.join("commands", "modules", "cli", "cli.module.code.ts")
    )
    expect(existsSync(path.join(CHECKOUT, within(dispatcherPath())))).toBe(true)
  })

  test("the command server has the file its assembled path names", () => {
    expect(existsSync(path.join(CHECKOUT, within(serverPath())))).toBe(true)
  })
})
