import type { Rust } from "akasha/code/rust-modules/properties/rust.code-file-property.types.ts"
import type { RustModuleName } from "akasha/code/rust-modules/properties/rust-module-name.text-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type RustModule = Domain & {
  rust: Rust
  moduleName?: RustModuleName
}
