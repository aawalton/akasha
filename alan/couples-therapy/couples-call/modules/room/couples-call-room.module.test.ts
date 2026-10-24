import { describe, expect, test } from "bun:test"
import {
  expectCall,
  legSaid,
  STREAM_LEG,
  spouseExpected,
  streamAdmitted,
} from "akasha/alan/couples-therapy/couples-call/modules/room/couples-call-room.module.code.ts"

function socket() {
  const made = { closed: 0, sent: [] as string[] }
  return {
    made,
    send(text: string) {
      made.sent.push(text)
    },
    close() {
      made.closed += 1
    },
  }
}

describe("expected calls", () => {
  test("a call answered for a spouse is let in once", () => {
    expectCall("call-1", "jenny", 1000)
    expect(spouseExpected("call-1", 2000)).toBe("jenny")
    expect(spouseExpected("call-1", 2000)).toBeNull()
  })

  test("a call left waiting past a minute is not let in", () => {
    expectCall("call-2", "alan", 1000)
    expect(spouseExpected("call-2", 1000 + 61_000)).toBeNull()
  })
})

function streamAsked(leg: string | null): Request {
  const at = new URL("https://webhook.alanwalton.com/api/call/stream")
  if (leg !== null) at.searchParams.set(STREAM_LEG, leg)
  return new Request(at.href)
}

describe("streamAdmitted", () => {
  test("a stream naming the leg a call was answered with is admitted", () => {
    const leg = expectCall("call-3", "alan", 1000)
    expect(streamAdmitted(streamAsked(leg), 2000)).toBe(true)
  })

  test("a stream naming no leg, or a leg nobody answered, is refused", () => {
    expectCall("call-4", "jenny", 1000)
    expect(streamAdmitted(streamAsked(null), 2000)).toBe(false)
    expect(streamAdmitted(streamAsked("guessed"), 2000)).toBe(false)
  })

  test("a leg is refused once its call has started or a minute has passed", () => {
    const started = expectCall("call-5", "alan", 1000)
    spouseExpected("call-5", 2000)
    expect(streamAdmitted(streamAsked(started), 2000)).toBe(false)
    const waited = expectCall("call-6", "jenny", 1000)
    expect(streamAdmitted(streamAsked(waited), 1000 + 61_000)).toBe(false)
  })

  test("each call is answered with a leg of its own", () => {
    expect(expectCall("call-7", "alan", 1000)).not.toBe(expectCall("call-8", "jenny", 1000))
  })
})

describe("legSaid", () => {
  test("a stream starting for a call nobody answered is closed", () => {
    const one = socket()
    legSaid(one, JSON.stringify({ event: "start", start: { call_control_id: "stranger" } }))
    expect(one.made.closed).toBe(1)
  })

  test("sound from a leg not let in is ignored, as is text that is not JSON", () => {
    const one = socket()
    legSaid(one, JSON.stringify({ event: "media", media: { track: "inbound", payload: "//8=" } }))
    legSaid(one, "not json")
    expect(one.made).toEqual({ closed: 0, sent: [] })
  })
})
