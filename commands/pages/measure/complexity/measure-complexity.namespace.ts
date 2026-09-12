import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const measureComplexity = {
  id: "01a08cce-0b4d-7802-b83a-87270e77b815",
  type: "namespace",
  slug: "measure-complexity",
  definition: "how complex each function and file of a checkout's TypeScript is",
  parts: [
    "command/measure-complexity-cyclomatic",
    "command/measure-complexity-halstead",
    "command/measure-complexity-maintainability",
    "command/measure-complexity-report",
  ],
  name: "complexity",
} as const satisfies Namespace
