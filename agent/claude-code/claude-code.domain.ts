import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCode = {
  id: "01a065b0-2100-7a41-9c02-3e5197d4b91f",
  type: "page-type/domain",
  slug: "claude-code",
  definition: "an akasha agent's program",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "Claude" },
    { partOfSpeech: "part-of-speech/noun", spelling: "Code" },
  ],
  parts: ["domain/claude-code-session", "domain/claude-code-tool", "module/claude-launch-args"],
} as const satisfies Domain
