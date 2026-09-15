import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message182776c18d49 = {
  id: "01a0a325-fb7a-7000-a9d8-182776c18d49",
  type: "message",
  slug: "message-182776c18d49",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at cd4c2358fb932e6bd155f130c2ec584a10a6c301 found 2 checks newly refusing.\n`domain-is-named-by-a-parent` refused 2 times:\n  command/argument/properties/said.text-property.ts — no page names `text-property/said` among its parts — every page under `domain` but `domain/akasha` is a part of a page above it\n  command/argument/properties/takes.text-property.ts — no page names `text-property/takes` among its parts — every page under `domain` but `domain/akasha` is a part of a page above it\n`index-is-level-with-the-pages` refused 62 times:\n  seat/pages/astra/astra.seat.referenced-by — the index entry for this file is in the index differing from what its page says\n  attribute/readout/attribute-charisma/attribute-charisma.readout.referenced-by — the index entry for this file is in the index differing from what its page says\n  attribute/readout/attribute-constitution/attribute-constitution.readout.referenced-by — the index entry for this file is in the index differing from what its page says\n  attribute/readout/attribute-endurance/attribute-endurance.readout.referenced-by — the index entry for this file is in the index differing from what its page says\n  attribute/readout/attribute-intelligence/attribute-intelligence.readout.referenced-by — the index entry for this file is in the index differing from what its page says\n/var/home/walton/.local/state/workstation-services/audit-verdicts.json holds what each of them answered, whole.\n",
} as const satisfies Message
