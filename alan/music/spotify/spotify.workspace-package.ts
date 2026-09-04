import type { WorkspacePackage } from "../../../code-system/workspace-packages/workspace-package.page-type.ts"

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
  directives: [
    {
      directiveKind: "rule",
      name: "Paced Live Sweep",
      act: "Pace and scope every live Spotify exercise run: set `SPOTIFY_RATE_LIMIT_MS=1000` and pass `--only`.",
      warrant:
        "An unpaced run looks fine right up until Spotify bans the whole account for about a day.",
      aids: [
        "Write the value as digits, not `1s` or `1000ms`.",
        "Never start a sweep while another runs anywhere.",
      ],
    },
  ],
} as const satisfies WorkspacePackage
