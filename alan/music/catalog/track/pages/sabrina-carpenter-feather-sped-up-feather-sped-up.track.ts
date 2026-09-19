import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFeatherSpedUpFeatherSpedUp = {
  id: "01a0b111-2daa-72ed-893b-7b617e3af614",
  type: "page-type/track",
  slug: "sabrina-carpenter-feather-sped-up-feather-sped-up",
  ownLength: 2.55145,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-feather-sped-up"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2WkrEyLzATbOK8U3xt8Ggq",
      externalLink: "https://open.spotify.com/track/2WkrEyLzATbOK8U3xt8Ggq",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Feather - Sped Up",
  trackType: "version",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "featherspedup|74KM79TiuVKeVCqs8QtB0B|153087",
  song: "song/sabrina-carpenter-feather",
} as const satisfies Track
