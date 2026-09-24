import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message09ed823ce924 = {
  id: "01a0d379-5936-7000-b8b5-09ed823ce924",
  type: "page-type/agent-message",
  slug: "message-09ed823ce924",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 51b37be9f63dca1dffcf7948da6aa2200c808c21 found 2 checks newly refusing.\n`no-unused-exports` refused 10 times:\n  check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.decision.code.ts — exports `ownerOf`, which only a test names — a value only a test names is code only the test runs\n  story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-health-max.metric-character-derived.formula.code.ts — exports `worked`, which only a test names — a value only a test names is code only the test runs\n  story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-initiative.metric-character-derived.formula.code.ts — exports `worked`, which only a test names — a value only a test names is code only the test runs\n  story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mana-max.metric-character-derived.formula.code.ts — exports `worked`, which only a test names — a value only a test names is code only the test runs\n  story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mental-attack.metric-character-derived.formula.code.ts — exports `worked`, which only a test names — a value only a test names is code only the test runs\n`no-unused-modules` refused 1 time:\n  alan/harness/voice-core/modules/mark-schema/mark-schema.module.ts — no file imports `mark-schema`, its code declares no entry point, no bundle entry point reaches it, no other file spells its slug and no file outside TypeScript names a file... (62 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies AgentMessage
