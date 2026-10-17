import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const personaDisplayName = {
  id: "01a14b18-8e80-7cf2-8e57-823dfce1c397",
  type: "page-type/module",
  slug: "persona-display-name",
  definition: "the name a persona is shown under",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A display name is the slug with its first letter upper case.",
    },
  ],
  createdAt: "2026-10-17T18:21:02.975Z",
  updatedAt: "2026-10-17T18:21:02.975Z",
} as const satisfies Module
