import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIPrfct = {
  id: "01a0b111-2690-7a4e-b5fa-07fd6e9f187c",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-i-prfct",
  ownLength: 2.77555,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-singular-act-i"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "75wU86jr8iIiBVfD3kU3cU",
      externalLink: "https://open.spotify.com/track/75wU86jr8iIiBVfD3kU3cU",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "prfct",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "prfct|74KM79TiuVKeVCqs8QtB0B|166533",
  song: "song/sabrina-carpenter-prfct",
} as const satisfies Track
