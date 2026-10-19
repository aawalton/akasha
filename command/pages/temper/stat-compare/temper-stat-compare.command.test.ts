import { expect, test } from "bun:test"
import { INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  headerOf,
  temperStatCompare,
} from "akasha/command/pages/temper/stat-compare/temper-stat-compare.command.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { dragonknight } from "akasha/temper/catalog/skill/temper-class/pages/dragonknight.temper-class.ts"
import { imperial } from "akasha/temper/catalog/world/temper-race/pages/imperial.temper-race.ts"

const ROOT = codeRoot()

const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha temper stat-compare",
  from: ROOT,
  writer: null,
  agentId: null,
}

test("a character is named as a word, and one naming no page is refused", async () => {
  const said = await temperStatCompare(["nobody-at-all"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`nobody-at-all` names no character page")
})

test("a character is named at its flag as well", async () => {
  const said = await temperStatCompare(["--character", "nobody-at-all"], GIVEN)

  expect(said.refusals.join("\n")).toContain("`nobody-at-all` names no character page")
})

test("a call naming no character is refused", async () => {
  const said = await temperStatCompare([], GIVEN)

  expect(said.code).toBe(INPUT)
})

test("a count of readings that is no whole number is refused", async () => {
  const said = await temperStatCompare(["nobody-at-all", "--last", "some"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).not.toContain("names no character page")
})

const LINE = {
  id: "01a155aa-0000-7000-8000-000000000000",
  result: "r",
  character: "Erin Solstice",
  buildHash: "",
  bar: "frontBar" as const,
  reading: { capturedAt: 1760896298, esoVersion: "11.1", inCombat: false, stats: {} },
}

test("a reading's header names the race and class its build holds", () => {
  const built = { race: imperial.slug, class: dragonknight.slug }
  expect(headerOf(LINE, built)).toContain(`frontBar  ${imperial.slug} ${dragonknight.slug}  eso`)
})

test("a reading whose build does not decode says so in its header", () => {
  expect(headerOf(LINE, null)).toContain("frontBar  build unread  eso")
})

test("a reading named both by when it was captured and by its id is refused", async () => {
  const said = await temperStatCompare(
    ["nobody-at-all", "--captured-at", "1760896298", "--id", "01a155"],
    GIVEN
  )

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).not.toContain("names no character page")
})
