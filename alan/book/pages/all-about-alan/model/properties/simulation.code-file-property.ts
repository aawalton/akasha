import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const simulation = {
  id: "01a0657f-a729-7667-bb50-f50d5da51399",
  type: "page-type/code-file-property",
  slug: "simulation",
  propertySlug: "simulation",
  definition: "the code of a program that shows how a part of Alan works",
  extensions: ["py"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A simulation prints its numbers rather than writing the numbers anywhere.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:20:59.817Z",
  updatedAt: "2026-10-30T14:58:03.586Z",
} as const satisfies CodeFileProperty
