import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serveStatic = {
  id: "01a05c48-deeb-7006-8e9c-b8c5539dd296",
  type: "page-type/module",
  slug: "serve-static",
  definition: "which request path is answered from the client build, and under which cache-control",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path under the assets folder is answered or refused here rather than passed on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The root path is never answered from disk.",
    },
  ],
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Module
