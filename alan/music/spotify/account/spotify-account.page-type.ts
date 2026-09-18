import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const spotifyAccount = {
  id: "01a0b6dc-93a1-71ed-a64b-4bd0ff99df66",
  type: "page-type/page-type",
  slug: "spotify-account",
  definition: "the account the music commands reach Spotify through",
  extends: ["page-type/page"],
  parts: [
    "instant-property/spotify-account-retry-allowed-at",
    "instant-property/spotify-account-window-started-at",
    "number-property/spotify-account-calls-in-window",
    "text-property/spotify-account-client-id",
    "text-property/spotify-account-client-secret",
    "text-property/spotify-account-redirect-uri",
  ],
  properties: [
    {
      pageProperty: "text-property/spotify-account-client-id",
      required: false,
      many: false,
      secret: true,
    },
    {
      pageProperty: "text-property/spotify-account-client-secret",
      required: false,
      many: false,
      secret: true,
    },
    { pageProperty: "text-property/spotify-account-redirect-uri", required: true, many: false },
    {
      pageProperty: "instant-property/spotify-account-window-started-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "number-property/spotify-account-calls-in-window",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/spotify-account-retry-allowed-at",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The credential is in the sops file beside the page and never in the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call is counted against the account rather than against the process making it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window calls are counted over is thirty seconds long.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Thirty calls is all one window holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call beyond what the window holds waits for that window to close.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ban the upstream states is carried as the instant every process waits for.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
