import type { GitIgnore } from "akasha/code/properties/git-ignore.file-property.types.ts"
import type { CargoBuildScript } from "akasha/code/rust-crate/properties/cargo-build-script.code-file-property.types.ts"
import type { CargoManifest } from "akasha/code/rust-crate/properties/cargo-manifest.file-property.types.ts"
import type { CrateIcon } from "akasha/code/rust-crate/properties/crate-icon.file-property.types.ts"
import type { RustModules } from "akasha/code/rust-crate/properties/rust-modules.multi-relation-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type RustCrate = Domain & {
  cargoManifest: CargoManifest
  modules?: RustModules
  cargoBuildScript?: CargoBuildScript
  icon?: CrateIcon
  gitIgnore?: GitIgnore
}
