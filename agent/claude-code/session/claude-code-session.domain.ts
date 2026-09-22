import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeSession = {
  id: "01a0c9aa-9160-7910-b58e-7182271d836f",
  type: "page-type/domain",
  slug: "claude-code-session",
  definition: "an agent session in Claude Code",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "session" },
    { partOfSpeech: "part-of-speech/noun", spelling: "sessions" },
  ],
  parts: [
    "domain/claude-code-session-store",
    "module/session-jsonl",
    "module/session-jsonl-schema",
    "module/session-watch",
    "module/transcript-materialize",
    "domain/claude-code-session-event",
    "domain/claude-code-session-transition",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A session is one agent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session's id changes when the agent changes and never otherwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session is found by its id rather than by where its file is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each line of a session records the working directory that line was written under.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A session records no working directory of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Moving a live session's file makes the writer open a new file at the old path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That new file has only the lines written after the move.",
    },
  ],
} as const satisfies Domain
