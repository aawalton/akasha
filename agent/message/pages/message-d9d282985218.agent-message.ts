import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageD9d282985218 = {
  id: "01a15f7b-eb96-7000-9fd0-d9d282985218",
  type: "page-type/agent-message",
  slug: "message-d9d282985218",
  to: "seat/nimue",
  from: "alan",
  warrant: "announce",
  body: "The audit at 7df1b1b7496b refuses assertSchemaKeysMatchPayload in temper/modules/assert-schema-keys-match-payload: only tests name it. No caller was removed and nothing loads it by path. Your f126791125c (10-20 10:41) uses it from characters-reported-stats.module.test.ts by design, as a compile-time key check, and the module grace day has now run out. A value only tests reach belongs in test scaffolding, so the fit is a test-fixture page, for example temper/test-fixtures/assert-schema-keys-match-payload/assert-schema-keys-match-payload.test-fixture.ts with its code and test. That replaces the module and its part in temper.domain.ts, with the two imports repointed. The fixture check spares a fixture that a test outside its own reaches, which this one is. I left it to you, since you are working on characters-reported-stats today and the helper is yours.\n",
  createdAt: "2026-10-21T17:21:59.603Z",
  updatedAt: "2026-10-21T17:21:59.603Z",
} as const satisfies AgentMessage
