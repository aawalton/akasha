import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const supervisorTooling = {
  id: "01a09c6d-1a8a-71ca-a5ab-1b64efadb14f",
  type: "domain",
  slug: "supervisor-tooling",
  definition: "the tool servers an agent in a seat is launched with",
  parts: [
    "module/browser-reaping",
    "module/mcp-disable-reconcile",
    "module/mcp-registry",
    "module/supervisor-mcp",
  ],
} as const satisfies Domain
