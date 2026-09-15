import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supervisorRebinding = {
  id: "01a09c7a-8b7b-7efc-8025-0f974ec4136c",
  type: "domain",
  slug: "supervisor-rebinding",
  definition: "what a seat hands the agent opened in its place",
  parts: ["module/supervisor-rebind-carry", "module/supervisor-rebind-deps"],
} as const satisfies Domain
