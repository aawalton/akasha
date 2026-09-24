import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedASkyFullOfStars = {
  id: "01a0afa2-1176-7039-89af-ab37b961480f",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-a-sky-full-of-stars",
  ownLength: 4.133333333333334,
  ownProgress: 4.133333333333334,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Sky Full of Stars",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "askyfullofstars|0jW6R8CVyVohuUJVcuweDI|248000",
  song: "song/the-piano-guys-a-sky-full-of-stars",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-uncharted",
      discNumber: 1,
      position: 2,
      externalId: "7k0KOplnvXm5GUkw7RXYg0",
      externalLink: "https://open.spotify.com/track/7k0KOplnvXm5GUkw7RXYg0",
    },
  ],
} as const satisfies Track
