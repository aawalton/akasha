import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterViciousVicious = {
  id: "01a0b111-2ea5-75d2-a700-ad43c1810294",
  type: "page-type/track",
  slug: "sabrina-carpenter-vicious-vicious",
  ownLength: 2.4981666666666666,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-vicious"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "77Gyctcku69jSlSSYhZEkh",
      externalLink: "https://open.spotify.com/track/77Gyctcku69jSlSSYhZEkh",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Vicious",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "vicious|74KM79TiuVKeVCqs8QtB0B|149890",
  song: "song/sabrina-carpenter-vicious",
} as const satisfies Track
