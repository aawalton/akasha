import { describe, expect, test } from "bun:test"
import type { DeliveryRecord } from "../../channel-delivery/channel-delivery.module.code.ts"
import {
  decideWitnessTick,
  type PendingWitness,
  WITNESS_OBSERVATION_LIMIT,
  witnessActionFor,
} from "./messages-delivery-witness.module.code.ts"

const ID = "11111111-2222-3333-4444-555555555555"

function pending(observations: number): PendingWitness {
  return { messageId: ID, transcriptPath: "/t/one.jsonl", observations }
}

function records(...rs: DeliveryRecord[]): ReadonlyMap<string, readonly DeliveryRecord[]> {
  return new Map([["/t/one.jsonl", rs]])
}

describe("witnessActionFor", () => {
  const observationLimit = WITNESS_OBSERVATION_LIMIT

  test("advances what was injected", () => {
    expect(witnessActionFor({ verdict: "injected", observations: 1, observationLimit })).toBe(
      "advance"
    )
  })

  test("retires what was lost", () => {
    expect(witnessActionFor({ verdict: "lost", observations: 1, observationLimit })).toBe("retire")
  })

  test("retains a seat mid-turn however many looks it takes", () => {
    expect(witnessActionFor({ verdict: "not-yet", observations: 99, observationLimit })).toBe(
      "retain"
    )
  })

  test("retains the undetermined under the limit and retires it at the limit", () => {
    expect(witnessActionFor({ verdict: "undetermined", observations: 1, observationLimit })).toBe(
      "retain"
    )
    expect(
      witnessActionFor({
        verdict: "undetermined",
        observations: observationLimit,
        observationLimit,
      })
    ).toBe("retire")
  })
})

describe("decideWitnessTick", () => {
  test("advances a message the transcript holds the injection of", () => {
    const decision = decideWitnessTick({
      pending: [pending(0)],
      recordsByPath: records(
        { kind: "enqueue", messageId: ID },
        { kind: "injection", messageId: ID }
      ),
    })
    expect(decision.advance).toEqual([ID])
    expect(decision.next).toEqual([])
  })

  test("counts a look where it can tell nothing", () => {
    const decision = decideWitnessTick({ pending: [pending(0)], recordsByPath: records() })
    expect(decision.next[0]?.observations).toBe(1)
  })

  test("gives up once the looks run out", () => {
    const decision = decideWitnessTick({
      pending: [pending(WITNESS_OBSERVATION_LIMIT - 1)],
      recordsByPath: records(),
    })
    expect(decision.retired[0]?.messageId).toBe(ID)
    expect(decision.next).toEqual([])
  })

  test("retires a message the transcript shows overtaken", () => {
    const other = "66666666-7777-8888-9999-aaaaaaaaaaaa"
    const decision = decideWitnessTick({
      pending: [pending(0)],
      recordsByPath: records(
        { kind: "enqueue", messageId: ID },
        { kind: "enqueue", messageId: other },
        { kind: "injection", messageId: other }
      ),
    })
    expect(decision.retired[0]).toEqual({ messageId: ID, reason: "overtaken" })
  })

  test("does nothing where nothing is pending", () => {
    const decision = decideWitnessTick({ pending: [], recordsByPath: records() })
    expect(decision).toEqual({ advance: [], retired: [], next: [] })
  })
})
