import type { Command } from "akasha/command/command.page-type.types.ts"

export const pagePicture = {
  id: "01a0d89a-adf9-7040-a60c-3c683f529f32",
  type: "page-type/command",
  slug: "page-picture",
  definition: "the command landing a picture on this machine as an image page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The picture is landed the way every writer of a picture lands one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture already landed gets its bytes placed and no second page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title said is the title the image page is landed with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names the image page's slug and id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path that will not read is refused by the argument naming it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a picture from anywhere but this machine.",
    },
  ],
  name: "picture",
  arguments: [
    { argument: "argument/image", required: true, saidAs: "flag-or-word" },
    { argument: "argument/title" },
  ],
} as const satisfies Command
