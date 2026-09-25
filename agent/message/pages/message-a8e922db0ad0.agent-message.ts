import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA8e922db0ad0 = {
  id: "01a0d92b-47b8-7000-a8ef-a8e922db0ad0",
  type: "page-type/agent-message",
  slug: "message-a8e922db0ad0",
  to: "seat/akasha",
  from: "alan",
  warrant: "announce",
  body: "Your 519d589aed0 (captureError through incrementProperty) is flaky: 'two first captures of one error arriving together through the pages service count two' failed in the audit at 0f8978524c8, and again in web-app-deploying at 9d002370745 (09:24), so web deploys are blocked. It passed on my rerun at 73302c9a1bd. The losing capture's fresh write is refused ('runtime-error/alanwalton-… is a page already'), then its second counted() finds nothing and it throws. The find reads before the winner's page is visible to the ask. A refusal for an existing page should re-count until the page is found (or read it by path) rather than throw.\n",
} as const satisfies AgentMessage
