import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const rulings = {
  id: "01a10450-ad04-7d07-ab7f-df5a4bfd486e",
  type: "page-type/file-property",
  slug: "rulings",
  propertySlug: "rulings",
  definition:
    "the issues the game master ruled out of a turn or written chapter, each with its reason",
  extensions: ["jsonl"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        'One line is one ruling: `{"issue":"…","reason":"…"}`, the issue line word for word.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reason is at most 100 characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the game master rules, handing its rulings in with its beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ruling names an issue line the page holds, or its advance is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master has the final say: a ruled-out issue is ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ruled-out line leaves the issue file it was in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer left with no live issue stays reviewed, so it reviews no more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mechanics left with no live issue sends nothing back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat raising a ruled-out issue again word for word has that line dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each advance's rulings join the ones the page holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file goes as the turn reaches player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rulings sit beside the page, as the issue files do, so later seats see them.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
