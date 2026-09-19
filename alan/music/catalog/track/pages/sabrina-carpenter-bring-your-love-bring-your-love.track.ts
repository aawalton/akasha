import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterBringYourLoveBringYourLove = {
  id: "01a0b111-1b17-7ec9-8e24-17ba23d45d11",
  type: "page-type/track",
  slug: "sabrina-carpenter-bring-your-love-bring-your-love",
  ownLength: 3.6066666666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-bring-your-love"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Wr7vTGp9vF3YCG4EASz1e",
      externalLink: "https://open.spotify.com/track/0Wr7vTGp9vF3YCG4EASz1e",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Bring Your Love",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6tbjWDEIzxoDsBA1FuhfPW", artistName: "Madonna" },
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
  ],
  trackKey: "bringyourlove|6tbjWDEIzxoDsBA1FuhfPW,74KM79TiuVKeVCqs8QtB0B|216400",
  song: "song/sabrina-carpenter-bring-your-love",
} as const satisfies Track
