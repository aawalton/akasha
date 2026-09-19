import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleIfYouFall = {
  id: "01a0b112-8fc1-784b-9727-90debfba97e6",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-if-you-fall",
  ownLength: 3.6355833333333334,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "65OVAf4yPG3umtRv1p5mXD",
      externalLink: "https://open.spotify.com/track/65OVAf4yPG3umtRv1p5mXD",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "If You Fall",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "ifyoufall|5USAMqcbMAzF3HBmeD5pJF|218135",
  song: "song/vinny-marchi-if-you-fall",
} as const satisfies Track
