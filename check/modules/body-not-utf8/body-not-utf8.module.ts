import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bodyNotUtf8 = {
  id: "01a06982-39cd-7000-aaed-afa3d4b4e20b",
  type: "page-type/module",
  slug: "body-not-utf8",
  definition: "the words refusing a body whose bytes are not utf8, with what was read of them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The refusal names the source the command read and how many bytes were there and the leading bytes.",
    },
  ],
  createdAt: "2026-09-03T23:02:17.293Z",
  updatedAt: "2026-09-15T18:21:01.000Z",
} as const satisfies Module
