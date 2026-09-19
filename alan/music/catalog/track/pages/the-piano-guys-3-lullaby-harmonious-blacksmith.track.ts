import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyHarmoniousBlacksmith = {
  id: "01a0afa1-de78-7c0a-9c34-1bbafc284839",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-harmonious-blacksmith",
  ownLength: 2.53845,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "27HoENH2jfmOTppXwzbbJn",
      externalLink: "https://open.spotify.com/track/27HoENH2jfmOTppXwzbbJn",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Harmonious Blacksmith",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "harmoniousblacksmith|0jW6R8CVyVohuUJVcuweDI|152307",
  song: "song/the-piano-guys-harmonious-blacksmith",
} as const satisfies Track
