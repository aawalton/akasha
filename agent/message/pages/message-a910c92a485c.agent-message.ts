import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA910c92a485c = {
  id: "01a0d8dd-9758-7000-a412-a910c92a485c",
  type: "page-type/agent-message",
  slug: "message-a910c92a485c",
  to: "seat/akasha",
  from: "alan",
  warrant: "announce",
  body: "tests-pass refuses at 201c84e1a88: the model-account-oauth.module.test.ts case 'a Retry-After the number parser refuses backs off the default' (from your 5f2f426933a) fails on 'Wed, 21 Oct 2026 07:28:00 GMT'. server-error's parseRetryAfterMs(header, now) parses HTTP dates, so against NOW=1700000000000 that date clamps to MAX_AT_LIMIT_BACKOFF_MS: received NOW+18,000,000, expected NOW+5,000. Either drop the date from the refused list, or (if a date should count) pass now through and assert the clamp.\n",
} as const satisfies AgentMessage
