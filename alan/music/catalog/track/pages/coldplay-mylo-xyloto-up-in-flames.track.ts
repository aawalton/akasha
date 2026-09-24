import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoUpInFlames = {
  id: "01a0b9ee-dda8-7674-b5a1-bfcf90be0a05",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-up-in-flames",
  ownLength: 3.220666666666667,
  ownProgress: 3.220666666666667,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  status: "completed",
  unit: "unit/minutes",
  title: "Up in Flames",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "upinflames|4gzpq5DPGxSnKTe4SA8HAU|193240",
  song: "song/coldplay-up-in-flames",
  carriedBy: [
    {
      release: "release/coldplay-mylo-xyloto",
      discNumber: 1,
      position: 11,
      externalId: "06t6JWrU05BxaKPtct2P2n",
      externalLink: "https://open.spotify.com/track/06t6JWrU05BxaKPtct2P2n",
    },
  ],
} as const satisfies Track
