import { expect, test } from "bun:test"
import {
  decideRemoteControl,
  decideRemoteControlBatch,
} from "./supervisor-remote-control-decide.module.code.ts"

test("a headless seat is not under remote control", () => {
  expect(decideRemoteControl({ headless: true })).toBe(false)
})

test("a seat that is not headless is under remote control", () => {
  expect(decideRemoteControl({ headless: false })).toBe(true)
})

test("a batch answers each seat under its own question and keeps the seat's name", () => {
  expect(
    decideRemoteControlBatch([
      { seat: "one", question: { headless: false } },
      { seat: "two", question: { headless: true } },
    ])
  ).toEqual([
    { seat: "one", remoteControl: true },
    { seat: "two", remoteControl: false },
  ])
})

test("an empty batch is answered with nothing", () => {
  expect(decideRemoteControlBatch([])).toEqual([])
})
