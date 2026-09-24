import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangShemibos = {
  id: "01a0d52b-52db-774f-a0af-4238b0267260",
  type: "page-type/track",
  slug: "rockapella-bang-shemibos",
  ownLength: 3.4809666666666668,
  ownProgress: 3.4809666666666668,
  partOfCollections: ["release/rockapella-bang"],
  status: "completed",
  unit: "unit/minutes",
  title: "Shemibos",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "shemibos|1AFSUleuDTapVhm5zUf4ix|208858",
  song: "song/rockapella-shemibos",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 8,
      externalId: "5es4HcDn0Prht3NcNVUc20",
      externalLink: "https://open.spotify.com/track/5es4HcDn0Prht3NcNVUc20",
    },
  ],
} as const satisfies Track
