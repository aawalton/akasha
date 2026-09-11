import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const ambientTypes = {
  id: "01a0605a-98f3-7ddc-b839-afde87fe7bbf",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "ambient-types",
  propertySlug: "d",
  definition: "the types a page declares for a compiler to read",
  extensions: ["ts"],
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The section is `d`.",
    },
    {
      invariantKind: "departure",
      statement: "TypeScript reads a name ending `.d.ts` as a declaration.",
    },
    {
      invariantKind: "departure",
      statement: "A compiler emits nothing from the types this file has.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
