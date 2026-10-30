import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const openShells = {
  id: "01a06e54-0ecf-7959-818d-d60026e07e65",
  type: "page-type/text-property",
  slug: "open-shells",
  propertySlug: "open-shells",
  definition: "every background command of a seat that runs",
  maxLength: 64,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A background command is named by the task the transcript gives that command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command is listed until the notification naming that command is read.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-04T21:29:57.711Z",
  updatedAt: "2026-10-30T15:48:41.402Z",
} as const satisfies TextProperty
