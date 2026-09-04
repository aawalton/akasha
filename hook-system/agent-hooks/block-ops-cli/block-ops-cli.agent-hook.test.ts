import { expect, test } from "bun:test"
import { rootOf } from "@akasha/command-system/rooting"
import { judging } from "../../hook-judging/hook-judging.module.code.ts"
import { opsIn, refusalIn, SCOPE } from "./block-ops-cli.agent-hook.code.ts"

const ROOT = rootOf(import.meta.path)

const judged = judging(refusalIn, ROOT)

const NAME = "ops"

test("a call that runs the CLI is refused whatever it asks of it", () => {
  for (const one of [NAME, `${NAME} surface`, `${NAME} seat turn-end read --json`]) {
    expect(judged(one)).toContain("refused this call")
  }
})

test("the refusal names what answers instead of each thing the CLI did", () => {
  const said = judged(`${NAME} surface`) ?? ""
  expect(said).toContain("ripgrep")
  expect(said).toContain("the akasha commands")
  expect(said).toContain("turned off")
})

test("the CLI reached by a path is the same call", () => {
  expect(judged(`dotfiles/bin/${NAME} surface`)).not.toBeNull()
  expect(judged(`/home/walton/repos/akasha/dotfiles/bin/${NAME}`)).not.toBeNull()
  expect(judged(`./dotfiles/bin/${NAME}`)).not.toBeNull()
})

test("a name set before the call is not the call", () => {
  expect(judged(`OPS_DEBUG=1 ${NAME} surface`)).not.toBeNull()
  expect(judged("OPS_DEBUG=1 git status")).toBeNull()
})

test("a prefix that only runs the call does not hide it", () => {
  for (const one of [`sudo ${NAME} surface`, `timeout 60 ${NAME} surface`, `env ${NAME} surface`]) {
    expect(judged(one)).not.toBeNull()
  }
})

test("a prefix flag that asks rather than runs leaves no call", () => {
  expect(judged(`command -v ${NAME}`)).toBeNull()
})

test("one refused act in a chain refuses the whole call", () => {
  expect(judged(`git status && ${NAME} surface`)).not.toBeNull()
  expect(judged(`${NAME} surface | head -5`)).not.toBeNull()
  expect(judged(`echo one; ${NAME} surface`)).not.toBeNull()
})

test("a word only holding the name inside it is no call to the CLI", () => {
  for (const one of ["git status", "chops --help", "opsgenie send", "bun run ops-like.ts"]) {
    expect(judged(one)).toBeNull()
  }
})

test("a run inside quotes is taken out before the cut", () => {
  expect(judged(`git commit -m "${NAME} is off"`)).toBeNull()
})

test("a call naming the dispatcher's own file is not read here", () => {
  expect(judged(`bun tools/${NAME}/cli.ts surface`)).toBeNull()
})

test("the name is read as the word run rather than as an argument", () => {
  expect(opsIn(`git commit -m ${NAME}`)).toBe(false)
  expect(opsIn(`${NAME} surface`)).toBe(true)
})

test("the scope says where the rule comes from and what it does not reach", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("WHERE THE CALL RUNS IS NOT READ")
  expect(said).toContain("NOT REACHED")
})
