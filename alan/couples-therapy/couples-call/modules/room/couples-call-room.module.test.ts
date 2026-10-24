import { describe, expect, test } from "bun:test"
import {
  expectCall,
  legSaid,
  spouseExpected,
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
