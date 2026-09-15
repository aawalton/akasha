import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const pageAddressKind = {
  id: "01a0731d-07e7-77ea-85a1-aac50ce5d3b2",
  type: "page-type/page-type",
  slug: "page-address-kind",
  definition: "a form an address takes when it names a page",
  parts: [
    "page-address-kind/in-page",
    "page-address-kind/in-page-property",
    "page-address-kind/in-page-type",
  ],
  extends: ["page-type/module"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address by itself finds one page in the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each kind answers one unique kind the identity index files under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind has the code finding the page an address of that kind names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address is a structured value rather than a string that is parsed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address has every part of the identity path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Finding a page reads one file.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
