import type { Module } from "@akasha/code-system/module"

export const turnRecords = {
  id: "01a0687b-3c73-7000-b71b-44f25679016c",
  pageTypeSlug: "module",
  slug: "turn-records",
  definition:
    "the turn end reading, the turn state stamp and the turn start source a seat would keep",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A record akasha declares no property for is read as absent rather than thrown on.",
    },
    {
      invariantKind: "departure",
      statement: "A write of a record akasha declares no property for costs nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A record that is absent is said in words rather than left blank.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a seat's page.",
    },
  ],
} as const satisfies Module
