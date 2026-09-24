import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2LordOfTheRings = {
  id: "01a0afa2-2035-70f6-98ae-212b6929f509",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-lord-of-the-rings",
  ownLength: 5.65625,
  ownProgress: 5.65625,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lord of the Rings",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "lordoftherings|0jW6R8CVyVohuUJVcuweDI|339375",
  song: "song/the-piano-guys-lord-of-the-rings",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys-2",
      discNumber: 1,
      position: 4,
      externalId: "7frDwJ4Fe57hNs0gtHAMR4",
      externalLink: "https://open.spotify.com/track/7frDwJ4Fe57hNs0gtHAMR4",
    },
  ],
} as const satisfies Track
