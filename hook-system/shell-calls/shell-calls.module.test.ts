import { expect, test } from "bun:test"
import {
  basenameOf,
  calledWords,
  dequoted,
  joinedContinuations,
  RUNS_ANOTHER,
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

test("a descriptor duplicated onto another cuts nothing", () => {
  expect(segmentsOf("cp one two 2>&1")).toEqual(["cp one two 2>&1"])
  expect(segmentsOf("cp one two >&2")).toEqual(["cp one two >&2"])
})

test("a descriptor duplicated onto another still cuts at the pipe after it", () => {
  expect(segmentsOf("cp one two 2>&1 | head -3")).toEqual(["cp one two 2>&1 ", "head -3"])
})

test("both descriptors sent to one file cuts nothing", () => {
  expect(segmentsOf("cp one two &>log")).toEqual(["cp one two &>log"])
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

test("a segment carrying no prefix is its own words", () => {
  expect(calledWords("tsc --noEmit")).toEqual(["tsc", "--noEmit"])
  expect(calledWords("")).toEqual([])
})

test("a prefix that only runs what follows it is stepped over", () => {
  for (const one of RUNS_ANOTHER) {
    expect(calledWords(`${one} tsc --noEmit`)).toEqual(["tsc", "--noEmit"])
  }
})

test("a prefix reached by a path is the same prefix", () => {
  expect(calledWords("/usr/bin/timeout 900 tsc")).toEqual(["tsc"])
})

test("a prefix's own flags are stepped over with it", () => {
  expect(calledWords("stdbuf -oL tsc")).toEqual(["tsc"])
  expect(calledWords("timeout --preserve-status 900 tsc")).toEqual(["tsc"])
  expect(calledWords("nohup --version tsc")).toEqual(["tsc"])
})

test("a prefix flag taking a value takes the word after it", () => {
  expect(calledWords("timeout -k 5 900 tsc")).toEqual(["tsc"])
  expect(calledWords("timeout --signal TERM 900 tsc")).toEqual(["tsc"])
  expect(calledWords("nice -n 10 tsc")).toEqual(["tsc"])
  expect(calledWords("env -u HOME tsc")).toEqual(["tsc"])
  expect(calledWords("stdbuf -o L tsc")).toEqual(["tsc"])
})

test("a prefix's own number is stepped over and nothing else is", () => {
  expect(calledWords("timeout 900 tsc")).toEqual(["tsc"])
  expect(calledWords("timeout 1.5h tsc")).toEqual(["tsc"])
  expect(calledWords("taskset 0x3 tsc")).toEqual(["tsc"])
  expect(calledWords("chrt 99 tsc")).toEqual(["tsc"])
  expect(calledWords("timeout 900 echo tsc")).toEqual(["echo", "tsc"])
})

test("a prefix takes one number of its own rather than every number", () => {
  expect(calledWords("timeout 900 7 tsc")).toEqual(["7", "tsc"])
})

test("a prefix flag that asks rather than runs leaves no call", () => {
  expect(calledWords("command -v tsc")).toEqual([])
  expect(calledWords("sudo -l tsc")).toEqual([])
  expect(calledWords("sudo -v")).toEqual([])
})

test("a prefix carrying nothing behind it leaves no call", () => {
  expect(calledWords("timeout")).toEqual([])
  expect(calledWords("env")).toEqual([])
  expect(calledWords("timeout --help")).toEqual([])
})

test("a prefix behind a prefix is stepped over too", () => {
  expect(calledWords("timeout 900 sudo nice -n 10 tsc --noEmit")).toEqual(["tsc", "--noEmit"])
  expect(calledWords("nohup nice tsc")).toEqual(["tsc"])
})

test("a variable assignment before a call is stepped over, behind a prefix as well", () => {
  expect(calledWords("TS_NODE=one tsc")).toEqual(["tsc"])
  expect(calledWords("env NODE_ENV=one tsc")).toEqual(["tsc"])
  expect(calledWords("timeout 900 NODE_ENV=one tsc")).toEqual(["tsc"])
})

test("a word this names no prefix is the call, whatever follows it", () => {
  expect(calledWords("echo tsc")).toEqual(["echo", "tsc"])
  expect(calledWords("xargs tsc")).toEqual(["xargs", "tsc"])
  expect(calledWords("sh -c tsc")).toEqual(["sh", "-c", "tsc"])
  expect(calledWords("make typecheck")).toEqual(["make", "typecheck"])
})
