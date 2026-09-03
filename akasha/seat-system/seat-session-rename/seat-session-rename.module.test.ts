import { expect, test } from "bun:test"
import { renameSeatSession, sessionNote } from "./seat-session-rename.module.code.ts"

test("a seat with no old name to move is left alone", () => {
  expect(renameSeatSession(null, "now")).toEqual({ kind: "no-session" })
  expect(renameSeatSession("", "now")).toEqual({ kind: "no-session" })
  expect(renameSeatSession("same", "same")).toEqual({ kind: "no-session" })
})

test("a rename that leaves the seat where it was says nothing", () => {
  expect(sessionNote({ kind: "no-session" }, "was", "now")).toBe("")
})

test("a rename that happened is said briefly", () => {
  expect(sessionNote({ kind: "renamed" }, "was", "now")).toContain("moved with it")
})

test("a rename that did not happen names the name still held", () => {
  expect(sessionNote({ kind: "taken" }, "was", "now")).toContain("still was")
  expect(sessionNote({ kind: "taken" }, "was", "now")).toContain("already holding now")
  expect(sessionNote({ kind: "failed", said: "tmux said no" }, "was", "now")).toContain(
    "tmux said no"
  )
})
