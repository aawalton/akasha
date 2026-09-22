import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const certificateAuthority = {
  id: "01a0685d-ab5d-7bd4-946d-fa56b367a1a2",
  type: "page-type/page-type",
  slug: "certificate-authority",
  definition: "who signs the certificates making a set of names trusted",
  parts: ["file-property/authority-certificate"],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "file-property/authority-certificate", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An authority's certificate is in a file beside the page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An authority's signing key is never beside its certificate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An authority whose key is gone is a new authority rather than the same authority.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
