import { expect, test } from "bun:test"
import {
  ASSISTANTS_BY_ROLE,
  assistantFor,
  CHAIN_WINDOW_MS,
  chainHeldOpen,
  roleOfStep,
  stepAfter,
} from "akasha/temper/addon/items-addon/modules/inventory-assistant-chain/inventory-assistant-chain.module.code.ts"

const GILADIL = 10184

const FEZEZ = 6378

const NUZHIMEH = 301

const EZABI = 6376

const TYTHIS = 267

function holding(...ids: readonly number[]): (id: number) => boolean {
  const held = new Set(ids)
  return (id) => held.has(id)
}

test("the ragpicker is the only assistant that deconstructs", () => {
  expect(ASSISTANTS_BY_ROLE.deconstruction).toEqual([GILADIL])
})

test("a role takes the assistant Alan is used to where he holds that one", () => {
  expect(assistantFor("merchant", holding(FEZEZ, NUZHIMEH))).toBe(NUZHIMEH)
  expect(assistantFor("banker", holding(EZABI, TYTHIS))).toBe(TYTHIS)
})

test("a role falls back to the other assistant where the first is unheld", () => {
  expect(assistantFor("merchant", holding(FEZEZ))).toBe(FEZEZ)
  expect(assistantFor("banker", holding(EZABI))).toBe(EZABI)
})

test("a role no held assistant fills answers nothing", () => {
  expect(assistantFor("merchant", holding())).toBe(undefined)
  expect(assistantFor("deconstruction", holding(EZABI))).toBe(undefined)
})

test("the chain runs from deconstructing to selling to banking and then ends", () => {
  expect(stepAfter("deconstructing")).toBe("selling")
  expect(stepAfter("selling")).toBe("banking")
  expect(stepAfter("banking")).toBe("away")
  expect(stepAfter("away")).toBe("away")
})

test("each step after the first names the role the chain summons", () => {
  expect(roleOfStep("selling")).toBe("merchant")
  expect(roleOfStep("banking")).toBe("banker")
  expect(roleOfStep("deconstructing")).toBe(undefined)
  expect(roleOfStep("away")).toBe(undefined)
})

test("a step is held open up to the window and no longer", () => {
  expect(chainHeldOpen("deconstructing", 1000, 1000)).toBe(true)
  expect(chainHeldOpen("deconstructing", 1000, 1000 + CHAIN_WINDOW_MS)).toBe(true)
  expect(chainHeldOpen("deconstructing", 1000, 1001 + CHAIN_WINDOW_MS)).toBe(false)
})

test("a chain that is away is held open by nothing", () => {
  expect(chainHeldOpen("away", 1000, 1000)).toBe(false)
})
