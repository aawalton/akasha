import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const openShells = {
  id: "01a06e54-0ecf-7959-818d-d60026e07e65",
  type: "page-type/text-property",
  slug: "open-shells",
  propertySlug: "open-shells",
  definition: "every background command a seat started that is still live",
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
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
