import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoPrincessOfChina = {
  id: "01a0b9ee-dd7b-73a0-ac5e-cd497376fd44",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-princess-of-china",
  ownLength: 3.9869166666666667,
  ownProgress: 3.9869166666666667,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  status: "completed",
  unit: "unit/minutes",
  title: "Princess of China",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "Rihanna" }],
  trackKey: "princessofchina|4gzpq5DPGxSnKTe4SA8HAU,5pKCCKE2ajJHZ9KAiaK11H|239215",
  song: "song/coldplay-princess-of-china",
  carriedBy: [
    {
      release: "release/coldplay-mylo-xyloto",
      discNumber: 1,
      position: 10,
      externalId: "4HXOBjwv2RnLpGG4xWOO6N",
      externalLink: "https://open.spotify.com/track/4HXOBjwv2RnLpGG4xWOO6N",
    },
  ],
} as const satisfies Track
