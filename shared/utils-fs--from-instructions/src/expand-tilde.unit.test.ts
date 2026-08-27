import { describe, expect, test } from "bun:test"
import { homedir } from "node:os"
import { join } from "node:path"
import { expandTilde } from "./expand-tilde"

describe("expandTilde", () => {
  test("bare tilde expands to the home directory", () => {
    expect(expandTilde("~")).toBe(homedir())
  })

  test("tilde-slash prefix expands under home", () => {
    expect(expandTilde("~/.ssh/id_ed25519")).toBe(join(homedir(), ".ssh", "id_ed25519"))
  })

  test("a non-tilde absolute path passes through unchanged", () => {
    expect(expandTilde("/etc/hosts")).toBe("/etc/hosts")
  })

  test("the empty string passes through unchanged", () => {
    expect(expandTilde("")).toBe("")
  })

  test("a bare ~user form (no slash) is left unresolved", () => {
    expect(expandTilde("~other")).toBe("~other")
  })

  test("a relative non-tilde path passes through unchanged", () => {
    expect(expandTilde("relative/dir")).toBe("relative/dir")
  })
})
