import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorFileVersion = {
  id: "01a0683e-3dbe-7021-a398-c5d697666940",
  type: "page-type/module",
  slug: "supervisor-file-version",
  definition: "how code finds the version of the files a supervisor runs from",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The file set is walked from the entry's imports rather than declared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The closure over the entry's imports is the graph's to answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The files the closure names are read under the akasha checkout the supervisor runs from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A specifier landing on no file is passed over rather than thrown on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An entry reaching none of the files it imports is said every poll rather than passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No version is hashed while the entry reaches none of the files it imports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that cannot be read is hashed as unreadable rather than skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version is delivered once the version has held still.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version that keeps changing is delivered once the change is overdue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The agent settings the supervisor reads are part of the version the supervisor reports.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T14:43:28.374Z",
} as const satisfies Module
