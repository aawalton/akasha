import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const googleOauth = {
  id: "01a05bdc-e25b-7907-a606-3d78ab77a2f7",
  pageTypeSlug: "workspace-package",
  slug: "google-oauth",
  definition: "the one Google desktop app Alan's calendar, mail and drive all consent through",
  manifest: "json",
  partSlugs: ["module/oauth-callback", "module/oauth-app-credentials", "module/oauth-consent"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No credential is held here.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh token belongs to the product that minted the refresh token.",
    },
  ],
} as const satisfies WorkspacePackage
