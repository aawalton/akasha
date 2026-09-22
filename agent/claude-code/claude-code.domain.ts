import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCode = {
  id: "01a065b0-2100-7a41-9c02-3e5197d4b91f",
  type: "page-type/domain",
  slug: "claude-code",
  definition: "an akasha agent's program",
  parts: [
    "domain/claude-code-session-store",
    "domain/claude-code-tool",
    "module/claude-launch-args",
    "module/session-jsonl",
    "module/session-jsonl-schema",
    "module/session-watch",
    "module/transcript-materialize",
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
  ],
} as const satisfies Domain
