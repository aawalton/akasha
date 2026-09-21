import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message3acad8e936d0 = {
  id: "01a0c466-0cdf-7000-99a4-3acad8e936d0",
  type: "page-type/message",
  slug: "message-3acad8e936d0",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at bbc75b50ffc6a2f6706a7522bd4ee75463367226 found 2 checks newly refusing.\n`manifest-names-what-is-reached` refused 1 time:\n  check/code/pages/manifest-names-what-is-reached/manifest-names-what-is-reached.check-code.ts — the check `manifest-names-what-is-reached` spent 30.566 processor seconds judging this change, over the 25 its page states, so what it judged doe... (77 characters more)\n`page-named-as-stated` refused 1 time:\n  check/code/pages/page-named-as-stated/page-named-as-stated.check-code.ts — the check `page-named-as-stated` spent 15.997 processor seconds judging this change, over the 15 its page states, so what it judged does not land — take it to Alan t... (47 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
