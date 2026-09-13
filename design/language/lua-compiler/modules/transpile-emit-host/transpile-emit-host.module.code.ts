import type * as ts from "typescript"

export interface EmitHost {
  directoryExists: (path: string) => boolean
  fileExists: (path: string) => boolean
  getCurrentDirectory: () => string
  readFile: (path: string) => string | undefined
  writeFile: ts.WriteFileCallback
}
