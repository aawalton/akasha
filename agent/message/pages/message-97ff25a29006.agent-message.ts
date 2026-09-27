import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message97ff25a29006 = {
  id: "01a0e06c-c9ec-7000-8a6b-97ff25a29006",
  type: "page-type/agent-message",
  slug: "message-97ff25a29006",
  to: "seat/alan",
  from: "audit-running",
  warrant: "announce",
  body: 'the audit at daf848a8735fdc8ae079fa51b60a1c7a68ebde19 found 2 checks newly refusing.\n`lint-clean` refused 2 times:\n  temper/items/rules/matcher/modules/inventory-rule-matcher-allocators/inventory-rule-matcher-allocators.module.code.ts — `lint/correctness/useHookAtTopLevel` at line 124, column 22 — This hook is being called conditionally, but all hooks mus... (62 characters more)\n  temper/items/rules/matcher/modules/inventory-rule-matcher-allocators/inventory-rule-matcher-allocators.module.code.ts — `lint/correctness/useHookAtTopLevel` at line 128, column 22 — This hook is being called conditionally, but all hooks mus... (62 characters more)\n`typecheck` refused 2 times:\n  temper/player/character/companion-build/pages/build-70ada5429457/build-70ada5429457.companion-build.ts — line 14: TS2322: Type \'"dps"\' is not assignable to type \'"healer" | "tank"\'.\n  temper/player/character/companion-build/pages/build-9f15f51e05d5/build-9f15f51e05d5.companion-build.ts — line 14: TS2322: Type \'"dps"\' is not assignable to type \'"healer" | "tank"\'.\nwhat each of them answered is on the newest row of the audit log beside that check\'s page. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n',
} as const satisfies AgentMessage
