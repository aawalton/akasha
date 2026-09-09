import type { Secret } from "../secret.page-type.ts"

export const agentAdhocPasswordPassword = {
  id: "01a0769a-e488-7179-af30-f7d7a1a749d3",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "agent-adhoc-password-password",
  placements: [{ resourceName: "agent-adhoc-password", resourceKey: "password" }],
} as const satisfies Secret
