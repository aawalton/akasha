import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SweetChildOMineSweetChildOMine = {
  id: "01a0afa2-0516-75a5-a5fe-47aed302dc89",
  type: "page-type/track",
  slug: "the-piano-guys-3-sweet-child-o-mine-sweet-child-o-mine",
  ownLength: 4.329166666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-sweet-child-o-mine"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3flxSlglVHYQavVlqqL6JO",
      externalLink: "https://open.spotify.com/track/3flxSlglVHYQavVlqqL6JO",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Sweet Child o' Mine",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "sweetchildomine|0jW6R8CVyVohuUJVcuweDI|259750",
  song: "song/the-piano-guys-sweet-child-o-mine",
} as const satisfies Track
