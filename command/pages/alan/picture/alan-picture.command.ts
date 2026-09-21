import type { Command } from "akasha/command/command.page-type.types.ts"

export const alanPicture = {
  id: "01a09c65-6c45-74f6-9f46-fbb5c1eb8702",
  type: "page-type/command",
  slug: "alan-picture",
  definition: "the command bringing an image page's picture to a file on this machine",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The image page's slug is the first word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bytes are asked of the pages service rather than read off the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file is named for the slug and carries the ending its bytes are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path said here is written instead of the file under the home folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A slug no image page holds is answered as missing data rather than as a wrong call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names the path written, so a reader can open that file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the phone.",
    },
  ],
  name: "picture",
  arguments: [
    { argument: "argument/picture", required: true, saidAs: "flag-or-word" },
    { argument: "argument/output" },
  ],
} as const satisfies Command
