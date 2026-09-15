import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const webSecurityHeader = {
  id: "01a05c48-deeb-7007-9fa8-e8205045f0c1",
  type: "domain",
  slug: "web-security-header",
  definition: "the response headers every page of a site is served under",
  parts: ["module/security-headers"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every site is served the same headers but for the headers its own policy widens.",
    },
  ],
} as const satisfies Domain
