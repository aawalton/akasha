import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapella2OneDayAfterDay = {
  id: "01a0d52b-52da-70bc-b1d1-647966d91bc2",
  type: "page-type/track",
  slug: "rockapella-2-one-day-after-day",
  ownLength: 3.9381,
  ownProgress: 3.9381,
  partOfCollections: ["release/rockapella-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "One Day After Day",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "onedayafterday|1AFSUleuDTapVhm5zUf4ix|236286",
  song: "song/rockapella-one-day-after-day",
  carriedBy: [
    {
      release: "release/rockapella-2",
      discNumber: 1,
      position: 9,
      externalId: "2QWD93UBlQb6Q1HS7USrbj",
      externalLink: "https://open.spotify.com/track/2QWD93UBlQb6Q1HS7USrbj",
    },
  ],
} as const satisfies Track
