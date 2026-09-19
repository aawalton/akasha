import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIiImFakin = {
  id: "01a0b111-2543-72a6-9ee5-274c49b64b37",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-ii-im-fakin",
  ownLength: 2.9218166666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-singular-act-ii"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "62dMfMIAoHZcu3ne9Ie3RE",
      externalLink: "https://open.spotify.com/track/62dMfMIAoHZcu3ne9Ie3RE",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I'm Fakin",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "imfakin|74KM79TiuVKeVCqs8QtB0B|175309",
  song: "song/sabrina-carpenter-im-fakin",
} as const satisfies Track
