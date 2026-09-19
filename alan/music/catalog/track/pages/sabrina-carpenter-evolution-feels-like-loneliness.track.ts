import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionFeelsLikeLoneliness = {
  id: "01a0b111-272f-70e2-9117-ec06596d3426",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-feels-like-loneliness",
  ownLength: 3.3428833333333334,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0QTOY1FBKwC7jA33N8cLSi",
      externalLink: "https://open.spotify.com/track/0QTOY1FBKwC7jA33N8cLSi",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Feels Like Loneliness",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "feelslikeloneliness|74KM79TiuVKeVCqs8QtB0B|200573",
  song: "song/sabrina-carpenter-feels-like-loneliness",
} as const satisfies Track
