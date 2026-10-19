import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPtxStandingBy = {
  id: "01a1546f-24fd-7144-a7e6-e749de5eefcf",
  type: "page-type/track",
  slug: "pentatonix-ptx-standing-by",
  ownLength: 4.16555,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-ptx"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Standing By",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "standingby|26AHtbjWKiwYzsoGoUZq53|249933",
  song: "song/pentatonix-standing-by",
  carriedBy: [
    {
      release: "release/pentatonix-ptx",
      discNumber: 1,
      position: 8,
      externalId: "6q4nqL08lMk07WrQ37rmid",
      externalLink: "https://open.spotify.com/track/6q4nqL08lMk07WrQ37rmid",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
