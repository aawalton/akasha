import type { CargoBuildScript } from "akasha/code-system/rust-crates/properties/cargo-build-script.code-file-property.types.ts"
import type { CargoManifest } from "akasha/code-system/rust-crates/properties/cargo-manifest.file-property.types.ts"
import type { CrateIcon } from "akasha/code-system/rust-crates/properties/crate-icon.file-property.types.ts"
import type { RustModules } from "akasha/code-system/rust-crates/properties/rust-modules.relation-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type RustCrate = Domain & {
  cargoManifest: CargoManifest
  modules?: RustModules
  cargoBuildScript?: CargoBuildScript
  icon?: CrateIcon
}
