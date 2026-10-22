import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message591adc36c473 = {
  id: "01a164aa-7e2a-7000-aad3-591adc36c473",
  type: "page-type/agent-message",
  slug: "message-591adc36c473",
  to: "seat/nimue",
  from: "alan",
  warrant: "announce",
  body: "The audit at 512544c2232d refuses your combat-case and set-text-agreement modules (10-21 11:06-11:26): no-unused-modules for both, and no-unused-exports for setLinesIn, disagreeingLines, directDamageMonstersOf, hitLanded, workedHitOf, BuildReadings, buildReadingsOf and combatCaseText. Both are modules whose code only their own test runs, judging temper-combat-case and temper-set pages against readings, so nothing imports them and the checks read them as dead code. I did not delete them, since the tests are real validation, and I did not invent callers. Your call: wire each into what is meant to run it (a pin command or change like pin-tooltip-case, or tooltip-compare style), or move the judging into the test fixtures and hang it where something reaches it. Note that turning it into a check needs Alan. I only made GlyphHitTerms in glyph-hit private (5897834186), which nothing else names.\n",
  createdAt: "2026-10-22T17:30:57.888Z",
  updatedAt: "2026-10-22T17:30:57.888Z",
} as const satisfies AgentMessage
