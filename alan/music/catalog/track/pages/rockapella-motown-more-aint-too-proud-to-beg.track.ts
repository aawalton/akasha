import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaMotownMoreAintTooProudToBeg = {
  id: "01a0d52b-52de-7e8f-b7dc-1c7d7528176e",
  type: "page-type/track",
  slug: "rockapella-motown-more-aint-too-proud-to-beg",
  ownLength: 3.0775166666666665,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-motown-more"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Ain't Too Proud to Beg",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "ainttooproudtobeg|1AFSUleuDTapVhm5zUf4ix|184651",
  song: "song/rockapella-aint-too-proud-to-beg",
  carriedBy: [
    {
      release: "release/rockapella-motown-more",
      discNumber: 1,
      position: 11,
      externalId: "1RAWlQBf6YAuKrV0wVg8DJ",
      externalLink: "https://open.spotify.com/track/1RAWlQBf6YAuKrV0wVg8DJ",
    },
  ],
} as const satisfies Track
