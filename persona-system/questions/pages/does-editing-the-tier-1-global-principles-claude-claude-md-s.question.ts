import type { Question } from "../question.page-type.ts"

export const doesEditingTheTier1GlobalPrinciplesClaudeClaudeMdS = {
  id: "019f9b34-45a7-7874-81f4-f1cfd10f5fad",
  pageTypeSlug: "question",
  slug: "does-editing-the-tier-1-global-principles-claude-claude-md-s",
  ask: "Does editing the Tier 1 Global Principles (~/.claude/CLAUDE.md) still need your approval?",
  askedBy: "nimue",
  askedIn: "019f6930-62ae-7d52-be5c-d690b1d581d2",
  status: "answered",
  offered: [
    "Gate dropped — proceed without asking",
    "Gate is live — ask me every time",
    "No gate for moves/renames, ask for content changes",
  ],
  answer: "Gate dropped — proceed without asking",
  closedAt: "2026-07-25T21:36:24.881Z",
  context: "txt",
} as const satisfies Question
