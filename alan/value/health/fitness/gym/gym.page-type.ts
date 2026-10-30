import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gym = {
  id: "01a11b34-da15-7011-8949-3ef4c4d1539c",
  type: "page-type/page-type",
  slug: "gym",
  definition: "a place where Alan trains",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "gym" },
    { partOfSpeech: "part-of-speech/noun", spelling: "gyms" },
  ],
  extends: ["page-type/page"],
  parts: ["boolean-property/gym-every-implement", "multi-relation-property/gym-holds"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "boolean-property/gym-every-implement", required: true, many: false },
    {
      pageProperty: "multi-relation-property/gym-holds",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A place Alan trains is a gym, and his home is one of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gym names the pieces of kit it holds, or holds every implement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan trains at home where nothing says otherwise.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-08T11:10:10.965Z",
  updatedAt: "2026-10-30T16:52:01.315Z",
} as const satisfies PageType
