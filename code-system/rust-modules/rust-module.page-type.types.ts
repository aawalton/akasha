import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { Rust } from "./properties/rust.code-file-property.ts"
import type { RustModuleName } from "./properties/rust-module-name.text-property.ts"

export type RustModule = Domain & {
  rust: Rust
  moduleName?: RustModuleName
}
