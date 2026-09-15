import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeSessionStore = {
  id: "01a065b0-2103-7e19-a5cb-8f425124086c",
  type: "page-type/domain",
  slug: "claude-code-session-store",
  definition: "where session files are kept",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The store is `projects` under `CLAUDE_CONFIG_DIR`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The store falls to `projects` under `~/.claude` where that variable is unset.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every account shares one store directory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The sharing is made here rather than by Claude Code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A session is a file named for its id and a directory of that name beside the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file and the directory travel together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder is named for a working directory resolved through its symlinks.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each `/` in that name is written as `-`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder's name records where a session began.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing reads that name back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session file opens from wherever the file is put.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder outlives the directory the folder is named for.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing takes an old folder away.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing here works out where a session's file is from a working directory.",
    },
  ],
} as const satisfies Domain
