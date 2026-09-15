import type { Rust } from "akasha/code/rust-module/properties/rust.code-file-property.types.ts"
import type { RustModuleName } from "akasha/code/rust-module/properties/rust-module-name.text-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type RustModule = Domain & {
  rust: Rust
  moduleName?: RustModuleName
}
