import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaSmilinOffMyMind = {
  id: "01a0d52b-52df-7c79-8d04-7f59e1e5dcc8",
  type: "page-type/track",
  slug: "rockapella-smilin-off-my-mind",
  ownLength: 3.8607,
  ownProgress: 3.8607,
  partOfCollections: ["release/rockapella-smilin"],
  status: "completed",
  unit: "unit/minutes",
  title: "Off My Mind",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "offmymind|1AFSUleuDTapVhm5zUf4ix|231642",
  song: "song/rockapella-off-my-mind",
  carriedBy: [
    {
      release: "release/rockapella-smilin",
      discNumber: 1,
      position: 4,
      externalId: "5cOcETykgTVdekLWebkPuk",
      externalLink: "https://open.spotify.com/track/5cOcETykgTVdekLWebkPuk",
    },
  ],
} as const satisfies Track
