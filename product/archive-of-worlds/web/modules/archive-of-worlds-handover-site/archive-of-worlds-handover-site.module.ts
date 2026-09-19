import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const archiveOfWorldsHandoverSite = {
  id: "01a0bb92-4d60-7a2d-a44a-b6ab161a858c",
  type: "page-type/module",
  slug: "archive-of-worlds-handover-site",
  definition:
    "what the archive is called in a handover, where it answers, and the key it signs with",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The archive is named `archive-of-worlds` in a handover, and alanwalton.com knows that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The archive signs its own cookie with `ARCHIVE_OF_WORLDS_SESSION_KEY`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A signed-in reader lands on `/`.",
    },
  ],
} as const satisfies Module
