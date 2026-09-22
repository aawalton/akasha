import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const repo = {
  id: "01a06835-e289-7ce5-b198-71205e81f789",
  type: "page-type/page-type",
  slug: "repo",
  definition: "a domain whose subject is one repository",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "repo" },
    { partOfSpeech: "part-of-speech/noun", spelling: "repos" },
  ],
  extends: ["page-type/domain"],
  parts: ["repo/akasha-repo", "repo/code-editor-repo"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The repository a change lands in settles how that change lands.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
