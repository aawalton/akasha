import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const agentMessage = {
  id: "01a06818-107b-7005-8e69-8cefb68f3cdf",
  type: "page-type/page-type",
  slug: "agent-message",
  definition: "text an agent is sent",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "agent message" },
    { partOfSpeech: "part-of-speech/noun", spelling: "agent messages" },
    { partOfSpeech: "part-of-speech/noun", spelling: "message", scope: "page-type/agent-message" },
    {
      partOfSpeech: "part-of-speech/noun",
      spelling: "messages",
      scope: "page-type/agent-message",
    },
  ],
  extends: ["page-type/page"],
  mortal: true,
  parts: [
    "domain/agent-message-recipient-resolving",
    "instant-property/agent-message-claimed-at",
    "module/agent-message-record",
    "module/agent-message-channel-delivery",
    "module/agent-message-file",
    "module/agent-message-file-watch",
    "module/agent-message-naming",
    "module/agent-message-sending",
    "module/agent-message-agent-id",
    "module/agent-message-agent-tools",
    "module/agent-message-console-stdout-guard",
    "module/agent-message-delivery-witness",
    "module/agent-message-mcp",
    "module/agent-message-supervisor-claimed-reconcile",
    "module/agent-message-supervisor-claimed-redelivery-decide",
    "module/agent-message-supervisor-claim",
    "module/agent-message-supervisor-redelivery-holdoff",
    "page-type/agent-message-notice",
    "relation-property/agent-message-to",
    "select-property/agent-message-warrant",
    "text-property/agent-message-body",
    "text-property/agent-message-from",
  ],
  properties: [
    { pageProperty: "relation-property/agent-message-to", required: true, many: false },
    { pageProperty: "text-property/agent-message-from", required: true, many: false },
    {
      pageProperty: "select-property/agent-message-warrant",
      required: true,
      many: false,
      default: "announce",
    },
    { pageProperty: "text-property/agent-message-body", required: true, many: false },
    {
      pageProperty: "instant-property/agent-message-claimed-at",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message accepted is a file written rather than a message arrived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message lands the same way whatever the recipient is doing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sending and claiming and reading are three separate acts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message read is that message's file gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message waits on its file rather than failing at its sender.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message revives the seat that message reaches rather than starting a seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message claimed and left is claimed again once the claim is let go.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message is named for the last twelve hex of its identity rather than for that message's words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is named as that message is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing readable about a message is known when that message is named.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The messages waiting exist as pages under this type rather than as markdown.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
