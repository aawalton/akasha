import { expect, test } from "bun:test"
import { reading } from "@akasha/pages/page-value/testing"
import { pathsIn } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { bodyOf } from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  landsOn,
  removeManifestWays,
  waysGoneIn,
} from "./remove-manifest-ways.change-mechanical-file-content.code.ts"

const AT = "seat-system/package.json"

const BODY = `{
  "name": "@akasha/seat-system",
  "type": "module",
  "exports": {
    "./alpha": "./alpha/alpha.module.code.ts",
    "./beta": "./beta/beta.module.code.ts",
    "./gamma": "./gamma/gamma.module.code.ts"
  }
}
`

const NO_WAYS = `{
  "name": "@akasha/seat-system",
  "type": "module"
}
`

const BROKEN = `{
  "name": "@akasha/seat-system",
  "exports": {
`

const LONE = `{
  "name": "@akasha/seat-system",
  "exports": "./beta/beta.module.code.ts"
}
`

const BETA = "seat-system/beta/beta.module.code.ts"

const GAMMA = "seat-system/gamma/gamma.module.code.ts"

function saidOf(going: readonly string[], text: string): Answer {
  return removeManifestWays({ at: AT, going }, reading({ [AT]: text }))
}

function bodyIn(going: readonly string[], text: string): string {
  return bodyOf(saidOf(going, text), reading({ [AT]: text }))
}

function waysOf(body: string): Record<string, string> {
  return (JSON.parse(body) as { exports: Record<string, string> }).exports
}

test("a way in landing on a file that goes is dropped and the rest stay", () => {
  const said = bodyIn([BETA], BODY)

  expect(said).toBe(BODY.replace(`\n    "./beta": "./beta/beta.module.code.ts",`, ""))
  expect(Object.keys(waysOf(said))).toEqual(["./alpha", "./gamma"])
})

test("the last way in goes and what stays reads as JSON", () => {
  const said = bodyIn([GAMMA], BODY)

  expect(Object.keys(waysOf(said))).toEqual(["./alpha", "./beta"])
})

test("the last ways in go together and what stays reads as JSON", () => {
  const said = bodyIn([BETA, GAMMA], BODY)

  expect(Object.keys(waysOf(said))).toEqual(["./alpha"])
})

test("every way in goes and the exports key stays", () => {
  const said = bodyIn(["seat-system/alpha/alpha.module.code.ts", BETA, GAMMA], BODY)

  expect(waysOf(said)).toEqual({})
})

test("one way in stated as text and landing on a path that goes takes the whole key", () => {
  const said = bodyIn([BETA], LONE)

  expect(JSON.parse(said)).toEqual({ name: "@akasha/seat-system" })
})

test("one way in stated as text and landing on a path that stays is left alone", () => {
  const said = saidOf([GAMMA], LONE)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a manifest stating no way in is answered as no edit", () => {
  const said = saidOf([BETA], NO_WAYS)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a path no way in lands on is answered as no edit", () => {
  const said = saidOf(["seat-system/delta/delta.module.code.ts"], BODY)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a body that reads as no JSON object is refused", () => {
  const said = saidOf([BETA], BROKEN)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/reads as no JSON object/)
})

test("a manifest holding no body is refused", () => {
  const said = removeManifestWays({ at: AT, going: [] }, reading({}))

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no body/)
})

test("a way in lands on the path that way in spells under the manifest's folder", () => {
  expect(landsOn(AT, "./beta/beta.module.code.ts")).toBe(BETA)
  expect(landsOn("package.json", "./one/two.ts")).toBe("one/two.ts")
})

test("the ways in that go are named by their keys", () => {
  expect(waysGoneIn(AT, BODY, new Set([BETA, GAMMA]))).toEqual(["./beta", "./gamma"])
  expect(waysGoneIn(AT, NO_WAYS, new Set([BETA]))).toEqual([])
})

test("the body is answered under the path the body was read from", () => {
  const said = saidOf([BETA], BODY)

  expect(pathsIn(said)).toEqual([AT])
})

test("the body is answered rather than written", () => {
  const textOf = reading({ [AT]: BODY })
  const said = removeManifestWays({ at: AT, going: [BETA] }, textOf)

  expect(said.refused).toBeNull()
  expect(textOf(AT)).toBe(BODY)
})
