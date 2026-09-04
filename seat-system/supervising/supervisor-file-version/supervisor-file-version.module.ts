import type { Module } from "@akasha/code-system/module"

export const supervisorFileVersion = {
  id: "01a0683e-3dbe-7021-a398-c5d697666940",
  pageTypeSlug: "module",
  slug: "supervisor-file-version",
  definition: "the hash of every file a running supervisor was built from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The file set is walked from the entry's imports rather than declared.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier naming a package is walked to the file the package's manifest exports.",
    },
    {
      invariantKind: "departure",
      statement:
        "The repository a package is looked for in is the nearest folder above the entry whose manifest names workspaces.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier landing on no file is passed over rather than thrown on.",
    },
    {
      invariantKind: "departure",
      statement: "A file that cannot be read is hashed as unreadable rather than skipped.",
    },
    {
      invariantKind: "departure",
      statement: "A version is delivered once the version has held still.",
    },
    {
      invariantKind: "departure",
      statement: "A version that keeps changing is delivered once the change is overdue.",
    },
    {
      invariantKind: "departure",
      statement:
        "The agent settings the supervisor reads are part of the version the supervisor reports.",
    },
  ],
} as const satisfies Module
