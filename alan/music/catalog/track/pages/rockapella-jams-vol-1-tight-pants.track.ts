import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1TightPants = {
  id: "01a0d52b-52de-74d1-bff3-bbae83481269",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-tight-pants",
  ownLength: 1.3152333333333333,
  ownProgress: 1.3152333333333333,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tight Pants",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "tightpants|1AFSUleuDTapVhm5zUf4ix|78914",
  song: "song/rockapella-tight-pants",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 9,
      externalId: "6wxJnWf1hyEKovSLV7k4Kj",
      externalLink: "https://open.spotify.com/track/6wxJnWf1hyEKovSLV7k4Kj",
    },
  ],
} as const satisfies Track
