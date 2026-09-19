import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3MusicBoxDancerMusicBoxDancer = {
  id: "01a0afa1-f5f6-7355-897d-ede3ae7a8479",
  type: "page-type/track",
  slug: "the-piano-guys-3-music-box-dancer-music-box-dancer",
  ownLength: 2.716266666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-music-box-dancer"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3KGNYSKdi3BWkevlAwN2nw",
      externalLink: "https://open.spotify.com/track/3KGNYSKdi3BWkevlAwN2nw",
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
