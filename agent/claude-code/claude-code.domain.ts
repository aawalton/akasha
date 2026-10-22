import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCode = {
  id: "01a065b0-2100-7a41-9c02-3e5197d4b91f",
  type: "page-type/domain",
  slug: "claude-code",
  definition: "an akasha agent's program",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Claude Code" }],
  parts: [
    "domain/claude-code-session",
    "domain/claude-code-tool",
    "module/claude-launch-args",
    "domain/claude-code-remote-control",
    "domain/claude-code-app",
    "domain/slash-command",
  ],
  createdAt: "2026-09-03T05:13:56.736Z",
  updatedAt: "2026-10-22T15:09:32.931Z",
} as const satisfies Domain
