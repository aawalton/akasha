import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const referencedBy = {
  id: "01a0a2e9-c513-7eed-aa47-3b272814218c",
  type: "file-property",
  slug: "referenced-by",
  propertySlug: "referenced-by",
  definition: "what names this page or imports a file beside it, one line to a reference",
  extensions: ["jsonl"],
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line says where the reference comes from and what it comes through.",
    },
    {
      invariantKind: "departure",
      statement: "A reference through a page property comes through that property's slug.",
    },
    {
      invariantKind: "departure",
      statement: "An import comes through the slug `import`, which no page property holds.",
    },
    {
      invariantKind: "departure",
      statement: "A reference to a file beside the page says that file's name.",
    },
    {
      invariantKind: "departure",
      statement: "A reference to the page itself says no file name.",
    },
    {
      invariantKind: "departure",
      statement: "A line naming this page through a property carries the naming page's id.",
    },
    {
      invariantKind: "departure",
      statement: "The lines are sorted, so one reference that changes moves one line.",
    },
    {
      invariantKind: "absence",
      statement: "A page nothing references has no file.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
