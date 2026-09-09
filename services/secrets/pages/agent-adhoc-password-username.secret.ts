import type { Secret } from "../secret.page-type.ts"

export const agentAdhocPasswordUsername = {
  id: "01a0769b-04cc-7e66-80ae-9a01f1ecb672",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "agent-adhoc-password-username",
  placements: [{ resourceName: "agent-adhoc-password", resourceKey: "username" }],
} as const satisfies Secret
