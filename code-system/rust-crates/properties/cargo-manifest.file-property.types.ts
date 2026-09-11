import type { cargoManifest } from "akasha/code-system/rust-crates/properties/cargo-manifest.file-property.ts"

export type CargoManifest = (typeof cargoManifest.extensions)[number]
