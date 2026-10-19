import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixFirstFirstOriginalMix = {
  id: "01a1546f-24f8-744f-bb04-8b350c90634a",
  type: "page-type/track",
  slug: "pentatonix-first-first-original-mix",
  ownLength: 4.171866666666666,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-first"],
  status: "not-started",
  unit: "unit/minutes",
  title: "First (Original Mix)",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artistName: "Lincoln Ehlert" }],
  trackKey: "firstoriginalmix|1j62Em4xZKPlhPK3enfvWa|250312",
  song: "song/pentatonix-first",
  carriedBy: [
    {
      release: "release/pentatonix-first",
      discNumber: 1,
      position: 1,
      externalId: "3WD8dhXB2vKeUZMu8EzCMF",
      externalLink: "https://open.spotify.com/track/3WD8dhXB2vKeUZMu8EzCMF",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
