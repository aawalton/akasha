import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberSober = {
  id: "01a0a5ae-c9bd-7ab9-8574-a6382ddf2dfb",
  type: "track",
  slug: "kelly-clarkson-my-december-sober",
  ownLength: 4.844,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5V3CinWTBUD3goeV816B3g",
      externalLink: "https://open.spotify.com/track/5V3CinWTBUD3goeV816B3g",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Sober",
} as const satisfies Track
