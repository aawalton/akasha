import { describe, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import * as path from "node:path"
import { COMMANDS_SERVED } from "@akasha/command-system/commands-served"
import {
  akashaRoot,
  commandFile,
  HarnessUnreachableError,
  serverPath,
} from "./harness-call.module.code.ts"

const CHECKOUT = path.join(import.meta.dir, "..", "..")

// A command the server does not answer, so the file named here is the one a spawn runs.
const SPAWNED = "seat"

function within(named: string): string {
  return path.relative(akashaRoot(), named)
}

describe("the files the harness names", () => {
  test("the checkout this test sits in is the one the paths are judged against", () => {
    expect(existsSync(path.join(CHECKOUT, "akasha.domain.ts"))).toBe(true)
    expect(existsSync(path.join(CHECKOUT, "command-system", "commands"))).toBe(true)
  })

  test("a command's file is the one sitting beside that command's page", () => {
    expect(within(commandFile("work-tree"))).toBe(
      path.join("command-system", "commands", "work-tree", "work-tree.command.code.ts")
    )
  })

  test("every served command has the file the index names for it", () => {
    const missing = COMMANDS_SERVED.filter(
      (command) => !existsSync(path.join(CHECKOUT, within(commandFile(command))))
    )
    expect(missing).toEqual([])
  })

  test("a command the server does not answer has the file the index names for it", () => {
    expect(existsSync(path.join(CHECKOUT, within(commandFile(SPAWNED))))).toBe(true)
  })

  test("a command the index names no single page for is refused rather than spawned", () => {
    expect(() => commandFile("this-names-no-command")).toThrow(HarnessUnreachableError)
  })

  test("the command server has the file its assembled path names", () => {
    expect(existsSync(path.join(CHECKOUT, within(serverPath())))).toBe(true)
  })
})
