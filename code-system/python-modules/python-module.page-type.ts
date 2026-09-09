import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { BytecodeDirectory } from "./properties/bytecode-directory.build-folder-property.ts"
import type { Python } from "./properties/python.code-file-property.ts"

export type PythonModule = Domain & {
  python: Python
  bytecodeDirectory?: BytecodeDirectory
}

export const pythonModule = {
  id: "01a06815-9efd-7001-8696-539b1123a2c0",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "python-module",
  definition: "code in the Python language",
  pluralSlug: "python-modules",
  parts: ["code-file-property/python", "build-folder-property/bytecode-directory"],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "code-file-property/python", required: true, many: false },
    { pageProperty: "build-folder-property/bytecode-directory", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A Python module's code is in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Python runs where a Python runtime sits rather than where TypeScript runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "A Python module reaches its siblings by the name a sibling has where that module runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "A carry taking a Python module to where that module runs states the name that module lands under.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing in akasha imports a Python module.",
    },
  ],
} as const satisfies PageType
