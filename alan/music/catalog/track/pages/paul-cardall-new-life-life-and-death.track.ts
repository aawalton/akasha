import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeLifeAndDeath = {
  id: "01a0b4c8-3f02-71d0-abba-2091cd22cb43",
  type: "page-type/track",
  slug: "paul-cardall-new-life-life-and-death",
  ownLength: 5.572,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-new-life"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ld6TrelktnNxPwIE44Ke2",
      externalLink: "https://open.spotify.com/track/6ld6TrelktnNxPwIE44Ke2",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Life and Death",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "lifeanddeath|7FQRbf8gbKw8KZQZAJWxH2|334320",
  song: "song/paul-cardall-life-and-death",
} as const satisfies Track
