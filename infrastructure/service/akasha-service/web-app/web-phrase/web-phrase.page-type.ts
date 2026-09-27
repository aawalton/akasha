import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const webPhrase = {
  id: "01a0e2cf-ad28-78e4-9bdf-143ec9e12032",
  type: "page-type/page-type",
  slug: "web-phrase",
  definition: "a piece of wording a web app's screen shows around the things it names",
  extends: ["page-type/page"],
  parts: ["module/web-phrase-reading"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is the phrase a reader is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A phrase longer than a title holds goes whole into the description.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name in braces in a phrase is filled by the screen that shows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A screen asks for a phrase by the slug of the page it imports.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
