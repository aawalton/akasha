import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeRemoteControl = {
  id: "01a09c78-e5b9-709e-bc75-2a6425da7d7b",
  type: "page-type/domain",
  slug: "claude-code-remote-control",
  definition: "how a person chats with a seat from the Claude Code app",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "Claude Code Remote Control" }],
  parts: [
    "module/claude-code-remote-control-degraded-decide",
    "module/claude-code-remote-control-degraded-state",
    "module/claude-code-remote-control-degraded-thresholds",
    "module/claude-code-remote-control-decide",
    "module/claude-code-remote-control-default",
    "module/claude-code-remote-control-env",
  ],
} as const satisfies Domain
