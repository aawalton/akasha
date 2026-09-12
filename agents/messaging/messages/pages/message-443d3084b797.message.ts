import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message443d3084b797 = {
  id: "01a0968f-d2a4-7000-9d85-443d3084b797",
  type: "message",
  slug: "message-443d3084b797",
  to: "thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at aaeab8c05273a24a50e2feb19d9c8a7fa8eda1ba found 2 checks newly refusing.\n`index-is-level-with-the-pages` refused 20 times:\n  temper/characters-capture-addon/character-capture-skill-index-00/character-capture-skill-index-00.module.code.ts — the index entry for this file is named by a page and missing from the index\n  temper/characters-capture-addon/character-capture-skill-index-00/character-capture-skill-index-00.module.ts — the index entry for this file is named by a page and missing from the index\n  temper/characters-capture-addon/character-capture-skill-index-01/character-capture-skill-index-01.module.code.ts — the index entry for this file is named by a page and missing from the index\n  temper/characters-capture-addon/character-capture-skill-index-01/character-capture-skill-index-01.module.ts — the index entry for this file is named by a page and missing from the index\n  temper/characters-capture-addon/character-capture-skill-index-02/character-capture-skill-index-02.module.code.ts — the index entry for this file is named by a page and missing from the index\n`lint-clean` refused 1 time:\n  agents/agent.domain.ts — the linter could not read temper/characters-capture-addon/character-capture-skill-name-03/character-capture-skill-name-03.module.code.ts, temper/characters-capture-addon/character-capture-skill-name-03/character-cap... (662 characters more)\n/var/home/walton/.local/state/workstation-services/audit-verdicts.json holds what each of them refuses, whole.\n",
} as const satisfies Message
