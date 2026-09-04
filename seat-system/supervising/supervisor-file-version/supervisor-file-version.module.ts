import type { Module } from "@akasha/code-system/module"

export const supervisorFileVersion = {
  id: "01a0683e-3dbe-7021-a398-c5d697666940",
  pageTypeSlug: "module",
  slug: "supervisor-file-version",
  definition: "the hash of every file a running supervisor was built from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The file set is walked from the entry's relative imports rather than declared.",
    },
    {
      invariantKind: "departure",
      statement: "A file that cannot be read is hashed as unreadable rather than skipped.",
    },
    {
      invariantKind: "departure",
      statement: "A version is delivered once it has held still, or once it is overdue.",
    },
    {
      invariantKind: "departure",
      statement: "The agent settings the supervisor reads are part of the version it reports.",
    },
  ],
} as const satisfies Module
