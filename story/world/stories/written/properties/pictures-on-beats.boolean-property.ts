import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const picturesOnBeats = {
  id: "01a10636-4ec0-7529-a7b2-9f7aef080cee",
  type: "page-type/boolean-property",
  slug: "pictures-on-beats",
  propertySlug: "pictures-on-beats",
  definition: "whether a written story pictures every beat of its chapters",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story stating nothing here pictures what each chapter shows for the first time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story stating this has its picture recorder make one picture for each beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beat's picture edits its place's cover with the covers of up to two characters there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scene panel of such a story shows the picture of the beat being read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This is turned on for one story at a time, as Alan sees each one.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
