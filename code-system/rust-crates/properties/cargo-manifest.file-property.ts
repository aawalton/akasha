import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type CargoManifest = "toml"

export const cargoManifest = {
  id: "01a0602d-6ad0-7846-b378-6863309ce57c",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "cargo-manifest",
  propertySlug: "cargo-manifest",
  definition: "what a crate states about itself",
  fileName: "Cargo.toml",
} as const satisfies FileProperty
