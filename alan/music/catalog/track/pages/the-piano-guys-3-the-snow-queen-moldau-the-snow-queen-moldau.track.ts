import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3TheSnowQueenMoldauTheSnowQueenMoldau = {
  id: "01a0afa1-e7f0-7cdb-aeb7-a0204cfed9ed",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-snow-queen-moldau-the-snow-queen-moldau",
  ownLength: 4.925,
  ownProgress: 4.925,
  partOfCollections: ["release/the-piano-guys-3-the-snow-queen-moldau"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Snow Queen (Moldau)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "thesnowqueenmoldau|0jW6R8CVyVohuUJVcuweDI|295500",
  song: "song/the-piano-guys-the-snow-queen-moldau",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-snow-queen-moldau",
      discNumber: 1,
      position: 1,
      externalId: "0vsdIPjKb8veutD9Vn17Dx",
      externalLink: "https://open.spotify.com/track/0vsdIPjKb8veutD9Vn17Dx",
    },
  ],
} as const satisfies Track
