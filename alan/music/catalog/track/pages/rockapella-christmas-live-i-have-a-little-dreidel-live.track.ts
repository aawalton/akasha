import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaChristmasLiveIHaveALittleDreidelLive = {
  id: "01a0d52b-52dc-7a75-a4af-0a585ef265c6",
  type: "page-type/track",
  slug: "rockapella-christmas-live-i-have-a-little-dreidel-live",
  ownLength: 1.3806666666666667,
  ownProgress: 1.3806666666666667,
  partOfCollections: ["release/rockapella-christmas-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Have a Little Dreidel - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "ihavealittledreidellive|1AFSUleuDTapVhm5zUf4ix|82840",
  song: "song/rockapella-i-have-a-little-dreidel",
  carriedBy: [
    {
      release: "release/rockapella-christmas-live",
      discNumber: 1,
      position: 2,
      externalId: "7xTEw5km5k2CMlMAuiwWFM",
      externalLink: "https://open.spotify.com/track/7xTEw5km5k2CMlMAuiwWFM",
    },
  ],
} as const satisfies Track
