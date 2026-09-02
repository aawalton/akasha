import type { Module } from "../../code-system/modules/module.page-type.ts"

export const serveStatic = {
  id: "01a05c48-deeb-7006-8e9c-b8c5539dd296",
  pageTypeSlug: "module",
  slug: "serve-static",
  definition: "which request path is answered from the client build, and under which cache-control",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A path under the assets folder is answered or refused here rather than passed on.",
    },
    {
      invariantKind: "departure",
      statement: "The root path is never answered from disk.",
    },
  ],
} as const satisfies Module
