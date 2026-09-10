import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const rustModule = {
  id: "01a0602d-6acf-7594-86e8-07b54a35a700",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "rust-module",
  definition: "code a Rust crate is built from",
  pluralSlug: "rust-modules",
  parts: ["code-file-property/rust", "text-property/rust-module-name"],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "code-file-property/rust", required: true, many: false },
    { pageProperty: "text-property/rust-module-name", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A Rust module's code is in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here is imported.",
    },
    {
      invariantKind: "departure",
      statement: "A module reaches its siblings by `mod` rather than by a path.",
    },
    {
      invariantKind: "departure",
      statement: "Cargo compiles the Rust.",
    },
    {
      invariantKind: "departure",
      statement: "A page's slug is too widely unique to be the name Cargo reads.",
    },
    {
      invariantKind: "gap",
      statement: "Every Rust module states the name Cargo reads.",
    },
  ],
  types: "ts",
} as const satisfies PageType
