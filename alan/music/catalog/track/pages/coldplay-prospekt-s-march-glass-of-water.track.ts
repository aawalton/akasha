import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayProspektSMarchGlassOfWater = {
  id: "01a0b9ee-fc3c-73b2-9be3-6b092088feaf",
  type: "page-type/track",
  slug: "coldplay-prospekt-s-march-glass-of-water",
  ownLength: 4.7484166666666665,
  ownProgress: 4.7484166666666665,
  partOfCollections: [
    "release/coldplay-prospekt-s-march",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Glass of Water",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "glassofwater|4gzpq5DPGxSnKTe4SA8HAU|284905",
  song: "song/coldplay-glass-of-water",
  carriedBy: [
    {
      release: "release/coldplay-prospekt-s-march",
      discNumber: 1,
      position: 3,
      externalId: "0WxY1PPhJBSfyWSPMgZWuQ",
      externalLink: "https://open.spotify.com/track/0WxY1PPhJBSfyWSPMgZWuQ",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 2,
      position: 3,
      externalId: "0Y27miOkWnVymvOIA19BgU",
      externalLink: "https://open.spotify.com/track/0Y27miOkWnVymvOIA19BgU",
    },
  ],
} as const satisfies Track
