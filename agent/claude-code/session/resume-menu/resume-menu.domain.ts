import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const resumeMenu = {
  id: "01a155c4-a117-7c5d-ac36-b38073e0f263",
  type: "page-type/domain",
  slug: "resume-menu",
  definition:
    "a menu that asks whether a Claude Code session goes on from a summary of the Claude Code session",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "resume menu" },
    { partOfSpeech: "part-of-speech/noun", spelling: "resume menus" },
  ],
  createdAt: "2026-10-19T20:05:12.083Z",
  updatedAt: "2026-10-19T20:05:12.083Z",
} as const satisfies Domain
