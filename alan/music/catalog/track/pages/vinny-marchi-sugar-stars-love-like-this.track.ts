import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsLoveLikeThis = {
  id: "01a0b112-92ed-7ddf-8699-ce411b3e8843",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-love-like-this",
  ownLength: 2.7723666666666666,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4QbjjiBOp8GN4LdMbK2oLa",
      externalLink: "https://open.spotify.com/track/4QbjjiBOp8GN4LdMbK2oLa",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "love like this",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "lovelikethis|5USAMqcbMAzF3HBmeD5pJF|166342",
} as const satisfies Track
