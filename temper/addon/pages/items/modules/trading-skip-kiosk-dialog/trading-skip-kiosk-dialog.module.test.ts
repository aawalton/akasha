import { expect, test } from "bun:test"
import { kioskPick } from "akasha/temper/addon/pages/items/modules/trading-skip-kiosk-dialog/trading-skip-kiosk-dialog.module.code.ts"

const TALK = 1

const STORE = 2

const BANK = 3

const GUILD_BANK = 4

const BANK_SERVICES = [BANK, GUILD_BANK]

test("a trader's guild store option is picked, counted from one", () => {
  expect(kioskPick([TALK, STORE], STORE, BANK_SERVICES)).toBe(2)
  expect(kioskPick([STORE], STORE, BANK_SERVICES)).toBe(1)
})

test("a banker offering the guild store keeps its menu", () => {
  expect(kioskPick([BANK, GUILD_BANK, STORE], STORE, BANK_SERVICES)).toBe(undefined)
  expect(kioskPick([STORE, GUILD_BANK], STORE, BANK_SERVICES)).toBe(undefined)
  expect(kioskPick([STORE, BANK], STORE, BANK_SERVICES)).toBe(undefined)
})

test("a menu with no guild store has nothing picked", () => {
  expect(kioskPick([TALK], STORE, BANK_SERVICES)).toBe(undefined)
  expect(kioskPick([], STORE, BANK_SERVICES)).toBe(undefined)
})
