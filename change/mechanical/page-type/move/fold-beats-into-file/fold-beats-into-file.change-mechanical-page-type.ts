import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const foldBeatsIntoFile = {
  id: "01a102fb-d05e-78aa-8aa8-07a2a634de46",
  type: "page-type/change-mechanical-page-type",
  slug: "fold-beats-into-file",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "a turn's inline beats, scenes, changes and memory folded into its one beats file",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page folded is answered in this one answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages written are the pages of that page type and of every type beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page holding inline beats, scenes, or a changes or memory file is folded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folded page's beats go into one file beside it, one json record to a beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page then states `beats` as that file, in the place its inline beats held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page's scenes, changes and memory keys go, and their files with them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with no beat of its own gets no file, and only loses those keys.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's pictures go onto beats, each where its quote falls in the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture whose quote the prose lacks goes onto the last beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page holding none of those keys is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with a beats file already and a key left to fold is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A changes or memory file that will not read refuses the change, naming its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in bounds how many pages are folded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type the index does not name is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung beneath is reached.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
