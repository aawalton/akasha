import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const slashCommand = {
  id: "01a16429-0784-7b0b-9a2a-acfa2e126204",
  type: "page-type/domain",
  slug: "slash-command",
  definition: "a prompt that starts with a slash and that Claude Code runs in place of an agent",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "slash command" },
    { partOfSpeech: "part-of-speech/noun", spelling: "slash commands" },
  ],
  createdAt: "2026-10-22T15:09:32.931Z",
  updatedAt: "2026-10-22T15:09:32.931Z",
} as const satisfies Domain
