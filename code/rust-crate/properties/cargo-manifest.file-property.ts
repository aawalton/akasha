import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const cargoManifest = {
  id: "01a0602d-6ad0-7846-b378-6863309ce57c",
  type: "page-type/file-property",
  slug: "cargo-manifest",
  propertySlug: "cargo-manifest",
  definition: "what a crate states about itself",
  extensions: ["toml"],
  fileName: "Cargo.toml",
  types: "ts",
  createdAt: "2026-09-02T03:33:04.336Z",
  updatedAt: "2026-09-15T16:56:11.000Z",
} as const satisfies FileProperty
