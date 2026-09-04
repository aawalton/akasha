import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Rust } from "./properties/rust.file-property.ts"
import type { RustModuleName } from "./properties/rust-module-name.text-property.ts"

export type RustModule = Domain & {
  rust: Rust
  moduleName?: RustModuleName
}

export const rustModule = {
  id: "01a0602d-6acf-7594-86e8-07b54a35a700",
  pageTypeSlug: "page-type",
  slug: "rust-module",
  definition: "code a Rust crate is built from",
  pluralSlug: "rust-modules",
  partSlugs: ["file-property/rust", "text-property/rust-module-name"],
  extendsSlug: "page-type/domain",
  properties: [
    { pagePropertySlug: "rust", required: true, many: false },
    { pagePropertySlug: "rust-module-name", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A Rust module's code is held in a file beside the page.",
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
} as const satisfies PageType
