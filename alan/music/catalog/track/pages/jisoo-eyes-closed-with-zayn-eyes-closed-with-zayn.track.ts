import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooEyesClosedWithZaynEyesClosedWithZayn = {
  id: "01a0afa2-72d4-70ab-b8bb-0397cc03f057",
  type: "page-type/track",
  slug: "jisoo-eyes-closed-with-zayn-eyes-closed-with-zayn",
  ownLength: 3.0229166666666667,
  ownProgress: 0,
  partOfCollections: ["release/jisoo-eyes-closed-with-zayn"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4WFfPxJv1KRekG6mxn837K",
      externalLink: "https://open.spotify.com/track/4WFfPxJv1KRekG6mxn837K",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "EYES CLOSED (with ZAYN)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6UZ0ba50XreR4TM8u322gs", artistName: "JISOO" },
    { externalId: "5ZsFI1h6hIdQRw2ti0hz81", artistName: "ZAYN" },
  ],
  trackKey: "eyesclosedwithzayn|5ZsFI1h6hIdQRw2ti0hz81,6UZ0ba50XreR4TM8u322gs|181375",
  song: "song/jisoo-eyes-closed",
} as const satisfies Track
