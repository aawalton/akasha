import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const googleOauth = {
  id: "01a05bdc-e25b-7907-a606-3d78ab77a2f7",
  type: "page-type/domain",
  slug: "google-oauth",
  definition: "Alan's consent for akasha to use Google",
  parts: [
    "module/oauth-app-credentials",
    "module/oauth-callback",
    "module/oauth-client",
    "module/oauth-consent",
    "module/oauth-refresh-token",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No credential is held here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One consent covers calendar, drive and mail, and one token comes of it.",
    },
  ],
} as const satisfies Domain
