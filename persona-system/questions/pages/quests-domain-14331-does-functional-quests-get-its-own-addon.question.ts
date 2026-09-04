import type { Question } from "../question.page-type.ts"

export const questsDomain14331DoesFunctionalQuestsGetItsOwnAddon = {
  id: "019f711d-503d-7610-a4d2-65918f20cca2",
  pageTypeSlug: "question",
  slug: "quests-domain-14331-does-functional-quests-get-its-own-addon",
  ask: "Quests domain (#14331): does Functional:Quests get its own addon, or stay node-only? The domain owns exactly ONE extractable unit — the native auto-quest arm (~873 lines, currently inside the Completion addon). Everything else quest-shaped is thin journal-READ arms correctly owned by consumer domains (writs, tracking, pins, labels).",
  askedBy: "ember",
  askedIn: "019f32f0-ea53-7940-9596-1613e218bb1f",
  status: "answered",
  offered: [
    "A: carve TemperQuests addon (game-tier — chatter-advance is mechanism)",
    "A: carve TemperQuests addon (player-tier — auto-do-quests is policy)",
    "B: node-only — auto-quest stays in the Completion addon (Mail-precedent shape)",
  ],
  answer: "A: carve TemperQuests addon (player-tier — auto-do-quests is policy)",
  closedAt: "2026-07-17T17:28:43.516Z",
  context: "txt",
} as const satisfies Question
