import type { Domain } from "../../domains/domain.page-type.types.ts"

export const googleOauth = {
  id: "01a05bdc-e25b-7907-a606-3d78ab77a2f7",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "google-oauth",
  definition: "the one Google desktop app Alan's calendar, mail and drive all consent through",
  parts: [
    "module/oauth-callback",
    "module/oauth-app-credentials",
    "module/oauth-client",
    "module/oauth-consent",
    "module/oauth-refresh-token",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No credential is held here.",
    },
    {
      invariantKind: "departure",
      statement: "One consent covers calendar, drive and mail, and one token comes of it.",
    },
  ],
} as const satisfies Domain
