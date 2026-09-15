import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorFileVersion = {
  id: "01a0683e-3dbe-7021-a398-c5d697666940",
  type: "module",
  slug: "supervisor-file-version",
  definition: "the hash of every file a running supervisor was built from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file set is walked from the entry's imports rather than declared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A specifier naming a package is walked to the file the package's manifest exports.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The repository for a package is the nearest folder above the entry whose manifest names workspaces.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier landing on no file is passed over rather than thrown on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An entry reaching none of the files it imports is said every poll rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No version is hashed while the entry reaches none of the files it imports.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that cannot be read is hashed as unreadable rather than skipped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A version is delivered once the version has held still.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A version that keeps changing is delivered once the change is overdue.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The agent settings the supervisor reads are part of the version the supervisor reports.",
    },
  ],
} as const satisfies Module
