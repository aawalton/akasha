import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapella2Tempted = {
  id: "01a0d52b-52da-73de-ac8c-6b727a6c7734",
  type: "page-type/track",
  slug: "rockapella-2-tempted",
  ownLength: 3.5572833333333334,
  ownProgress: 3.5572833333333334,
  partOfCollections: ["release/rockapella-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tempted",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "tempted|1AFSUleuDTapVhm5zUf4ix|213437",
  song: "song/rockapella-tempted",
  carriedBy: [
    {
      release: "release/rockapella-2",
      discNumber: 1,
      position: 3,
      externalId: "6qG8QqQBuj3NBrodIkKdFE",
      externalLink: "https://open.spotify.com/track/6qG8QqQBuj3NBrodIkKdFE",
    },
  ],
} as const satisfies Track
