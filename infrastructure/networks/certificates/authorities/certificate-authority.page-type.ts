import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const certificateAuthority = {
  id: "01a0685d-ab5d-7bd4-946d-fa56b367a1a2",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "certificate-authority",
  definition: "who signs the certificates a set of names is trusted on",
  pluralSlug: "certificate-authorities",
  parts: ["file-property/authority-certificate"],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "file-property/authority-certificate", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An authority's certificate is in a file beside the page.",
    },
    {
      invariantKind: "constraint",
      statement: "An authority's signing key is never beside its certificate.",
    },
    {
      invariantKind: "departure",
      statement:
        "An authority whose key is gone is a new authority rather than the same authority.",
    },
  ],
  types: "ts",
} as const satisfies PageType
