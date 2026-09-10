import type { Domain } from "../../domains/domain.page-type.ts"
import type { BytecodeDirectory } from "./properties/bytecode-directory.build-folder-property.ts"
import type { Python } from "./properties/python.code-file-property.ts"

export type PythonModule = Domain & {
  python: Python
  bytecodeDirectory?: BytecodeDirectory
}
