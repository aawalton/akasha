import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const flag = {
  id: "01a06835-e289-76ca-8e3e-0ef012ffdf1a",
  type: "page-type/page-type",
  slug: "flag",
  definition: "a switch held outside the code that reads it",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "flag" },
    { partOfSpeech: "part-of-speech/noun", spelling: "flags" },
  ],
  extends: ["page-type/domain"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag is read at the moment that flag is needed rather than at start-up.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
