import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterBringYourLoveHoneyDijonRemixesBringYourLove = {
  id: "01a0b111-1acd-7511-9b2f-6bcca5b4f80f",
  type: "page-type/track",
  slug: "sabrina-carpenter-bring-your-love-honey-dijon-remixes-bring-your-love",
  ownLength: 3.7026833333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-bring-your-love-honey-dijon-remixes"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "22iqm6UrX42j3EPZAYYWP3",
      externalLink: "https://open.spotify.com/track/22iqm6UrX42j3EPZAYYWP3",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Bring Your Love",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6tbjWDEIzxoDsBA1FuhfPW", artistName: "Madonna" },
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
  ],
  trackKey: "bringyourlove|6tbjWDEIzxoDsBA1FuhfPW,74KM79TiuVKeVCqs8QtB0B|222161",
  song: "song/sabrina-carpenter-bring-your-love",
} as const satisfies Track
