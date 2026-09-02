import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type CargoManifest = "toml"

export const cargoManifest = {
  id: "01a0602d-6ad0-7846-b378-6863309ce57c",
  pageTypeSlug: "named-file-property",
  slug: "cargo-manifest",
  propertySlug: "cargo-manifest",
  definition: "what a crate states about itself",
  fileName: "Cargo.toml",
} as const satisfies NamedFileProperty
