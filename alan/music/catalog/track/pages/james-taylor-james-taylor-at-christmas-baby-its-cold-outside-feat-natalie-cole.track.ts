import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmasBabyItsColdOutsideFeatNatalieCole = {
  id: "01a0abeb-2cc2-78e7-bb1a-d77cea4a5b41",
  type: "page-type/track",
  slug: "james-taylor-james-taylor-at-christmas-baby-its-cold-outside-feat-natalie-cole",
  ownLength: 4.294666666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-james-taylor-at-christmas"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "47xnyhYDKv1iXrgFIFoUWL",
      externalLink: "https://open.spotify.com/track/47xnyhYDKv1iXrgFIFoUWL",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Baby, It's Cold Outside (feat. Natalie Cole)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
    { externalId: "5tTsrGPwQRWUsHR2Xf7Ke9", artistName: "Natalie Cole" },
  ],
  trackKey:
    "babyitscoldoutsidefeatnataliecole|0vn7UBvSQECKJm2817Yf1P,5tTsrGPwQRWUsHR2Xf7Ke9|257680",
  song: "song/james-taylor-baby-its-cold-outside",
} as const satisfies Track
