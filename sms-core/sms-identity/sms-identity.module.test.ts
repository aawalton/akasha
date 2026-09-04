import { describe, expect, test } from "bun:test"
import {
  decideSmsRoute,
  normalizePhone,
  projectSmsIdentities,
  type SmsExternalIdentity,
} from "./sms-identity.module.code.ts"

const ENROLLED: SmsExternalIdentity = {
  phoneDigits: "8015551234",
  accountUserId: "acct-1",
  smsAllowed: true,
  handlerTarget: "amy",
}

describe("normalizePhone", () => {
  test("keeps the digits and drops everything else", () => {
    expect(normalizePhone("(801) 555-1234")).toBe("8015551234")
  })

  test("drops a leading country code of one", () => {
    expect(normalizePhone("+1 801 555 1234")).toBe("8015551234")
  })

  test("keeps eleven digits that do not open with one", () => {
    expect(normalizePhone("+448015551234")).toBe("448015551234")
  })

  test("answers nothing for text holding no digits", () => {
    expect(normalizePhone("nobody")).toBe("")
  })
})

describe("projectSmsIdentities", () => {
  test("drops a row naming no account", () => {
    expect(projectSmsIdentities([{ phone: "+18015551234" }])).toEqual([])
  })

  test("drops a row naming no phone", () => {
    expect(projectSmsIdentities([{ accountUserId: "acct-1" }])).toEqual([])
  })

  test("reads permission left unsaid as permission withheld", () => {
    const [only] = projectSmsIdentities([{ phone: "+18015551234", accountUserId: "acct-1" }])
    expect(only?.smsAllowed).toBe(false)
  })

  test("reads a blank handler as no handler", () => {
    const [only] = projectSmsIdentities([
      { phone: "+18015551234", accountUserId: "acct-1", smsHandlerTarget: "   " },
    ])
    expect(only?.handlerTarget).toBe(null)
  })

  test("trims the handler it keeps", () => {
    const [only] = projectSmsIdentities([
      { phone: "+18015551234", accountUserId: "acct-1", smsHandlerTarget: " amy " },
    ])
    expect(only?.handlerTarget).toBe("amy")
  })
})

describe("decideSmsRoute", () => {
  test("discards a sender matching nobody enrolled", () => {
    const decision = decideSmsRoute({ sender: "+18885559999", content: "hi" }, [ENROLLED])
    expect(decision.kind).toBe("discard")
  })

  test("discards a sender holding no digits at all", () => {
    const decision = decideSmsRoute({ sender: "nobody", content: "hi" }, [ENROLLED])
    expect(decision.kind).toBe("discard")
  })

  test("sends an enrolled sender to its own handler", () => {
    const decision = decideSmsRoute({ sender: "+18015551234", content: "hi" }, [ENROLLED])
    expect(decision.kind).toBe("helper")
    if (decision.kind !== "helper") return
    expect(decision.target).toBe("amy")
    expect(decision.accountUserId).toBe("acct-1")
  })

  test("drops an enrolled sender without permission", () => {
    const decision = decideSmsRoute({ sender: "+18015551234", content: "hi" }, [
      { ...ENROLLED, smsAllowed: false },
    ])
    expect(decision.kind).toBe("drop")
  })

  test("refuses an enrolled sender naming no handler", () => {
    const decision = decideSmsRoute({ sender: "+18015551234", content: "hi" }, [
      { ...ENROLLED, handlerTarget: null },
    ])
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") return
    expect(decision.accountUserId).toBe("acct-1")
  })
})
