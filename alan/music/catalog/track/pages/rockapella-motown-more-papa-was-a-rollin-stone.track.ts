import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaMotownMorePapaWasARollinStone = {
  id: "01a0d52b-52de-7f12-ae97-c68657ebeee5",
  type: "page-type/track",
  slug: "rockapella-motown-more-papa-was-a-rollin-stone",
  ownLength: 4.018016666666667,
  ownProgress: 4.018016666666667,
  partOfCollections: ["release/rockapella-motown-more"],
  status: "completed",
  unit: "unit/minutes",
  title: "Papa Was a Rollin' Stone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "papawasarollinstone|1AFSUleuDTapVhm5zUf4ix|241081",
  song: "song/rockapella-papa-was-a-rollin-stone",
  carriedBy: [
    {
      release: "release/rockapella-motown-more",
      discNumber: 1,
      position: 3,
      externalId: "1G7tR7EWwzg7Wud0s1QU9c",
      externalLink: "https://open.spotify.com/track/1G7tR7EWwzg7Wud0s1QU9c",
    },
  ],
} as const satisfies Track
