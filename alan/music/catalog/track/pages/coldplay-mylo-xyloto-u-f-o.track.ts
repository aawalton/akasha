import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoUFO = {
  id: "01a0b9ee-dd51-73a8-97de-09206dcb3877",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-u-f-o",
  ownLength: 2.2969833333333334,
  ownProgress: 2.2969833333333334,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  status: "completed",
  unit: "unit/minutes",
  title: "U.F.O.",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "ufo|4gzpq5DPGxSnKTe4SA8HAU|137819",
  song: "song/coldplay-u-f-o",
  carriedBy: [
    {
      release: "release/coldplay-mylo-xyloto",
      discNumber: 1,
      position: 9,
      externalId: "6BbIybrP84Tp99DLJg1cq3",
      externalLink: "https://open.spotify.com/track/6BbIybrP84Tp99DLJg1cq3",
    },
  ],
} as const satisfies Track
