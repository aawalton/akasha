import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const claudeCodeSession = {
  id: "01a065b0-2102-7c58-b7e0-4a3346b7301a",
  pageTypeSlug: "domain",
  slug: "claude-code-session",
  definition: "one conversation Claude Code can pick up again",
  partSlugs: ["domain/claude-code-session-store"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A session is one agent.",
    },
    {
      invariantKind: "departure",
      statement: "A session's id changes when the agent changes and never otherwise.",
    },
    {
      invariantKind: "departure",
      statement: "A session is found by its id rather than by where its file is kept.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each line of a session records the working directory that line was written under.",
    },
    {
      invariantKind: "absence",
      statement: "A session records no working directory of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Moving a live session's file makes the writer open a new file at the old path.",
    },
    {
      invariantKind: "departure",
      statement: "That new file holds only what was written after the move.",
    },
  ],
} as const satisfies Domain
