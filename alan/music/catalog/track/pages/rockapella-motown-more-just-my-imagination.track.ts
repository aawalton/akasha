import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaMotownMoreJustMyImagination = {
  id: "01a0d52b-52de-775a-abe7-cfc831d66aeb",
  type: "page-type/track",
  slug: "rockapella-motown-more-just-my-imagination",
  ownLength: 3.7567666666666666,
  ownProgress: 3.7567666666666666,
  partOfCollections: ["release/rockapella-motown-more"],
  status: "completed",
  unit: "unit/minutes",
  title: "Just My Imagination",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "justmyimagination|1AFSUleuDTapVhm5zUf4ix|225406",
  song: "song/rockapella-just-my-imagination",
  carriedBy: [
    {
      release: "release/rockapella-motown-more",
      discNumber: 1,
      position: 12,
      externalId: "3dtruCLxhZLOEtuRfhu515",
      externalLink: "https://open.spotify.com/track/3dtruCLxhZLOEtuRfhu515",
    },
  ],
  createdAt: "2026-09-24T20:46:21.406Z",
  updatedAt: "2026-09-24T21:00:26.000Z",
} as const satisfies Track
