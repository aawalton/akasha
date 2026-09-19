import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxJoyToTheWorld = {
  id: "01a0b4c8-663a-7134-90b4-0950fee993b2",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-joy-to-the-world",
  ownLength: 2.2173333333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ECnCJjRWAfXZrRulSo4vk",
      externalLink: "https://open.spotify.com/track/6ECnCJjRWAfXZrRulSo4vk",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Joy To The World",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "joytotheworld|7FQRbf8gbKw8KZQZAJWxH2|133040",
  song: "song/paul-cardall-joy-to-the-world",
} as const satisfies Track
