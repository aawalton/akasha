import { describe, expect, it } from "bun:test"
import fc from "fast-check"
import { decide } from "./decide"
import type { EmailAction, InboundMessage } from "./types"

const ACTIONS: readonly EmailAction[] = ["surface", "agent-handle", "discard"]

const inputArb: fc.Arbitrary<InboundMessage> = fc.record({
  from: fc.string(),
  fromAddress: fc.string(),
  fromDomain: fc.string(),
  subject: fc.string(),
  to: fc.string(),
  isFromSelf: fc.boolean(),
  addressedAgentHandle: fc.option(fc.constantFrom("amy", "bob", "dalla"), { nil: undefined }),
  hasListUnsubscribe: fc.boolean(),
  isSpam: fc.boolean(),
  isSent: fc.boolean(),
})

describe("decide — invariants", () => {
  it("always returns a valid action (totality)", () => {
    fc.assert(
      fc.property(inputArb, (input) => {
        expect(ACTIONS).toContain(decide(input).action)
      })
    )
  })

  it("no message lacking the SENT label ever reaches a seat", () => {
    fc.assert(
      fc.property(inputArb, (input) => {
        expect(decide({ ...input, isSent: false }).action).not.toBe("agent-handle")
      })
    )
  })

  it("a From claiming to be Alan buys nothing the same message without the claim lacks", () => {
    fc.assert(
      fc.property(inputArb, (input) => {
        expect(decide({ ...input, isFromSelf: true })).toEqual(
          decide({ ...input, isFromSelf: false })
        )
      })
    )
  })

  it("is deterministic for identical inputs", () => {
    fc.assert(
      fc.property(inputArb, (input) => {
        expect(decide(input)).toEqual(decide(input))
      })
    )
  })

  it("a message not addressed to a persona channel always surfaces", () => {
    fc.assert(
      fc.property(
        inputArb.map((i) => ({ ...i, addressedAgentHandle: undefined })),
        (input) => {
          expect(decide(input).action).toBe("surface")
        }
      )
    )
  })

  it("wakes the persona exactly when Alan SENT the channel mail, and discards otherwise", () => {
    fc.assert(
      fc.property(
        inputArb,
        fc.constantFrom("amy", "bob", "dalla"),
        fc.boolean(),
        (input, handle, isSent) => {
          const d = decide({ ...input, addressedAgentHandle: handle, isSent })
          expect(d.action).toBe(isSent ? "agent-handle" : "discard")
          expect(d.agentHandle).toBe(isSent ? handle : undefined)
        }
      )
    )
  })

  it("a forged From claiming to be Alan never reaches a seat", () => {
    fc.assert(
      fc.property(inputArb, fc.constantFrom("amy", "bob", "dalla"), (input, handle) => {
        const d = decide({
          ...input,
          from: "Alan Walton <aawalton@gmail.com>",
          fromAddress: "aawalton@gmail.com",
          isFromSelf: true,
          isSent: false,
          addressedAgentHandle: handle,
        })
        expect(d.action).toBe("discard")
        expect(d.agentHandle).toBeUndefined()
      })
    )
  })

  it("a discard reason never quotes the sender's subject", () => {
    fc.assert(
      fc.property(
        inputArb,
        fc.constantFrom("amy", "bob", "dalla"),
        fc.string({ minLength: 12 }),
        (input, handle, subject) => {
          const d = decide({ ...input, addressedAgentHandle: handle, isSent: false, subject })
          expect(d.action).toBe("discard")
          expect(d.reason).not.toContain(subject)
        }
      )
    )
  })
})
