import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxTheWidowsMansion = {
  id: "01a0b4c8-64ff-7b79-a64c-0b99ddf134a0",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-the-widows-mansion",
  ownLength: 3.4584333333333332,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2bGjRctbOVEeOBgYiHlQNi",
      externalLink: "https://open.spotify.com/track/2bGjRctbOVEeOBgYiHlQNi",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Widow's Mansion",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thewidowsmansion|7FQRbf8gbKw8KZQZAJWxH2|207506",
  song: "song/paul-cardall-the-widows-mansion",
} as const satisfies Track
