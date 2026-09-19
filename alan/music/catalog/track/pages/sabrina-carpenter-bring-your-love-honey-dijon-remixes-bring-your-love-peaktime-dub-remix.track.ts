import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterBringYourLoveHoneyDijonRemixesBringYourLovePeaktimeDubRemix = {
  id: "01a0b111-1a88-706a-ac4d-5cce0f8580d3",
  type: "page-type/track",
  slug: "sabrina-carpenter-bring-your-love-honey-dijon-remixes-bring-your-love-peaktime-dub-remix",
  ownLength: 4.494016666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-bring-your-love-honey-dijon-remixes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "16wKcqSJxndhZErTqmINne",
      externalLink: "https://open.spotify.com/track/16wKcqSJxndhZErTqmINne",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Bring Your Love - Peaktime Dub Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6tbjWDEIzxoDsBA1FuhfPW", artistName: "Madonna" },
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "0XfQBWgzisaS9ltDV9bXAS", artistName: "Honey Dijon" },
  ],
  trackKey:
    "bringyourlovepeaktimedubremix|0XfQBWgzisaS9ltDV9bXAS,6tbjWDEIzxoDsBA1FuhfPW,74KM79TiuVKeVCqs8QtB0B|269641",
  song: "song/sabrina-carpenter-bring-your-love",
} as const satisfies Track
