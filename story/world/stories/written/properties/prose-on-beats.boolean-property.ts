import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const proseOnBeats = {
  id: "01a10390-5892-7c23-b806-d489b018b47e",
  type: "page-type/boolean-property",
  slug: "prose-on-beats",
  propertySlug: "prose-on-beats",
  definition: "whether a written story keeps its chapters' prose on the chapters' beats",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story stating nothing here keeps each chapter's prose in the file beside the chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story stating this has its writers and prose editors give each beat its prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter's prose file remains a cache of the beats' prose, so its words are still counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter whose beats carry no prose is read from its prose file, whatever its story states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This is turned on for one story at a time, as that story's chapters are converted.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-03T20:59:13.938Z",
  updatedAt: "2026-10-03T21:07:11.000Z",
} as const satisfies BooleanProperty
