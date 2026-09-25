import { describe, expect, test } from "bun:test"
import type { DeliveryRecord } from "akasha/agent/message/modules/channel-delivery/agent-message-channel-delivery.module.code.ts"
import {
  decideWitnessTick,
  type PendingWitness,
  startDeliveryWitness,
  WITNESS_OBSERVATION_LIMIT,
  witnessActionFor,
} from "akasha/agent/message/modules/delivery-witness/agent-message-delivery-witness.module.code.ts"

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
    expect(decision.advance.map((entry) => entry.messageId)).toEqual([ID])
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

function injectedTranscript(id: string): string {
  const wrapper = `<channel source="user" message_id="${id}">a picture</channel>`
  return [
    JSON.stringify({ type: "queue-operation", operation: "enqueue", content: wrapper }),
    JSON.stringify({ type: "user", message: { content: wrapper } }),
  ].join("\n")
}

function witnessAnswering(answers: (string | null | Error)[]) {
  const taken: string[] = []
  const refused: { messageId: string; detail: string }[] = []
  const witness = startDeliveryWitness({
    agentId: "agent",
    advance: async (messageId) => {
      taken.push(messageId)
      const answer = answers.shift() ?? null
      if (answer instanceof Error) throw answer
      return answer
    },
    currentTranscriptPath: () => "/t/one.jsonl",
    heartbeatMs: 1,
    readTranscript: () => injectedTranscript(ID),
    scheduleInterval: () => () => {},
    logRefusal: (messageId, detail) => refused.push({ messageId, detail }),
  })
  return { witness, taken, refused }
}

describe("startDeliveryWitness", () => {
  test("takes again at the next look a message whose take was refused, and says so", async () => {
    const { witness, taken, refused } = witnessAnswering(["the pages answered 502"])
    witness.track(ID)
    await witness.tick()
    await witness.tick()
    expect(taken).toEqual([ID, ID])
    expect(refused).toEqual([{ messageId: ID, detail: "the pages answered 502" }])
  })

  test("takes again at the next look a message whose take threw, and says so", async () => {
    const { witness, taken, refused } = witnessAnswering([new Error("socket closed")])
    witness.track(ID)
    await witness.tick()
    await witness.tick()
    expect(taken).toEqual([ID, ID])
    expect(refused).toEqual([{ messageId: ID, detail: "socket closed" }])
  })

  test("marks a message shown before its take, so a refused take still leaves the mark", async () => {
    const marked: string[] = []
    const witness = startDeliveryWitness({
      agentId: "agent",
      advance: async () => "the pages answered 502",
      currentTranscriptPath: () => "/t/one.jsonl",
      heartbeatMs: 1,
      readTranscript: () => injectedTranscript(ID),
      scheduleInterval: () => () => {},
      logRefusal: () => {},
      markInjected: (messageId) => marked.push(messageId),
    })
    witness.track(ID)
    await witness.tick()
    expect(marked).toEqual([ID])
  })

  test("lets a message go once its take lands", async () => {
    const { witness, taken, refused } = witnessAnswering([null])
    witness.track(ID)
    await witness.tick()
    await witness.tick()
    expect(taken).toEqual([ID])
    expect(refused).toEqual([])
  })
})
