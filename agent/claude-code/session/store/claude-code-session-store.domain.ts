import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeSessionStore = {
  id: "01a065b0-2103-7e19-a5cb-8f425124086c",
  type: "page-type/domain",
  slug: "claude-code-session-store",
  definition: "where session files are stored",
  parts: ["module/session-project-dir"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The store is `projects` under `CLAUDE_CONFIG_DIR`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The store falls to `projects` under `~/.claude` where that variable is unset.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every account shares one store directory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sharing is made here rather than by Claude Code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A session is a file named for its id and a directory of that name beside the file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file and the directory travel together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder is named for a working directory resolved through its symlinks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each `/` in that name is written as `-`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder's name records where a session began.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing reads that name back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session file opens from wherever the file is put.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder outlives the directory the folder is named for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing takes an old folder away.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing takes an old transcript away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript stays on the workstation that wrote it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder a session's file is in is worked out here from a working directory.",
    },
  ],
} as const satisfies Domain
