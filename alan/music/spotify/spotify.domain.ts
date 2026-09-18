import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const spotify = {
  id: "01a06261-dc1d-7000-8f39-acf6360f39b5",
  type: "page-type/domain",
  slug: "spotify",
  definition: "Alan's Spotify account reached over the Web API",
  parts: [
    "module/spotify-auth",
    "module/spotify-auth-cli",
    "module/spotify-cache-file",
    "module/spotify-client",
    "module/spotify-credentials",
    "module/spotify-fetching",
    "module/spotify-personalization",
    "module/spotify-pkce-store",
    "module/spotify-player",
    "module/spotify-releases",
    "module/spotify-scopes",
    "module/spotify-search",
    "module/spotify-token-store",
    "module/spotify-tracks",
    "page-type/spotify-account",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An unpaced sweep of the Web API bans the account for about a day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every call to the Web API goes through one paced queue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The token and the consent handoff are kept outside the repository.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Consent is given once at a terminal rather than by a running callback server.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides the use made of the Web API's answers.",
    },
    { decisionKind: "decision-kind/departure", statement: "Every module here has a test." },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
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
} as const satisfies Domain
