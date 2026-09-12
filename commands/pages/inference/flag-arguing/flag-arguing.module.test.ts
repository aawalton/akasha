import { describe, expect, test } from "bun:test"
import { homedir } from "node:os"
import { join } from "node:path"
import { pathUnder } from "akasha/commands/pages/inference/flag-arguing/flag-arguing.module.code.ts"

describe("a path said on the command line", () => {
  test("a path opening with `~/` is read against the home directory", () => {
    expect(pathUnder("/nowhere", "~/held.png")).toBe(join(homedir(), "held.png"))
  })

  test("an absolute path is taken as that path is", () => {
    expect(pathUnder("/nowhere", "/held/one.png")).toBe("/held/one.png")
  })

  test("any other path is read against the root handed over", () => {
    expect(pathUnder("/nowhere", "held/one.png")).toBe("/nowhere/held/one.png")
  })
})
