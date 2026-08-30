import { expect, test } from "bun:test"
import {
  basenameOf,
  dequoted,
  joinedContinuations,
  segmentsOf,
  wordsOf,
} from "./shell-calls.module.code.ts"

test("a line continuation is joined", () => {
  expect(joinedContinuations("git \\\nreset --hard")).toBe("git  reset --hard")
})

test("a quoted run is taken out before the cut", () => {
  expect(dequoted('git commit -m "git reset --hard"')).toBe("git commit -m ")
  expect(dequoted("git commit -m 'git reset --hard'")).toBe("git commit -m ")
})

test("a quoted run spanning lines is taken out whole", () => {
  expect(dequoted('git commit -m "one\ntwo" -- one.ts')).toBe("git commit -m  -- one.ts")
  expect(dequoted("git commit -m 'one\ntwo' -- one.ts")).toBe("git commit -m  -- one.ts")
})

test("a quoted run holding one bare word is unquoted, so a quoted path stays a path", () => {
  expect(dequoted('cat one >"akasha/one.ts"')).toBe("cat one >akasha/one.ts")
  expect(dequoted("cat one >'akasha/one.ts'")).toBe("cat one >akasha/one.ts")
  expect(dequoted('mv one "akasha/one.ts"')).toBe("mv one akasha/one.ts")
  expect(dequoted('cp one "akasha/one.ts"')).toBe("cp one akasha/one.ts")
})

test("a quoted run holding a space is taken out, bare word or not", () => {
  expect(dequoted('cp one "akasha/one two.ts"')).toBe("cp one ")
})

test("a quoted run holding a separator is taken out", () => {
  expect(dequoted('echo "one|two"')).toBe("echo ")
  expect(dequoted('echo "one;two"')).toBe("echo ")
  expect(dequoted('echo "one&two"')).toBe("echo ")
})

test("a quoted run reaching for another call is taken out", () => {
  expect(dequoted('echo "$(cp one akasha/one.ts)"')).toBe("echo ")
  expect(dequoted('echo "`cp one akasha/one.ts`"')).toBe("echo ")
})

test("a separator cuts one line into segments", () => {
  expect(segmentsOf("cd one && git reset --hard")).toEqual(["cd one ", "git reset --hard"])
})

test("leading space on a segment is taken off", () => {
  expect(segmentsOf("   git stash")).toEqual(["git stash"])
})

test("wordsOf drops the runs of space between words", () => {
  expect(wordsOf("  git   reset  --hard ")).toEqual(["git", "reset", "--hard"])
})

test("basenameOf takes the last part of a path, and a bare word is its own basename", () => {
  expect(basenameOf("/usr/local/bin/git")).toBe("git")
  expect(basenameOf("git")).toBe("git")
})
