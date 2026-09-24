import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const siteDocument = {
  id: "01a0d5a8-c966-7b3e-afc7-8a6f6ba43874",
  type: "page-type/page-type",
  slug: "site-document",
  definition: "writing a web app shows at one of its paths",
  extends: ["page-type/page"],
  parts: [
    "relation-property/site-document-web-app",
    "text-property/site-document-lead",
    "record-property/site-document-sections",
    "text-property/section-anchor",
    "markdown-property/section-text",
  ],
  properties: [
    { pageProperty: "relation-property/site-document-web-app", required: true, many: false },
    { pageProperty: "text-property/url-path", required: true, many: false },
    { pageProperty: "text-property/site-document-lead", required: false, many: false },
    {
      pageProperty: "record-property/site-document-sections",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One web app has one site document at a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A visitor who is not signed in reads every site document.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
