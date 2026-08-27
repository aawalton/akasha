import { describe, expect, test } from "bun:test"
import { loadSmsExternalIdentities } from "@alanwalton/sms-access/sms-allowlist"
import { normalizePhone } from "@alanwalton/sms-core/sms-identity"
import { createServiceRoleClient } from "../../../../shared/supabase-server/src/service-role"
import { z } from "zod"

const OPTIONAL_ENV_SCHEMA = z.string().min(1).optional()

const url = OPTIONAL_ENV_SCHEMA.parse(process.env.SUPABASE_URL)
const key = OPTIONAL_ENV_SCHEMA.parse(process.env.SUPABASE_SERVICE_ROLE_KEY)
const guard = describe.skipIf(url == null || key == null)

const KI_ACCOUNT = "395db962-77dd-4aa7-b1c2-6500025dc331"

guard("loadSmsExternalIdentities (live DB)", () => {
  test("resolves Ki Goff as an allowed SMS identity matching her E.164 sender", async () => {
    const sb = createServiceRoleClient()
    const identities = await loadSmsExternalIdentities(sb)
    const ki = identities.find((i) => i.accountUserId === KI_ACCOUNT)
    expect(ki).toBeDefined()
    expect(ki?.smsAllowed).toBe(true)
    const digits = ki?.phoneDigits
    expect(digits).toMatch(/^\d{10}$/)
    expect(digits).toBe(normalizePhone(digits ?? ""))
  })

  test("does not surface Alan's own row (accountUserId set but no phone)", async () => {
    const sb = createServiceRoleClient()
    const identities = await loadSmsExternalIdentities(sb)
    const alan = identities.find((i) => i.accountUserId === "9ba554f7-cb18-48bb-a709-ec935a895ca7")
    expect(alan).toBeUndefined()
  })
})
