import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1CandyManBonusTrack = {
  id: "01a0d52b-52dd-7a0c-b903-86c70f84ebe9",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-candy-man-bonus-track",
  ownLength: 2.5998666666666668,
  ownProgress: 2.5998666666666668,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Candy Man (Bonus Track)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "candymanbonustrack|1AFSUleuDTapVhm5zUf4ix|155992",
  song: "song/rockapella-candy-man-bonus-track",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 21,
      externalId: "4jPBNeWdZ45bf6x14IQw6i",
      externalLink: "https://open.spotify.com/track/4jPBNeWdZ45bf6x14IQw6i",
    },
  ],
} as const satisfies Track
