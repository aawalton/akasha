import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaLetItBeLetItBe = {
  id: "01a0d52b-52de-749c-aab9-4e4860acf48e",
  type: "page-type/track",
  slug: "rockapella-let-it-be-let-it-be",
  ownLength: 3.4518666666666666,
  ownProgress: 3.4518666666666666,
  partOfCollections: ["release/rockapella-let-it-be"],
  status: "completed",
  unit: "unit/minutes",
  title: "Let It Be",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "letitbe|1AFSUleuDTapVhm5zUf4ix|207112",
  song: "song/rockapella-let-it-be",
  carriedBy: [
    {
      release: "release/rockapella-let-it-be",
      discNumber: 1,
      position: 1,
      externalId: "0n41tY2CGlawnoAwwfkEKs",
      externalLink: "https://open.spotify.com/track/0n41tY2CGlawnoAwwfkEKs",
    },
  ],
} as const satisfies Track
