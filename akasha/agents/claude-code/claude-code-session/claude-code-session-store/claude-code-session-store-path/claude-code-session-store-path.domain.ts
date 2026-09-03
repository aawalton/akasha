import type { Domain } from "../../../../../domain-system/domains/domain.page-type.ts"

export const claudeCodeSessionStorePath = {
  id: "01a065b0-2104-7f7d-be86-1cd42797ac84",
  pageTypeSlug: "domain",
  slug: "claude-code-session-store-path",
  definition: "where inside the store a session's file is kept",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder is named for a working directory resolved through its symlinks.",
    },
    {
      invariantKind: "departure",
      statement: "Each `/` in that name is written as `-`.",
    },
    {
      invariantKind: "departure",
      statement: "A folder's name records where a session began.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing reads that name back.",
    },
    {
      invariantKind: "departure",
      statement: "A session file opens from wherever the file is put.",
    },
    {
      invariantKind: "departure",
      statement: "A folder outlives the directory the folder is named for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing takes an old folder away.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here works out where a session's file is from a working directory.",
    },
  ],
} as const satisfies Domain
