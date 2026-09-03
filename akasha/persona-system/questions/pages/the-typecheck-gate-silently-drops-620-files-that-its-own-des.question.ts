import type { Question } from "../question.page-type.ts"

export const theTypecheckGateSilentlyDrops620FilesThatItsOwnDes = {
  id: "01a047da-9b79-7000-bcb4-1d20f018869e",
  pageTypeSlug: "question",
  slug: "the-typecheck-gate-silently-drops-620-files-that-its-own-des",
  ask: "The typecheck gate silently drops 620 files that its own Design line says it owns. Is the code the bug, or is the declaration?",
  askedBy: "astra",
  askedIn: "01a04357-3025-7000-b40c-ef42fdbc377e",
  status: "open",
  offered: [
    "The Design line is right — repair rootsFor so ownership runs by path",
    "The code is right — correct the Design line to say membership governs",
    "Neither yet — measure the fallout of widening the population first",
  ],
  context: "txt",
} as const satisfies Question
