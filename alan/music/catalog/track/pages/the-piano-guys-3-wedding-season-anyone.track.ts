import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WeddingSeasonAnyone = {
  id: "01a0afa1-d7b3-76dd-8420-59903d4f62a1",
  type: "page-type/track",
  slug: "the-piano-guys-3-wedding-season-anyone",
  ownLength: 3.6998,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wedding-season"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5LBWVpIqKo9m3pfADLIfQ6",
      externalLink: "https://open.spotify.com/track/5LBWVpIqKo9m3pfADLIfQ6",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Anyone",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "anyone|0jW6R8CVyVohuUJVcuweDI|221988",
} as const satisfies Track
