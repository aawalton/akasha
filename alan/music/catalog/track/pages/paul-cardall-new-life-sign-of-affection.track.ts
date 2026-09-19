import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeSignOfAffection = {
  id: "01a0b4c8-3f65-78d5-8df3-4e01e8c00687",
  type: "page-type/track",
  slug: "paul-cardall-new-life-sign-of-affection",
  ownLength: 5.116433333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-new-life"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6j4D1izL5KfENZ8cPoq396",
      externalLink: "https://open.spotify.com/track/6j4D1izL5KfENZ8cPoq396",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sign of Affection",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "signofaffection|7FQRbf8gbKw8KZQZAJWxH2|306986",
  song: "song/paul-cardall-sign-of-affection",
} as const satisfies Track
