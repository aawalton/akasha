import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const rustCrate = {
  id: "01a0602d-6ad2-7a2e-8686-1b1cf565107a",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "rust-crate",
  definition: "one thing Cargo builds",
  pluralSlug: "rust-crates",
  parts: [
    "file-property/crate-icon",
    "code-file-property/cargo-build-script",
    "file-property/cargo-manifest",
    "relation-property/rust-modules",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "file-property/cargo-manifest", required: true, many: false },
    {
      pageProperty: "relation-property/rust-modules",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "code-file-property/cargo-build-script", required: false, many: false },
    { pageProperty: "file-property/crate-icon", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A crate states what Cargo reads about that crate in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A crate names every module that crate compiles.",
    },
    {
      invariantKind: "departure",
      statement: "A module named by more than one crate is a shared module.",
    },
    {
      invariantKind: "constraint",
      statement: "A module no crate names is compiled into nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A crate Cargo prepares states the script Cargo runs first.",
    },
    {
      invariantKind: "departure",
      statement: "A seam copies a crate's files to the names Cargo reads.",
    },
    {
      invariantKind: "departure",
      statement: "A crate's icon is carried as text and written out by that same seam.",
    },
  ],
  types: "ts",
} as const satisfies PageType
