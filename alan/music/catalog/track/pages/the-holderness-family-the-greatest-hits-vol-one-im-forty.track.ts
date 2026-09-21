import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyTheGreatestHitsVolOneImForty = {
  id: "01a0b4c6-d23a-7145-bb0d-596cc32a077a",
  type: "page-type/track",
  slug: "the-holderness-family-the-greatest-hits-vol-one-im-forty",
  ownLength: 2.40065,
  ownProgress: 2.40065,
  partOfCollections: ["release/the-holderness-family-the-greatest-hits-vol-one"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5aNBSUyCapA5cEJ5BS8yxh",
      externalLink: "https://open.spotify.com/track/5aNBSUyCapA5cEJ5BS8yxh",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "I'm Forty",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "imforty|6tITG4T8LpC0msapZ4wXGA|144039",
  song: "song/the-holderness-family-im-forty",
  carriedBy: [
    {
      release: "release/the-holderness-family-the-greatest-hits-vol-one",
      discNumber: 1,
      position: 4,
      externalId: "5aNBSUyCapA5cEJ5BS8yxh",
      externalLink: "https://open.spotify.com/track/5aNBSUyCapA5cEJ5BS8yxh",
    },
  ],
} as const satisfies Track
