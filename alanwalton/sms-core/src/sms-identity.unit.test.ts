import { describe, expect, test } from "bun:test"
import {
  decideSmsRoute,
  normalizePhone,
  projectSmsIdentities,
  relationshipSmsRowSchema,
  type SmsExternalIdentity,
} from "./sms-identity"

const KI_ACCOUNT = "395db962-77dd-4aa7-b1c2-6500025dc331"
const JENNY_ACCOUNT = "9bc63b11-d301-4a51-8839-7371336262c7"

describe("normalizePhone", () => {
  test("E.164 and human-formatted US numbers normalize to the same 10 digits", () => {
    expect(normalizePhone("+18015028349")).toBe("8015028349")
    expect(normalizePhone("(801) 502-8349")).toBe("8015028349")
    expect(normalizePhone("801-502-8349")).toBe("8015028349")
    expect(normalizePhone("18015028349")).toBe("8015028349")
  })
  test("a bare 10-digit number is unchanged", () => {
    expect(normalizePhone("8015028349")).toBe("8015028349")
  })
  test("non-digit / empty input yields empty string", () => {
    expect(normalizePhone("")).toBe("")
    expect(normalizePhone("not-a-phone")).toBe("")
  })
})

describe("projectSmsIdentities", () => {
  test("keeps only rows with an accountUserId AND a non-empty phone", () => {
    const out = projectSmsIdentities([
      {
        phone: "(801) 502-8349",
        accountUserId: KI_ACCOUNT,
        smsAllowed: true,
        smsHandlerTarget: "ki",
      },
      { phone: "", accountUserId: "9ba554f7-cb18-48bb-a709-ec935a895ca7" },
      { phone: "(555) 111-2222" },
      { accountUserId: "x", phone: undefined },
    ])
    expect(out).toHaveLength(1)
    expect(out[0]).toEqual({
      phoneDigits: "8015028349",
      accountUserId: KI_ACCOUNT,
      smsAllowed: true,
      handlerTarget: "ki",
    })
  })
  test("absent smsAllowed projects as false (fail-closed)", () => {
    const out = projectSmsIdentities([{ phone: "8015028349", accountUserId: KI_ACCOUNT }])
    expect(out[0]?.smsAllowed).toBe(false)
  })

  test("absent, null and blank smsHandlerTarget all project as null — no default handler", () => {
    for (const row of [
      { phone: "8015028349", accountUserId: KI_ACCOUNT },
      { phone: "8015028349", accountUserId: KI_ACCOUNT, smsHandlerTarget: null },
      { phone: "8015028349", accountUserId: KI_ACCOUNT, smsHandlerTarget: "   " },
    ]) {
      expect(projectSmsIdentities([row])[0]?.handlerTarget).toBeNull()
    }
  })

  test("a row with no handler stays in the set rather than being dropped from it", () => {
    const out = projectSmsIdentities([{ phone: "8015028349", accountUserId: KI_ACCOUNT }])
    expect(out).toHaveLength(1)
    expect(out[0]?.accountUserId).toBe(KI_ACCOUNT)
  })

  test("an explicit smsHandlerTarget is projected verbatim (per-identity routing)", () => {
    const out = projectSmsIdentities([
      { phone: "6085122511", accountUserId: JENNY_ACCOUNT, smsHandlerTarget: "jenny" },
    ])
    expect(out[0]?.handlerTarget).toBe("jenny")
  })
})

describe("relationshipSmsRowSchema", () => {
  test("a null smsHandlerTarget on an enrolled row parses and keeps the identity", () => {
    const enrolledRowWithNoHandler = {
      phone: "(801) 502-8196",
      accountUserId: KI_ACCOUNT,
      smsAllowed: true,
      smsHandlerTarget: null,
    }
    const parsed = relationshipSmsRowSchema.safeParse(enrolledRowWithNoHandler)
    expect(parsed.success).toBe(true)
    if (!parsed.success) return
    const out = projectSmsIdentities([parsed.data])
    expect(out).toHaveLength(1)
    expect(out[0]?.accountUserId).toBe(KI_ACCOUNT)
    expect(out[0]?.smsAllowed).toBe(true)
    expect(out[0]?.handlerTarget).toBeNull()
  })
})

