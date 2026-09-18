import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsHeIsRisen = {
  id: "01a0b4c8-6412-7e1e-a48b-ee7141a22a23",
  type: "page-type/track",
  slug: "paul-cardall-hymns-he-is-risen",
  ownLength: 2.5888833333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3wo5Om3qK3li3qn8JFRS7O",
      externalLink: "https://open.spotify.com/track/3wo5Om3qK3li3qn8JFRS7O",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "He Is Risen",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "heisrisen|7FQRbf8gbKw8KZQZAJWxH2|155333",
} as const satisfies Track
