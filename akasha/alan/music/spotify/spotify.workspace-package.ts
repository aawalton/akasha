import type { WorkspacePackage } from "../../../code-system/workspace-package/workspace-package.page-type.ts"

export const spotify = {
  id: "01a06261-dc1d-7000-8f39-acf6360f39b5",
  pageTypeSlug: "workspace-package",
  slug: "spotify",
  definition: "Alan's Spotify account reached over the Web API",
  manifest: "json",
  partSlugs: [
    "module/spotify-credentials",
    "module/spotify-fetching",
    "module/spotify-cache-file",
    "module/spotify-token-store",
    "module/spotify-pkce-store",
    "module/spotify-scopes",
    "module/spotify-auth",
    "module/spotify-auth-cli",
    "module/spotify-client",
    "module/spotify-player",
    "module/spotify-search",
    "module/spotify-tracks",
    "module/spotify-personalization",
  ],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "An unpaced sweep of the Web API bans the account for about a day.",
    },
    {
      invariantKind: "departure",
      statement: "Every call to the Web API goes through one paced queue.",
    },
    {
      invariantKind: "departure",
      statement: "The token and the consent handoff are kept outside the repository.",
    },
    {
      invariantKind: "departure",
      statement: "Consent is given once at a terminal rather than by a running callback server.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what is done with what the Web API answers.",
    },
  ],
} as const satisfies WorkspacePackage
