import { describe, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import * as path from "node:path"
import { COMMANDS_SERVED } from "@akasha/command-system/commands-served"
import { akashaRoot, commandPath, serverPath } from "./harness-call.module.code.ts"

const CHECKOUT = path.join(import.meta.dir, "..", "..")

function within(assembled: string): string {
  return path.relative(akashaRoot(), assembled)
}

describe("the paths the harness assembles", () => {
  test("the checkout this test sits in is the one the paths are judged against", () => {
    expect(existsSync(path.join(CHECKOUT, "akasha.domain.ts"))).toBe(true)
    expect(existsSync(path.join(CHECKOUT, "commands"))).toBe(true)
  })

  test("a served command's file is named under the commands folder", () => {
    expect(within(commandPath("work-tree"))).toBe(
      path.join("commands", "work-tree", "work-tree.command.code.ts")
    )
  })

  test("every served command has the file its assembled path names", () => {
    const missing = COMMANDS_SERVED.filter(
      (command) => !existsSync(path.join(CHECKOUT, within(commandPath(command))))
    )
    expect(missing).toEqual([])
  })

  test("the command server has the file its assembled path names", () => {
    expect(existsSync(path.join(CHECKOUT, within(serverPath())))).toBe(true)
  })
})
