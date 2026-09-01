import { expect, test } from "bun:test"
import { ran, said } from "./running.module.code.ts"

test("a command exiting zero is answered as zero and what it printed", () => {
  expect(ran(["sh", "-c", "printf hello"])).toEqual({ code: 0, out: "hello", err: "" })
})

test("a command exiting other than zero is answered rather than thrown", () => {
  expect(ran(["false"])).toEqual({ code: 1, out: "", err: "" })
})

test("what a command says on each stream is kept apart", () => {
  expect(ran(["sh", "-c", "printf out; printf err 1>&2; exit 3"])).toEqual({
    code: 3,
    out: "out",
    err: "err",
  })
})

test("what a process said comes back where it exited zero", () => {
  expect(said(["sh", "-c", "printf hello"])).toBe("hello")
})

test("what a process said is a throw naming the command and the code and the error stream", () => {
  expect(() => said(["sh", "-c", "printf nope 1>&2; exit 7"])).toThrow(/`sh` exited 7 — nope/)
})

test("a process runs where the caller says", () => {
  expect(ran(["pwd"], { cwd: "/usr" }).out).toBe("/usr\n")
})

test("a process is given the environment the caller states", () => {
  expect(
    ran(["printenv", "AKASHA_RUNNING_PROBE"], { env: { AKASHA_RUNNING_PROBE: "here" } })
  ).toEqual({ code: 0, out: "here\n", err: "" })
})

test("what a caller hands in reaches the process", () => {
  expect(ran(["cat"], { stdin: new TextEncoder().encode("handed in") }).out).toBe("handed in")
})
