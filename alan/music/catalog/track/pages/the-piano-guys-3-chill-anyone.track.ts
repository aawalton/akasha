import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillAnyone = {
  id: "01a0afa1-e209-7aab-90b4-1d822d87d553",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-anyone",
  ownLength: 3.6998,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "756F9H7o6Kao9Gfpzw3RDF",
      externalLink: "https://open.spotify.com/track/756F9H7o6Kao9Gfpzw3RDF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Anyone",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "anyone|0jW6R8CVyVohuUJVcuweDI|221988",
} as const satisfies Track
