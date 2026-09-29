import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnUndoing = {
  id: "01a0eb43-9f26-7bfc-ac55-cea726e9c622",
  type: "page-type/module",
  slug: "turn-undoing",
  definition: "the files a played turn's making changed, and the bodies they had before it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn's making runs from the commit making it to its latest commit moving it to player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The making of a turn not yet at player runs to the latest commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file of a turn's making is one a commit of its making changed in the story's folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file a commit of its making changed in the story's world, outside every story, is one too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file beside the turn's page is one too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the landing keeps from the pages is no file of the turn's making.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file of the turn's making goes back to its body before the turn was made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that had no body before the turn was made is taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file of the turn's making changed since its making ended is refused and named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A world file is refused and named where another story of the world changed during the making.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number the turn's outcomes added to a page that goes back to its body is taken back by that body.",
    },
  ],
} as const satisfies Module
