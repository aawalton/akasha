import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AnyoneAnyone = {
  id: "01a0afa2-067b-7fb1-834e-721889dd9480",
  type: "page-type/track",
  slug: "the-piano-guys-3-anyone-anyone",
  ownLength: 3.6998,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-anyone"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WIRN90YrKdDooT1H7Yo3c",
      externalLink: "https://open.spotify.com/track/6WIRN90YrKdDooT1H7Yo3c",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Anyone",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "anyone|0jW6R8CVyVohuUJVcuweDI|221988",
} as const satisfies Track
