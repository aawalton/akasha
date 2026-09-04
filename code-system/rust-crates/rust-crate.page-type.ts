import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { CargoBuildScript } from "./properties/cargo-build-script.named-file-property.ts"
import type { CargoManifest } from "./properties/cargo-manifest.named-file-property.ts"
import type { CrateIcon } from "./properties/crate-icon.file-property.ts"
import type { RustModuleSlugs } from "./properties/rust-module-slugs.relation-property.ts"

export type RustCrate = Domain & {
  cargoManifest: CargoManifest
  moduleSlugs?: RustModuleSlugs
  cargoBuildScript?: CargoBuildScript
  icon?: CrateIcon
}

export const rustCrate = {
  id: "01a0602d-6ad2-7a2e-8686-1b1cf565107a",
  pageTypeSlug: "page-type",
  slug: "rust-crate",
  definition: "one thing Cargo builds",
  pluralSlug: "rust-crates",
  partSlugs: [
    "file-property/crate-icon",
    "named-file-property/cargo-build-script",
    "named-file-property/cargo-manifest",
    "relation-property/rust-module-slugs",
  ],
  extendsSlug: "page-type/domain",
  properties: [
    { pagePropertySlug: "cargo-manifest", required: true, many: false },
    { pagePropertySlug: "rust-module-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "cargo-build-script", required: false, many: false },
    { pagePropertySlug: "crate-icon", required: false, many: false },
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
      statement: "A module named by more than one crate is a shared one.",
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
} as const satisfies PageType
