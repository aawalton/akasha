import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const list = {
  id: "01a06838-7a9d-7597-b7a6-0f752f753e26",
  type: "page-type/page-type",
  slug: "list",
  definition: "a domain whose subject is a set, its members named and glossed",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "list" },
    { partOfSpeech: "part-of-speech/noun", spelling: "lists" },
  ],
  extends: ["page-type/domain"],
  parts: ["record-property/list-members", "text-property/member-name"],
  properties: [
    {
      pageProperty: "record-property/list-members",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A list's members are a property rather than the shape of a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A member is a name and a gloss.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A member has nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A member the list orders by is ordered where the members are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A member wanting a paragraph is a page of its own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
