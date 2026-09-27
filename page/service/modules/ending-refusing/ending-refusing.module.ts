import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const endingRefusing = {
  id: "01a0e07e-0008-7825-a71a-0dcf3211e048",
  type: "page-type/module",
  slug: "ending-refusing",
  definition: "a value handed to a property held in a file, judged as the ending of that file",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value under a property held in a file beside the page names that file's ending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is no string, or makes no file name, is refused as an ending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal says to write the file at a path of its own.",
    },
  ],
} as const satisfies Module
