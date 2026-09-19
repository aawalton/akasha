import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WeddingSeasonMusicBoxDancer = {
  id: "01a0afa1-d6e8-7820-b098-c3800ed8e2b9",
  type: "page-type/track",
  slug: "the-piano-guys-3-wedding-season-music-box-dancer",
  ownLength: 2.716266666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wedding-season"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4SY0d35f02KvJFsgErPS6h",
      externalLink: "https://open.spotify.com/track/4SY0d35f02KvJFsgErPS6h",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Music Box Dancer",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "musicboxdancer|0jW6R8CVyVohuUJVcuweDI|162976",
  song: "song/the-piano-guys-music-box-dancer",
} as const satisfies Track
