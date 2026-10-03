import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const editorSteps = {
  id: "01a1036a-8aed-77c9-8b8b-dc0b970d7080",
  type: "page-type/boolean-property",
  slug: "editor-steps",
  propertySlug: "editor-steps",
  definition: "whether a written story's chapters take a beat editor and a prose editor",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story stating no editor steps makes its chapters with no editor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story with editor steps has its game master and writer write twice as long.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat editor follows the game master, and a prose editor follows the writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each editor cuts what it is handed to at most half.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
