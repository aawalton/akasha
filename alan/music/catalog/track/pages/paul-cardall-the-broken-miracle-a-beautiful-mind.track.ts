import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleABeautifulMind = {
  id: "01a0b4c8-2f83-7a84-b630-3e5bec482d79",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-a-beautiful-mind",
  ownLength: 1.1357666666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3cZX04frpYwTKh0YSZxdcF",
      externalLink: "https://open.spotify.com/track/3cZX04frpYwTKh0YSZxdcF",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A Beautiful Mind",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "abeautifulmind|7FQRbf8gbKw8KZQZAJWxH2|68146",
} as const satisfies Track
