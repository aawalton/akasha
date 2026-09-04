import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const rrServerModuleInClient = {
  id: "01a06810-92ff-737e-8f5a-7798807114bb",
  pageTypeSlug: "cluster-check",
  slug: "rr-server-module-in-client",
  definition:
    "the check refusing a client-bundled React Router module that value-imports a server module",
  code: "ts",
} as const satisfies ClusterCheck
