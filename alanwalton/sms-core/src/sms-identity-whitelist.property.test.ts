import { describe, expect, test } from "bun:test"
import fc from "fast-check"
import { decideSmsRoute, type SmsExternalIdentity } from "./sms-identity"

const PHONE_POOL = ["8015028349", "6085122511", "8015551234", "9995551234"]

const identityArb: fc.Arbitrary<SmsExternalIdentity> = fc.record({
  phoneDigits: fc.constantFrom(...PHONE_POOL),
  accountUserId: fc.stringMatching(/^[a-z0-9]{1,8}$/).filter((s) => s.length > 0),
  smsAllowed: fc.boolean(),
  handlerTarget: fc.option(fc.stringMatching(/^[a-z][a-z0-9-]{0,12}$/), { nil: null }),
})

const identitiesArb = fc.array(identityArb, { maxLength: 6 })

const senderArb = fc.oneof(
  fc.constantFrom(...PHONE_POOL).map((d) => `+1${d}`),
  fc.constantFrom("+15550000000", "+447700900000", "", "not-a-phone")
)

function matchingRow(
  identities: readonly SmsExternalIdentity[],
  sender: string
): SmsExternalIdentity | undefined {
  const digits = sender.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "")
  if (digits.length === 0) return undefined
  return identities.find((i) => i.phoneDigits === digits)
}

describe("decideSmsRoute — the whitelist over the full input space", () => {
  test("delivery happens EXACTLY where enrolled, allowed and naming-its-own-handler all hold", () => {
    fc.assert(
      fc.property(identitiesArb, senderArb, (identities, sender) => {
        const decision = decideSmsRoute({ sender, content: "arbitrary content" }, identities)
        const match = matchingRow(identities, sender)
        const shouldDeliver = match?.smsAllowed === true && match.handlerTarget !== null

        expect(decision.kind === "helper").toBe(shouldDeliver)
        if (match !== undefined && match.handlerTarget !== null && match.smsAllowed) {
          expect(decision).toMatchObject({
            kind: "helper",
            target: match.handlerTarget,
            accountUserId: match.accountUserId,
          })
        }
      }),
      { numRuns: 500 }
    )
  })

  test("every non-delivery is the arm its own condition names — no fourth case", () => {
    fc.assert(
      fc.property(identitiesArb, senderArb, (identities, sender) => {
        const decision = decideSmsRoute({ sender, content: "arbitrary content" }, identities)
        const match = matchingRow(identities, sender)

        if (match === undefined) expect(decision.kind).toBe("discard")
        else if (!match.smsAllowed) expect(decision.kind).toBe("drop")
        else if (match.handlerTarget === null) expect(decision.kind).toBe("refuse")
        else expect(decision.kind).toBe("helper")
      }),
      { numRuns: 500 }
    )
  })

  test("no content admits a sender the allowlist does not name", () => {
    fc.assert(
      fc.property(identitiesArb, senderArb, (identities, sender) => {
        if (matchingRow(identities, sender) !== undefined) return
        const decision = decideSmsRoute({ sender, content: "calendar?" }, identities)
        expect(decision.kind).toBe("discard")
        expect(decision).not.toHaveProperty("target")
      }),
      { numRuns: 500 }
    )
  })
})
