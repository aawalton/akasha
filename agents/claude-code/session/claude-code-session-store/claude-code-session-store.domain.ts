import type { Domain } from "../../../../domain-system/domains/domain.page-type.ts"

export const claudeCodeSessionStore = {
  id: "01a065b0-2103-7e19-a5cb-8f425124086c",
  pageTypeSlug: "domain",
  slug: "claude-code-session-store",
  definition: "where session files are kept",
  partSlugs: ["domain/claude-code-session-store-path"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The store is `projects` under `CLAUDE_CONFIG_DIR`.",
    },
    {
      invariantKind: "departure",
      statement: "The store falls to `projects` under `~/.claude` where that variable is unset.",
    },
    {
      invariantKind: "departure",
      statement: "Every account shares one store directory.",
    },
    {
      invariantKind: "departure",
      statement: "The sharing is made here rather than by Claude Code.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session is a file named for its id and a directory of that name beside the file.",
    },
    {
      invariantKind: "departure",
      statement: "The file and the directory travel together.",
    },
  ],
} as const satisfies Domain
