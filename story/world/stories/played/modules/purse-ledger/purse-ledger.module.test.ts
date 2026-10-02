import { expect, test } from "bun:test"
import {
  ledgerOf,
  ledgersIn,
} from "akasha/story/world/stories/played/modules/purse-ledger/purse-ledger.module.code.ts"

const COINS = {
  title: "Crowns",
  denominations: [
    { name: "gold", worth: 100 },
    { name: "copper", worth: 1 },
  ],
}

const CURRENCIES = new Map([["world-currency/crowns", COINS]])

const HISTORY =
  '{"turn":1,"value":0}\n{"turn":4,"value":250}\n{"turn":6,"value":248}\n{"turn":6,"value":248}\n{"turn":9,"value":100}\n'

test("a ledger is each change, newest first, in the currency's coins with what it then held", () => {
  const lines = [
    { turn: 1, value: 0 },
    { turn: 4, value: 250 },
    { turn: 6, value: 248 },
  ]
  expect(ledgerOf(lines, COINS, 6)).toEqual([
    { turn: 6, change: "−2 copper", total: "2 gold, 48 copper" },
    { turn: 4, change: "+2 gold, 50 copper", total: "2 gold, 50 copper" },
  ])
})

test("a ledger leaves out every line after the turn it is drawn for", () => {
  expect(
    ledgerOf(
      [
        { turn: 4, value: 30 },
        { turn: 9, value: 10 },
      ],
      undefined,
      8
    )
  ).toEqual([{ turn: 4, change: "+30", total: "30" }])
})

test("ledgers are keyed by the purse's name, and a purse in words or with no change has none", () => {
  const rows = [
    { values: { value: 100, currency: "world-currency/crowns", history: HISTORY } },
    { values: { value: 5, title: "Tokens", revealedAs: "a few", history: HISTORY } },
    { values: { value: 0, title: "Marks", history: '{"turn":1,"value":0}\n' } },
  ]
  expect(ledgersIn(rows, CURRENCIES, 9)).toEqual({
    Crowns: [
      { turn: 9, change: "−1 gold, 48 copper", total: "1 gold" },
      { turn: 6, change: "−2 copper", total: "2 gold, 48 copper" },
      { turn: 4, change: "+2 gold, 50 copper", total: "2 gold, 50 copper" },
    ],
  })
})
