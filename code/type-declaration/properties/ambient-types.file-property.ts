import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const ambientTypes = {
  id: "01a0605a-98f3-7ddc-b839-afde87fe7bbf",
  type: "file-property",
  slug: "ambient-types",
  propertySlug: "d",
  definition: "the types a page declares for a compiler to read",
  extensions: ["ts"],
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The section is `d`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "TypeScript reads a name ending `.d.ts` as a declaration.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A compiler emits nothing from the types this file has.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A glob never reaches this file, because the page beside it has the same stem.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Compiler settings meaning to read this file name the file rather than a glob.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
