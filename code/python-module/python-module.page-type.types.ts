import type { BytecodeDirectory } from "akasha/code/python-module/properties/bytecode-directory.build-folder-property.types.ts"
import type { Python } from "akasha/code/python-module/properties/python.code-file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { InstallPath } from "akasha/infrastructure/machine/provisioning/provisioned-file/properties/install-path.text-property.types.ts"

export type PythonModule = Domain & {
  python: Python
  bytecodeDirectory?: BytecodeDirectory
  installPath?: InstallPath
}
