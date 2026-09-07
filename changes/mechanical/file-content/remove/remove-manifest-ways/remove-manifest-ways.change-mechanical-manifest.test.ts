import { expect, test } from "bun:test"
import { reading } from "@akasha/pages/page-value/testing"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import {
  landsOn,
  removeManifestWays,
  waysGoneIn,
} from "./remove-manifest-ways.change-mechanical-manifest.code.ts"

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

const BETA = "seat-system/beta/beta.module.code.ts"

const GAMMA = "seat-system/gamma/gamma.module.code.ts"

function saidOf(going: readonly string[], text: string): Answer {
  return removeManifestWays({ at: AT, going }, reading({ [AT]: text }))
}

function bodyOf(said: Answer): string {
  expect(said.refused).toBeNull()
  expect(said.edits).toHaveLength(1)
  return said.edits[0]?.body ?? ""
}

function waysOf(body: string): Record<string, string> {
  return (JSON.parse(body) as { exports: Record<string, string> }).exports
}

test("a way in landing on a file that goes is dropped and the rest stay", () => {
  const said = bodyOf(saidOf([BETA], BODY))

  expect(said).toBe(BODY.replace(`\n    "./beta": "./beta/beta.module.code.ts",`, ""))
  expect(Object.keys(waysOf(said))).toEqual(["./alpha", "./gamma"])
})

test("the last way in goes and what stays reads as JSON", () => {
  const said = bodyOf(saidOf([GAMMA], BODY))

  expect(Object.keys(waysOf(said))).toEqual(["./alpha", "./beta"])
})

test("every way in goes and the exports key stays", () => {
  const said = bodyOf(saidOf(["seat-system/alpha/alpha.module.code.ts", BETA, GAMMA], BODY))

  expect(waysOf(said)).toEqual({})
})

test("a manifest stating no way in is answered unchanged", () => {
  expect(bodyOf(saidOf([BETA], NO_WAYS))).toBe(NO_WAYS)
})

test("a path no way in lands on leaves the manifest as the manifest is", () => {
  expect(bodyOf(saidOf(["seat-system/delta/delta.module.code.ts"], BODY))).toBe(BODY)
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

  expect(said.edits[0]?.path).toBe(AT)
  expect(said.edits[0]?.was).toBe(BODY)
  expect(said.edits[0]?.from).toBe(undefined)
})

test("the body is answered rather than written", () => {
  const textOf = reading({ [AT]: BODY })
  const said = removeManifestWays({ at: AT, going: [BETA] }, textOf)

  expect(said.refused).toBeNull()
  expect(textOf(AT)).toBe(BODY)
})