describe("decideSmsRoute", () => {
  const kiAllowed: SmsExternalIdentity = {
    phoneDigits: "8015028349",
    accountUserId: KI_ACCOUNT,
    smsAllowed: true,
    handlerTarget: "ki",
  }
  const kiRevoked: SmsExternalIdentity = { ...kiAllowed, smsAllowed: false }
  const enrolledWithNoHandler: SmsExternalIdentity = { ...kiAllowed, handlerTarget: null }
  const jennyAllowed: SmsExternalIdentity = {
    phoneDigits: "6085122511",
    accountUserId: JENNY_ACCOUNT,
    smsAllowed: true,
    handlerTarget: "jenny",
  }

  test("allowlisted sender → ki carrying its accountUserId", () => {
    const d = decideSmsRoute({ sender: "+18015028349", content: "logged a book" }, [kiAllowed])
    expect(d.kind).toBe("helper")
    if (d.kind === "helper") {
      expect(d.target).toBe("ki")
      expect(d.accountUserId).toBe(KI_ACCOUNT)
    }
  })

  test("a jenny-targeted identity routes to jenny carrying HER account", () => {
    const d = decideSmsRoute({ sender: "+16085122511", content: "add a place" }, [
      kiAllowed,
      jennyAllowed,
    ])
    expect(d.kind).toBe("helper")
    if (d.kind === "helper") {
      expect(d.target).toBe("jenny")
      expect(d.accountUserId).toBe(JENNY_ACCOUNT)
    }
  })

  test("matched-but-revoked external identity → drop fail-closed (never amy)", () => {
    const d = decideSmsRoute({ sender: "+18015028349", content: "private note" }, [kiRevoked])
    expect(d.kind).toBe("drop")
  })

  test("unknown sender → discard, carrying who without what they wrote", () => {
    const d = decideSmsRoute({ sender: "+18885550000", content: "a stranger's words" }, [kiAllowed])
    expect(d.kind).toBe("discard")
    if (d.kind === "discard") expect(d.sender).toBe("+18885550000")
    expect(JSON.stringify(d)).not.toContain("a stranger's words")
  })

  test("no identities at all → discard (an empty allowlist admits nobody)", () => {
    const d = decideSmsRoute({ sender: "+18015028349", content: "hi" }, [])
    expect(d.kind).toBe("discard")
  })

  test("helper-shaped content does NOT admit a non-identity sender — discarded anyway", () => {
    const d = decideSmsRoute({ sender: "+19995551234", content: "calendar?" }, [kiAllowed])
    expect(d.kind).toBe("discard")
    expect(d).not.toHaveProperty("target")
  })

  test("a sender named nowhere in an empty allowlist is not admitted either", () => {
    const d = decideSmsRoute({ sender: "+19995551234", content: "anything at all" }, [])
    expect(d.kind).toBe("discard")
  })

  test("identity match wins over helper-shaped content for the same sender", () => {
    const d = decideSmsRoute({ sender: "+18015028349", content: "calendar?" }, [kiAllowed])
    expect(d.kind).toBe("helper")
    if (d.kind === "helper") expect(d.target).toBe("ki")
  })

  test("an enrolled, allowed sender whose record names no handler is refused, not routed", () => {
    const d = decideSmsRoute({ sender: "+18015028349", content: "a private message" }, [
      enrolledWithNoHandler,
    ])
    expect(d.kind).toBe("refuse")
    expect(d).not.toHaveProperty("target")
    if (d.kind === "refuse") expect(d.accountUserId).toBe(KI_ACCOUNT)
  })

  test("content does not supply the handler a sender's own record lacks", () => {
    const d = decideSmsRoute({ sender: "+18015028349", content: "calendar?" }, [
      enrolledWithNoHandler,
    ])
    expect(d.kind).toBe("refuse")
  })
})
