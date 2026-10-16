import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexWarrenWildchildFeverDream = {
  id: "01a144f7-55ff-7878-810f-1e38f514133d",
  type: "page-type/track",
  slug: "alex-warren-wildchild-fever-dream",
  ownLength: 2.557166666666667,
  ownProgress: 0,
  partOfCollections: ["release/alex-warren-wildchild", "release/alex-warren-fever-dream"],
  status: "not-started",
  unit: "unit/minutes",
  title: "FEVER DREAM",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/alex-warren" }],
  trackKey: "feverdream|0fTSzq9jAh4c36UVb4V7CB|153430",
  song: "song/alex-warren-fever-dream",
  carriedBy: [
    {
      release: "release/alex-warren-fever-dream",
      discNumber: 1,
      position: 1,
      externalId: "7ogpGbKc4Io6NCU6ydxXwZ",
      externalLink: "https://open.spotify.com/track/7ogpGbKc4Io6NCU6ydxXwZ",
    },
    {
      release: "release/alex-warren-wildchild",
      discNumber: 1,
      position: 10,
      externalId: "50E5Op3ZjRibJGZjGBcGR6",
      externalLink: "https://open.spotify.com/track/50E5Op3ZjRibJGZjGBcGR6",
    },
  ],
  createdAt: "2026-10-16T13:47:02.519Z",
  updatedAt: "2026-10-16T13:47:02.519Z",
} as const satisfies Track
