import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveTheMissionHowGreatThouArtLive = {
  id: "01a0afa2-14ef-7a5d-9c37-1cf457fe67b0",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-the-mission-how-great-thou-art-live",
  ownLength: 3.461333333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-live"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4QcRn6ngqbzSyKcovDPy37",
      externalLink: "https://open.spotify.com/track/4QcRn6ngqbzSyKcovDPy37",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Mission / How Great Thou Art (Live)",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "themissionhowgreatthouartlive|0jW6R8CVyVohuUJVcuweDI|207680",
  song: "song/the-piano-guys-the-mission-how-great-thou-art",
} as const satisfies Track
