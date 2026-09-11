import type { BytecodeDirectory } from "akasha/code-system/python-modules/properties/bytecode-directory.build-folder-property.types.ts"
import type { Python } from "akasha/code-system/python-modules/properties/python.code-file-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type PythonModule = Domain & {
  python: Python
  bytecodeDirectory?: BytecodeDirectory
}
