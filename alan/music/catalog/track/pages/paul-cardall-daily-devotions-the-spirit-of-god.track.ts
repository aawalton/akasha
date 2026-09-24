import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsTheSpiritOfGod = {
  id: "01a0b4c8-5cfa-7532-a54e-35a72c937a5d",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-the-spirit-of-god",
  ownLength: 3.078,
  ownProgress: 3.078,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Spirit of God",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thespiritofgod|7FQRbf8gbKw8KZQZAJWxH2|184680",
  song: "song/paul-cardall-the-spirit-of-god",
  carriedBy: [
    {
      release: "release/paul-cardall-daily-devotions",
      discNumber: 1,
      position: 4,
      externalId: "0oJ7XrfOn5P6OUu0RfWIKc",
      externalLink: "https://open.spotify.com/track/0oJ7XrfOn5P6OUu0RfWIKc",
    },
  ],
} as const satisfies Track
