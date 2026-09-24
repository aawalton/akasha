import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoMMIX = {
  id: "01a0b9ee-dcce-79ac-b87a-f18a3baaee32",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-m-m-i-x",
  ownLength: 0.8077666666666666,
  ownProgress: 0.8077666666666666,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  status: "completed",
  unit: "unit/minutes",
  title: "M.M.I.X.",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "mmix|4gzpq5DPGxSnKTe4SA8HAU|48466",
  song: "song/coldplay-m-m-i-x",
  carriedBy: [
    {
      release: "release/coldplay-mylo-xyloto",
      discNumber: 1,
      position: 6,
      externalId: "5Y7ztPw93VbAle55brM0jo",
      externalLink: "https://open.spotify.com/track/5Y7ztPw93VbAle55brM0jo",
    },
  ],
} as const satisfies Track
