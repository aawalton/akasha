import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { CargoBuildScript } from "./properties/cargo-build-script.code-file-property.ts"
import type { CargoManifest } from "./properties/cargo-manifest.file-property.ts"
import type { CrateIcon } from "./properties/crate-icon.file-property.ts"
import type { RustModules } from "./properties/rust-modules.relation-property.ts"

export type RustCrate = Domain & {
  cargoManifest: CargoManifest
  modules?: RustModules
  cargoBuildScript?: CargoBuildScript
  icon?: CrateIcon
}
