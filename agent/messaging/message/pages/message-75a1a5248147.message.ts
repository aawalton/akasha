import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message75a1a5248147 = {
  id: "01a0b7c4-7b96-7000-81dc-75a1a5248147",
  type: "page-type/message",
  slug: "message-75a1a5248147",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 583331c67e31f3b8591863f8a27e40669c722f51 found 1 check newly refusing.\n`no-page-address-spelled` refused 3 times:\n  alan/harness/code-editor/data-interface/modules/gap-tree-assemble/gap-tree-assemble.module.test.ts — `decision-kind/gap` spells a page's address as a plain string — a page is reached by importing that page and reading its slug, which a rena... (49 characters more)\n  check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test.ts — `decision-kind/departure` spells a page's address as a plain string — a page is reached by importing that page and reading its slug, which a rename... (47 characters more)\n  check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test.ts — `decision-kind/departure` spells a page's address as a plain string — a page is reached by importing that page and reading its slug, which a rename... (47 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
