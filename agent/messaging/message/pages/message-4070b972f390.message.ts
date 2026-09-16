import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message4070b972f390 = {
  id: "01a0aa78-b48c-7000-9c70-4070b972f390",
  type: "page-type/message",
  slug: "message-4070b972f390",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at fe04e408f766f54094eeeb0475d59e2e3aa69ffd found 1 check newly refusing.\n`property-sits-under-the-page-it-is-a-part-of` refused 5 times:\n  alan/music/listening/heard-music/tracks/tracks.page-property-entry.ts — `page-property-entry/tracks` sits in `alan/music/listening/heard-music/tracks`, and `alan/music/listening/heard-music/heard-music.page-type.ts` names it a part — a prop... (114 characters more)\n  alan/track/daily/day/properties/health-samples/health-samples.page-property-entry.ts — `page-property-entry/health-samples` sits in `alan/track/daily/day/properties/health-samples`, and `alan/track/daily/day/day.page-type.ts` names it a par... (112 characters more)\n  alan/track/daily/day/properties/listens/listens.page-property-entry.ts — `page-property-entry/listens` sits in `alan/track/daily/day/properties/listens`, and `alan/track/daily/day/day.page-type.ts` names it a part — a property page sits in ... (84 characters more)\n  alan/track/daily/day/properties/sessions/sessions.page-property-entry.ts — `page-property-entry/sessions` sits in `alan/track/daily/day/properties/sessions`, and `alan/track/daily/day/day.page-type.ts` names it a part — a property page sits... (88 characters more)\n  person/email/gmail-mailbox/properties/processed-messages/processed-messages.page-property-entry.ts — `page-property-entry/processed-messages` sits in `person/email/gmail-mailbox/properties/processed-messages`, and `person/email/gmail-mailbo... (162 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
