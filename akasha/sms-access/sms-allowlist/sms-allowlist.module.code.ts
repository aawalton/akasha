import { askComposed } from "@akasha/pages-query/ask"
import {
  projectSmsIdentities,
  type RelationshipSmsRow,
  relationshipSmsRowSchema,
  type SmsExternalIdentity,
} from "@akasha/sms-core/sms-identity"
import { asBoolean } from "@akasha/utils-narrow/as-boolean"
import type { SmsAllowlistClient } from "../client/client.module.code.ts"

export async function loadSmsExternalIdentities(
  _sb: SmsAllowlistClient
): Promise<readonly SmsExternalIdentity[]> {
  const asked = await askComposed({
    "page-type": "relationship",
    keys: ["phone", "account-user-id", "sms-allowed", "sms-handler-target"],
  })
  if (!asked.ok) throw new Error(`loadSmsExternalIdentities: ${asked.why}`)
  const parsed: RelationshipSmsRow[] = []
  for (const { values: r } of asked.answer.rows) {
    const result = relationshipSmsRowSchema.safeParse({
      phone: r.phone,
      accountUserId: r["account-user-id"],
      smsAllowed: asBoolean(r["sms-allowed"]),
      smsHandlerTarget: r["sms-handler-target"],
    })
    if (result.success) parsed.push(result.data)
  }
  return projectSmsIdentities(parsed)
}
