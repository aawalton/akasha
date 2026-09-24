import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYTilKingdomCome = {
  id: "01a0b9ee-e5a5-7a16-84d8-c1cf09212943",
  type: "page-type/track",
  slug: "coldplay-x-y-til-kingdom-come",
  ownLength: 4.1778,
  ownProgress: 4.1778,
  partOfCollections: ["release/coldplay-x-y"],
  status: "completed",
  unit: "unit/minutes",
  title: "Til Kingdom Come",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "tilkingdomcome|4gzpq5DPGxSnKTe4SA8HAU|250668",
  song: "song/coldplay-til-kingdom-come",
  carriedBy: [
    {
      release: "release/coldplay-x-y",
      discNumber: 1,
      position: 13,
      externalId: "1wQXj5bgxyZQ2XmE2X9s6n",
      externalLink: "https://open.spotify.com/track/1wQXj5bgxyZQ2XmE2X9s6n",
    },
  ],
} as const satisfies Track
