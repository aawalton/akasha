import { expect, test } from "bun:test"
import {
  askedNarrow,
  gateFoundBy,
  type Narrow,
  type ReadGate,
  testsHeldTo,
  Withheld,
  whereHeldTo,
} from "akasha/page/access/modules/read-gate/read-gate.module.code.ts"

const READOUT = "readout"

function reading(narrows: readonly Narrow[] | null): ReadGate {
  return async () => ({ permitted: true, narrows })
}

function withNoGate(): undefined {
  gateFoundBy(() => null)
}

function withGate(gate: ReadGate): undefined {
  gateFoundBy(() => gate)
}

test("a read no reader rides with asks what the caller asked and no more", async () => {
  withNoGate()
  expect(await whereHeldTo(READOUT, [{ key: "world", eq: "world/one" }])).toEqual([
    { key: "world", eq: "world/one" },
  ])
  expect(await whereHeldTo(READOUT, undefined)).toBeUndefined()
})

test("a page type withheld from the reader stops the read rather than answering no pages", async () => {
  withGate(async () => ({ permitted: false, why: "no access names it" }))
  await expect(whereHeldTo(READOUT, undefined)).rejects.toThrow(Withheld)
  await expect(whereHeldTo(READOUT, undefined)).rejects.toThrow("no access names it")
})

test("a reader an access admits without a narrow asks what the caller asked", async () => {
  withGate(reading(null))
  expect(await whereHeldTo(READOUT, undefined)).toBeUndefined()
})

test("a narrow rides into the question rather than trimming the answer", async () => {
  withGate(reading([{ key: "nav", is: "nav/one" }]))
  expect(await whereHeldTo(READOUT, undefined)).toEqual([{ key: "nav", eq: "nav/one" }])
})

test("a narrow rides beside what the caller already asked", async () => {
  withGate(reading([{ key: "nav", is: "nav/one" }]))
  expect(await whereHeldTo(READOUT, [{ key: "world", eq: "world/one" }])).toEqual([
    { key: "world", eq: "world/one" },
    { key: "nav", eq: "nav/one" },
  ])
})

test("two narrows on one key ride in as one question", async () => {
  withGate(
    reading([
      { key: "world", is: "world/one" },
      { key: "world", is: "world/two" },
    ])
  )
  expect(await whereHeldTo(READOUT, undefined)).toEqual([
    { key: "world", in: ["world/one", "world/two"] },
  ])
})

test("narrows disagreeing on the key stop the read rather than widening to both", async () => {
  withGate(
    reading([
      { key: "world", is: "world/one" },
      { key: "nav", is: "nav/one" },
    ])
  )
  await expect(whereHeldTo(READOUT, undefined)).rejects.toThrow(Withheld)
})

test("a question asked by key carries the narrow beside the key the caller asked by", async () => {
  withGate(reading([{ key: "nav", is: "nav/one" }]))
  expect(await testsHeldTo(READOUT, { id: { "ends-with": "0d4d87c8" } })).toEqual({
    id: { "ends-with": "0d4d87c8" },
    nav: { is: "nav/one" },
  })
})

test("a question asked by key is stopped where the page type is withheld", async () => {
  withGate(async () => ({ permitted: false, why: "no access names it" }))
  await expect(testsHeldTo(READOUT, { id: { "ends-with": "0d4d87c8" } })).rejects.toThrow(Withheld)
})

test("an access stating no narrow asks the pages without one", () => {
  expect(askedNarrow(null)).toBeUndefined()
})

test("two narrows on one key are asked as one question", () => {
  expect(
    askedNarrow([
      { key: "world", is: "world/one" },
      { key: "world", is: "world/two" },
    ])
  ).toEqual({ world: { in: ["world/one", "world/two"] } })
})

test("narrows disagreeing on the key refuse rather than widening", () => {
  expect(
    askedNarrow([
      { key: "world", is: "world/one" },
      { key: "app", is: "web-app/one" },
    ])
  ).toBeNull()
  withNoGate()
})
