import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const appCapacitorParity = {
  id: "01a06810-92fd-77da-85d0-15adaef5efc2",
  pageTypeSlug: "cluster-check",
  slug: "app-capacitor-parity",
  definition:
    "the check refusing a web component or route the Capacitor shell neither carries nor declares",
  code: "ts",
  dispatchNodeTypes: [
    { nodeKind: "ts-file", under: "alanwalton/web" },
    { nodeKind: "tsx-file", under: "alanwalton/web" },
  ],
} as const satisfies ClusterCheck
