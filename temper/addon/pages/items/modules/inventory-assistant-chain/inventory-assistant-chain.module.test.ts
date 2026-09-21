import { expect, test } from "bun:test"
import {
  ASSISTANTS_BY_ROLE,
  assistantFor,
  CHAIN_WINDOW_MS,
  chainHeldOpen,
  optionMatching,
  roleOfStep,
  roleOut,
  stepAfter,
  VENUE_EXIT_LIMIT_MS,
  VENUE_EXIT_SETTLE_MS,
  venueExitVerdict,
} from "akasha/temper/addon/pages/items/modules/inventory-assistant-chain/inventory-assistant-chain.module.code.ts"

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

test("the assistant out at the time names the role whose option is picked", () => {
  expect(roleOut(holding(GILADIL))).toBe("deconstruction")
  expect(roleOut(holding(NUZHIMEH))).toBe("merchant")
  expect(roleOut(holding(TYTHIS))).toBe("banker")
})

test("no assistant out names no role", () => {
  expect(roleOut(holding())).toBe(undefined)
})

test("the option picked is the first of a wanted type, counted from one", () => {
  const types = [11, 22, 33]
  const typeAt = (index: number): number => types[index - 1] ?? 0
  expect(optionMatching([33, 22], 3, typeAt)).toBe(2)
  expect(optionMatching([11], 3, typeAt)).toBe(1)
})

test("a menu holding no wanted type has no option picked", () => {
  const typeAt = (index: number): number => index
  expect(optionMatching([99], 3, typeAt)).toBe(undefined)
  expect(optionMatching([1], 0, typeAt)).toBe(undefined)
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

test("a venue with nothing left running is closed once it has settled", () => {
  expect(venueExitVerdict(false, VENUE_EXIT_SETTLE_MS)).toBe("close")
  expect(venueExitVerdict(false, VENUE_EXIT_LIMIT_MS)).toBe("close")
})

test("a venue quiet for less than the settle is waited on", () => {
  expect(venueExitVerdict(false, 0)).toBe("wait")
  expect(venueExitVerdict(false, VENUE_EXIT_SETTLE_MS - 1)).toBe("wait")
})

test("a venue with work still running is waited on up to the limit", () => {
  expect(venueExitVerdict(true, VENUE_EXIT_SETTLE_MS)).toBe("wait")
  expect(venueExitVerdict(true, VENUE_EXIT_LIMIT_MS - 1)).toBe("wait")
})

test("a venue still working past the limit is left to the player", () => {
  expect(venueExitVerdict(true, VENUE_EXIT_LIMIT_MS)).toBe("give-up")
})
