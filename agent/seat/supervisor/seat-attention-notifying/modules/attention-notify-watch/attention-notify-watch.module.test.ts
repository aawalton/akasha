import { expect, test } from "bun:test"
import type { SeatTurnState } from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import {
  type AttentionSeat,
  attentionWatch,
  type Shown,
} from "akasha/agent/seat/supervisor/seat-attention-notifying/modules/attention-notify-watch/attention-notify-watch.module.code.ts"

const AGENT = "01a183b2-f232-713a-8949-9f6a7cd9c6d6"

const ATHENA: AttentionSeat = { title: "Athena", persona: true, desktop: true }

function watchOver(opts: {
  states: SeatTurnState[]
  shown: Shown[]
  seat?: AttentionSeat | null
  step?: number
}): () => undefined {
  let at = 0
  let clock = 0
  const watched = attentionWatch({
    readState: () => opts.states[Math.min(at, opts.states.length - 1)] ?? "working",
    readSeat: () => (opts.seat === undefined ? ATHENA : opts.seat),
    readExcerpt: () => "the last words",
    show: (note) => {
      opts.shown.push(note)
      return undefined
    },
    now: () => clock,
  })
  return () => {
    watched(AGENT)
    at += 1
    clock += opts.step ?? 3_000
    return undefined
  }
}

function ticks(tick: () => undefined, count: number): undefined {
  for (let one = 0; one < count; one += 1) tick()
  return undefined
}

test("a turn ending red is shown at once, and once", () => {
  const shown: Shown[] = []
  const tick = watchOver({ states: ["working", "needs-attention", "needs-attention"], shown })
  ticks(tick, 3)
  expect(shown).toEqual([{ title: "Athena needs you", body: "the last words" }])
})

test("a turn ending yellow is shown once the judge has had time to settle", () => {
  const shown: Shown[] = []
  const tick = watchOver({ states: ["working", "idle"], shown })
  ticks(tick, 4)
  expect(shown).toEqual([])
  ticks(tick, 4)
  expect(shown).toEqual([{ title: "Athena is done", body: "the last words" }])
})

test("a turn turning red after it was shown yellow is shown again", () => {
  const shown: Shown[] = []
  const states: SeatTurnState[] = ["working", ...Array<SeatTurnState>(6).fill("idle")]
  const tick = watchOver({ states: [...states, "needs-attention"], shown })
  ticks(tick, 10)
  expect(shown.map((one) => one.title)).toEqual(["Athena is done", "Athena needs you"])
})

test("a turn turning red before it settled is shown red alone", () => {
  const shown: Shown[] = []
  const tick = watchOver({ states: ["working", "idle", "needs-attention"], shown })
  ticks(tick, 10)
  expect(shown.map((one) => one.title)).toEqual(["Athena needs you"])
})

test("the state a supervisor first finds is not shown", () => {
  const shown: Shown[] = []
  const tick = watchOver({ states: ["needs-attention"], shown })
  ticks(tick, 10)
  expect(shown).toEqual([])
})

test("a new turn shows again", () => {
  const shown: Shown[] = []
  const tick = watchOver({
    states: ["working", "needs-attention", "working", "needs-attention"],
    shown,
  })
  ticks(tick, 4)
  expect(shown.length).toBe(2)
})

test("blue and purple are not shown", () => {
  const shown: Shown[] = []
  const tick = watchOver({ states: ["working", "idle-pending", "idle-pending", "ready"], shown })
  ticks(tick, 12)
  expect(shown).toEqual([])
})

test("a seat outside the personas section is not shown", () => {
  const shown: Shown[] = []
  const tick = watchOver({
    states: ["working", "needs-attention"],
    shown,
    seat: { ...ATHENA, persona: false },
  })
  ticks(tick, 3)
  expect(shown).toEqual([])
})

test("a seat no person wants on the desktop is not shown", () => {
  const shown: Shown[] = []
  const tick = watchOver({
    states: ["working", "needs-attention"],
    shown,
    seat: { ...ATHENA, desktop: false },
  })
  ticks(tick, 3)
  expect(shown).toEqual([])
})
