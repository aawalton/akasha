import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangNoPressure = {
  id: "01a0d52b-52db-7e38-b687-8a80c59ea61f",
  type: "page-type/track",
  slug: "rockapella-bang-no-pressure",
  ownLength: 4.356733333333334,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-bang"],
  status: "not-started",
  unit: "unit/minutes",
  title: "No Pressure",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "nopressure|1AFSUleuDTapVhm5zUf4ix|261404",
  song: "song/rockapella-no-pressure",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 13,
      externalId: "0LFR97zZ48MTPj7fK7mh05",
      externalLink: "https://open.spotify.com/track/0LFR97zZ48MTPj7fK7mh05",
    },
  ],
} as const satisfies Track
