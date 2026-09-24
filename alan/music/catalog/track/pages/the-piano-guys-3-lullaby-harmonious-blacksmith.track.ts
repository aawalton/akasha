import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyHarmoniousBlacksmith = {
  id: "01a0afa1-de78-7c0a-9c34-1bbafc284839",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-harmonious-blacksmith",
  ownLength: 2.53845,
  ownProgress: 2.53845,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  status: "completed",
  unit: "unit/minutes",
  title: "Harmonious Blacksmith",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "harmoniousblacksmith|0jW6R8CVyVohuUJVcuweDI|152307",
  song: "song/the-piano-guys-harmonious-blacksmith",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-lullaby",
      discNumber: 1,
      position: 10,
      externalId: "27HoENH2jfmOTppXwzbbJn",
      externalLink: "https://open.spotify.com/track/27HoENH2jfmOTppXwzbbJn",
    },
  ],
} as const satisfies Track
