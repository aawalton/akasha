import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const gmVoiceLints = {
  id: "01a05b71-e543-74c0-abd2-ac3a061a4181",
  pageTypeSlug: "module",
  slug: "gm-voice-lints",
  definition: "the marks in a turn's prose saying the game master stepped out of its voice",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Prose closing on a short second-person prompt is an intrusion.",
    },
    {
      invariantKind: "departure",
      statement: "A System window written inline in the prose is an intrusion.",
    },
    {
      invariantKind: "departure",
      statement: "A quoted closing line is never counted an intrusion.",
    },
  ],
} as const satisfies Module
