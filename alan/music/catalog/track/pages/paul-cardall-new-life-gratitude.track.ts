import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeGratitude = {
  id: "01a0b4c8-4062-72bc-bba1-354b4c1b51a7",
  type: "page-type/track",
  slug: "paul-cardall-new-life-gratitude",
  ownLength: 2.4268833333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-new-life"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WIh9oduvrvkxRYVBxYJAn",
      externalLink: "https://open.spotify.com/track/6WIh9oduvrvkxRYVBxYJAn",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Gratitude",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "gratitude|7FQRbf8gbKw8KZQZAJWxH2|145613",
  song: "song/paul-cardall-gratitude",
} as const satisfies Track
