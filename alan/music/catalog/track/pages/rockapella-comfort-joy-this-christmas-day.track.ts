import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaComfortJoyThisChristmasDay = {
  id: "01a0d52b-52dc-7bc3-889d-432a294a99e0",
  type: "page-type/track",
  slug: "rockapella-comfort-joy-this-christmas-day",
  ownLength: 3.1439666666666666,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-comfort-joy"],
  status: "not-started",
  unit: "unit/minutes",
  title: "This Christmas Day",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "thischristmasday|1AFSUleuDTapVhm5zUf4ix|188638",
  song: "song/rockapella-this-christmas-day",
  carriedBy: [
    {
      release: "release/rockapella-comfort-joy",
      discNumber: 1,
      position: 6,
      externalId: "4bCr6KDCEhMyZwmgGZjLa0",
      externalLink: "https://open.spotify.com/track/4bCr6KDCEhMyZwmgGZjLa0",
    },
  ],
} as const satisfies Track
