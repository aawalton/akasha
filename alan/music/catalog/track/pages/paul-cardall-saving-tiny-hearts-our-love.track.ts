import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsOurLove = {
  id: "01a0b4c8-3dd0-7e92-8b6f-2d2459f1e6db",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-our-love",
  ownLength: 3.86,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1kbItb45MwET1UkL5T3Gu9",
      externalLink: "https://open.spotify.com/track/1kbItb45MwET1UkL5T3Gu9",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Our Love",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ourlove|7FQRbf8gbKw8KZQZAJWxH2|231600",
} as const satisfies Track
