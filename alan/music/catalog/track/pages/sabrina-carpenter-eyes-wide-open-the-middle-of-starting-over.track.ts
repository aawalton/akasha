import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenTheMiddleOfStartingOver = {
  id: "01a0b111-2893-76b5-b176-b7566af08c4a",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-the-middle-of-starting-over",
  ownLength: 3.546,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5wX5skuafFdeF31vpM6Krl",
      externalLink: "https://open.spotify.com/track/5wX5skuafFdeF31vpM6Krl",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Middle of Starting Over",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "themiddleofstartingover|74KM79TiuVKeVCqs8QtB0B|212760",
  song: "song/sabrina-carpenter-the-middle-of-starting-over",
} as const satisfies Track
