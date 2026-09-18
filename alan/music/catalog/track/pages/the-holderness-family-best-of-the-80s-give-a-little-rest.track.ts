import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe80sGiveALittleRest = {
  id: "01a0b4c6-ceb2-7fe2-9579-a14ee4fc8596",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-80s-give-a-little-rest",
  ownLength: 1.9883333333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-80s"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5j4nM7HZu3RimAkmoJFUCn",
      externalLink: "https://open.spotify.com/track/5j4nM7HZu3RimAkmoJFUCn",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Give a Little Rest",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "givealittlerest|6tITG4T8LpC0msapZ4wXGA|119300",
} as const satisfies Track
