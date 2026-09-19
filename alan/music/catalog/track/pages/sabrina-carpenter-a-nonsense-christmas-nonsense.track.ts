import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterANonsenseChristmasNonsense = {
  id: "01a0b111-2e3d-7983-b2ee-5c18bdeffcad",
  type: "page-type/track",
  slug: "sabrina-carpenter-a-nonsense-christmas-nonsense",
  ownLength: 2.7274666666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-a-nonsense-christmas"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5HwvqgVOe2MV9sFbCSyf7j",
      externalLink: "https://open.spotify.com/track/5HwvqgVOe2MV9sFbCSyf7j",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Nonsense",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "nonsense|74KM79TiuVKeVCqs8QtB0B|163648",
  song: "song/sabrina-carpenter-nonsense",
} as const satisfies Track
