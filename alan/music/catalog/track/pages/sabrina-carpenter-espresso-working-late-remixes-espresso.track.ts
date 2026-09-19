import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEspressoWorkingLateRemixesEspresso = {
  id: "01a0b111-2b76-7199-80b4-215f786dfdc9",
  type: "page-type/track",
  slug: "sabrina-carpenter-espresso-working-late-remixes-espresso",
  ownLength: 2.9243166666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-espresso-working-late-remixes"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "11TzHASlB6SOZQfRqjztfT",
      externalLink: "https://open.spotify.com/track/11TzHASlB6SOZQfRqjztfT",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Espresso",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "espresso|74KM79TiuVKeVCqs8QtB0B|175459",
  song: "song/sabrina-carpenter-espresso",
} as const satisfies Track
