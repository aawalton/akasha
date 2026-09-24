import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const relationProperty = {
  id: "01a04dff-9d7d-7809-9a88-4fd343f11772",
  type: "page-type/page-type",
  slug: "relation-property",
  definition: "a page property naming another page",
  icon: "arrow-up-right",
  parts: ["relation-property/target-page-type"],
  extends: ["page-type/page-property"],
  properties: [{ pageProperty: "relation-property/target-page-type", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation is the edge rather than the page the edge reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Two edges meaning different things are two relations though each edge reaches one type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation's type is a slug rather than a union of the pages its target holds.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No relation property's name ends in `slug`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No relation value lands that akasha cannot key to one page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page a relation names is drawn as a chip by the page type that relation reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation value is a page's address or a page's id, and a chip reads either.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chip reads its name off the page the relation reaches rather than the value.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
