import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message1023f5912682 = {
  id: "01a0a5ed-36c3-7000-93e5-1023f5912682",
  type: "message",
  slug: "message-1023f5912682",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 774e8092aa40422d81abe4cb361c3fb1ef9cd796 found 2 checks newly refusing.\n`folder-matches-a-shape` refused 2 times:\n  agent/seat/properties — this folder matches no folder shape — as a-claimed-folder, no page above it claims this folder; as a-domain-with-its-parts, it holds 35 pages rather than one: active-turn.boolean-property.ts, assignment-slug.one-of-p... (3981 characters more)\n  command/argument/properties — this folder matches no folder shape — as a-claimed-folder, no page above it claims this folder; as a-domain-with-its-parts, it holds 7 pages rather than one: argument-default.text-property.ts, argument-value.se... (1089 characters more)\n`index-is-level-with-the-pages` refused 1 time:\n  service/cluster/properties/service-manifest.relation-property.referenced-by — the index entry for this file is in the index differing from what its page says\n/var/home/walton/.local/state/workstation-services/audit-verdicts.json holds what each of them answered, whole.\n",
} as const satisfies Message
