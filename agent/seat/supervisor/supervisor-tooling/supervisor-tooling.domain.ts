import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supervisorTooling = {
  id: "01a09c6d-1a8a-71ca-a5ab-1b64efadb14f",
  type: "page-type/domain",
  slug: "supervisor-tooling",
  definition: "a seated agent's tool servers",
  parts: [
    "module/browser-reaping",
    "module/mcp-disable-reconcile",
    "module/mcp-registry",
    "module/supervisor-mcp",
  ],
} as const satisfies Domain
