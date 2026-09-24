import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele30IDrinkWine = {
  id: "01a0d52b-c25a-71c1-bc85-d317594ec8f9",
  type: "page-type/track",
  slug: "adele-30-i-drink-wine",
  ownLength: 6.2694833333333335,
  ownProgress: 6.2694833333333335,
  partOfCollections: ["release/adele-30"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Drink Wine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "idrinkwine|4dpARuHxo51G3z768sgnrY|376169",
  song: "song/adele-i-drink-wine",
  carriedBy: [
    {
      release: "release/adele-30",
      discNumber: 1,
      position: 7,
      externalId: "6v0UJD4a2FtleHeSYVX02A",
      externalLink: "https://open.spotify.com/track/6v0UJD4a2FtleHeSYVX02A",
    },
  ],
} as const satisfies Track
