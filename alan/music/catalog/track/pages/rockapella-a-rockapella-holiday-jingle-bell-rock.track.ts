import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaARockapellaHolidayJingleBellRock = {
  id: "01a0d52b-52db-7098-8d4b-f9e73cc0cb54",
  type: "page-type/track",
  slug: "rockapella-a-rockapella-holiday-jingle-bell-rock",
  ownLength: 1.9295833333333334,
  ownProgress: 1.9295833333333334,
  partOfCollections: ["release/rockapella-a-rockapella-holiday"],
  status: "completed",
  unit: "unit/minutes",
  title: "Jingle Bell Rock",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "jinglebellrock|1AFSUleuDTapVhm5zUf4ix|115775",
  song: "song/rockapella-jingle-bell-rock",
  carriedBy: [
    {
      release: "release/rockapella-a-rockapella-holiday",
      discNumber: 1,
      position: 6,
      externalId: "7h0jTze9vNvp7Kpid2i2dB",
      externalLink: "https://open.spotify.com/track/7h0jTze9vNvp7Kpid2i2dB",
    },
  ],
} as const satisfies Track
