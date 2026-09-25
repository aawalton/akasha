import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const pythonModule = {
  id: "01a06815-9efd-7001-8696-539b1123a2c0",
  type: "page-type/page-type",
  slug: "python-module",
  definition: "code in the Python language",
  parts: ["build-folder-property/bytecode-directory", "code-file-property/python"],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "code-file-property/python", required: true, many: false },
    { pageProperty: "build-folder-property/bytecode-directory", required: false, many: false },
    { pageProperty: "text-property/install-path", required: false, many: false },
    { pageProperty: "select-property/only-on", required: false, many: false },
    { pageProperty: "select-property/placed-by", required: true, many: false, fixed: "link" },
  ],
  bodyPropertyId: "python",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Python module's code is in a file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Python runs where a Python runtime sits rather than where TypeScript runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Python module reaches its siblings by the name a sibling has where that module runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A carry taking a Python module to where that module runs states the name that module lands under.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing in akasha imports a Python module.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
