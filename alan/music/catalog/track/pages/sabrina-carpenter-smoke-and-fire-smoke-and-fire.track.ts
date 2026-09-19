import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSmokeAndFireSmokeAndFire = {
  id: "01a0b111-332b-78e5-a4f4-709d83fdea57",
  type: "page-type/track",
  slug: "sabrina-carpenter-smoke-and-fire-smoke-and-fire",
  ownLength: 3.750166666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-smoke-and-fire"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "67zT3NI4tTOj8GreXetF6s",
      externalLink: "https://open.spotify.com/track/67zT3NI4tTOj8GreXetF6s",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Smoke and Fire",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "smokeandfire|74KM79TiuVKeVCqs8QtB0B|225010",
  song: "song/sabrina-carpenter-smoke-and-fire",
} as const satisfies Track
