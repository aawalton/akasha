import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const routerContextAdapters = {
  id: "01a08e35-2512-7620-ba36-cc10442965af",
  type: "module",
  slug: "router-context-adapters",
  definition: "the React Router pathname, query and link handed to the framework-free contexts",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The layout context and the pages-ui context are filled from the same host router.",
    },
    {
      invariantKind: "departure",
      statement: "A router app mounts these adapters rather than filling either context itself.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names an app or a route.",
    },
  ],
} as const satisfies Module
