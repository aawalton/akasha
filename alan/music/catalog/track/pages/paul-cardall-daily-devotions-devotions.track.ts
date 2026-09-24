import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsDevotions = {
  id: "01a0b4c8-5de2-76af-b0ab-806a4ff15906",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-devotions",
  ownLength: 2.355766666666667,
  ownProgress: 2.355766666666667,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  status: "completed",
  unit: "unit/minutes",
  title: "Devotions",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "devotions|7FQRbf8gbKw8KZQZAJWxH2|141346",
  song: "song/paul-cardall-devotions",
  carriedBy: [
    {
      release: "release/paul-cardall-daily-devotions",
      discNumber: 1,
      position: 11,
      externalId: "2CevnA3DCMSXggQAahr7Cb",
      externalLink: "https://open.spotify.com/track/2CevnA3DCMSXggQAahr7Cb",
    },
  ],
} as const satisfies Track
