import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLifeInTechnicolorIiTheGoldrush = {
  id: "01a0b9ee-fb07-7ff1-a9e8-27b2ca2b0f92",
  type: "page-type/track",
  slug: "coldplay-life-in-technicolor-ii-the-goldrush",
  ownLength: 2.48755,
  ownProgress: 2.48755,
  partOfCollections: ["release/coldplay-life-in-technicolor-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Goldrush",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "thegoldrush|4gzpq5DPGxSnKTe4SA8HAU|149253",
  song: "song/coldplay-the-goldrush",
  carriedBy: [
    {
      release: "release/coldplay-life-in-technicolor-ii",
      discNumber: 1,
      position: 3,
      externalId: "7jWasg4ilKcOwcrGPI0CT1",
      externalLink: "https://open.spotify.com/track/7jWasg4ilKcOwcrGPI0CT1",
    },
  ],
} as const satisfies Track
