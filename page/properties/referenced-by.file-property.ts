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
      invariantKind: "invariant-kind/departure",
      statement: "A line says where the reference comes from and what it comes through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reference through a page property comes through that property's slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import comes through the slug `import`, which no page property holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reference to a file beside the page says that file's name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reference to the page itself says no file name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line naming this page through a property carries the naming page's id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The lines are sorted, so one reference that changes moves one line.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A page nothing references has no file.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
