import { expect, test } from "bun:test"
import { join } from "node:path"
import {
  ALL,
  APP,
  FORCE,
  JSON_LINE,
  PORT,
  readIn,
  SEQ,
  TAIL,
  type Taking,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"

const root = join(import.meta.dir, "..", "..", "..", "..", "..")

const ONE_SERVER: Taking = { flags: [SEQ, APP, PORT, JSON_LINE], names: "one-server" }

const ONE_OR_EVERY: Taking = { flags: [SEQ, APP, ALL, JSON_LINE], names: "one-or-every" }

const ANY: Taking = { flags: [SEQ, APP, JSON_LINE], names: "any" }

const LOGGING: Taking = { flags: [SEQ, APP, TAIL], names: "one-server" }

const BOOTSTRAPPING: Taking = { flags: [SEQ, APP, FORCE, JSON_LINE], names: "one-server" }

test("a flag the command does not take is refused", () => {
  const read = readIn(["--wat"], root, ANY)
  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused.join(" ")).toContain("--wat")
})

test("a command naming neither seq nor app is read where it names either", () => {
  expect("refused" in readIn([], root, ANY)).toBe(false)
})

test("a command that names one server is refused without an app, naming the apps there are", () => {
  const read = readIn(["--seq", "8485"], root, ONE_SERVER)
  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused.join(" ")).toContain("smilingjenny-web")
})

test("a seq said as a word is read where the flag would be", () => {
  const read = readIn(["8485", "--app", "alanwalton-web"], root, ONE_SERVER)
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.seq).toBe(8485)
  expect(read.app).toBe("alanwalton-web")
})

test("a seq said twice, once as a word and once as a flag, is refused", () => {
  const said = ["8485", "--seq", "8486", "--app", "alanwalton-web"]
  expect("refused" in readIn(said, root, ONE_SERVER)).toBe(true)
})

test("a seq that is no whole number is refused", () => {
  expect("refused" in readIn(["eight", "--app", "alanwalton-web"], root, ONE_SERVER)).toBe(true)
})

test("a second word after the seq is refused", () => {
  const said = ["8485", "8486", "--app", "alanwalton-web"]
  expect("refused" in readIn(said, root, ONE_SERVER)).toBe(true)
})

test("naming both every server and one server is refused", () => {
  const said = ["--all", "--seq", "8485", "--app", "alanwalton-web"]
  expect("refused" in readIn(said, root, ONE_OR_EVERY)).toBe(true)
})

test("naming neither every server nor one server is refused", () => {
  expect("refused" in readIn([], root, ONE_OR_EVERY)).toBe(true)
})

test("naming every server is read", () => {
  const read = readIn(["--all"], root, ONE_OR_EVERY)
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.all).toBe(true)
})

test("`--all` is refused where the command does not take it", () => {
  const said = ["8485", "--app", "alanwalton-web", "--all"]
  expect("refused" in readIn(said, root, ONE_SERVER)).toBe(true)
})

test("`--force` is read where the command takes it and refused where it does not", () => {
  const said = ["1", "--app", "alanwalton-web", "--force"]
  expect("refused" in readIn(said, root, BOOTSTRAPPING)).toBe(false)
  expect("refused" in readIn(said, root, ONE_SERVER)).toBe(true)
})

test("a tail of nothing is refused, where a tail unsaid is a hundred lines", () => {
  const zero = ["1", "--app", "alanwalton-web", "--tail", "0"]
  expect("refused" in readIn(zero, root, LOGGING)).toBe(true)
  const read = readIn(["1", "--app", "alanwalton-web"], root, LOGGING)
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.tail).toBe(100)
})

test("a valued flag naming no value is refused", () => {
  expect("refused" in readIn(["--app"], root, LOGGING)).toBe(true)
})

test("every web app page is an app a command naming one server takes", () => {
  const read = readIn(["--seq", "8485"], root, ONE_SERVER)
  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  const named = read.refused.join(" ")
  for (const one of [
    "alanwalton-web",
    "alanwalton-atlas-web",
    "archive-of-worlds-web",
    "audhdalan-web",
    "smilingjenny-web",
    "temper-web",
  ]) {
    expect(named).toContain(one)
  }
})
