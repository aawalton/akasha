import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsTheSpiritOfGod = {
  id: "01a0b4c8-5cfa-7532-a54e-35a72c937a5d",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-the-spirit-of-god",
  ownLength: 3.078,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0oJ7XrfOn5P6OUu0RfWIKc",
      externalLink: "https://open.spotify.com/track/0oJ7XrfOn5P6OUu0RfWIKc",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Spirit of God",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thespiritofgod|7FQRbf8gbKw8KZQZAJWxH2|184680",
  song: "song/paul-cardall-the-spirit-of-god",
} as const satisfies Track
