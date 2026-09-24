import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1Better2gether = {
  id: "01a0d52b-52dd-7d4f-a43c-8a34a559778a",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-better-2gether",
  ownLength: 2.859916666666667,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-jams-vol-1", "release/rockapella-better-2gether"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Better 2gether",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "better2gether|1AFSUleuDTapVhm5zUf4ix|171595",
  song: "song/rockapella-better-2gether",
  carriedBy: [
    {
      release: "release/rockapella-better-2gether",
      discNumber: 1,
      position: 1,
      externalId: "5rxiQsh3HWN2NBf5WH3Y8W",
      externalLink: "https://open.spotify.com/track/5rxiQsh3HWN2NBf5WH3Y8W",
    },
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 14,
      externalId: "1ucWjkrJgXxFbK6tCmZZVV",
      externalLink: "https://open.spotify.com/track/1ucWjkrJgXxFbK6tCmZZVV",
    },
  ],
} as const satisfies Track
