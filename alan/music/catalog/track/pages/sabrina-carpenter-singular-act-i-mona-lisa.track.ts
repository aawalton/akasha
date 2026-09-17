import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIMonaLisa = {
  id: "01a0b111-26cf-7acc-ad47-31ae98930ac4",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-i-mona-lisa",
  ownLength: 2.30755,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-singular-act-i"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7Gq4tfeuWPjr6WQiB7aBXz",
      externalLink: "https://open.spotify.com/track/7Gq4tfeuWPjr6WQiB7aBXz",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Mona Lisa",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "monalisa|74KM79TiuVKeVCqs8QtB0B|138453",
} as const satisfies Track
