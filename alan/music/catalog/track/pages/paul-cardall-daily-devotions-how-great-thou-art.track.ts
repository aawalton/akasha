import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsHowGreatThouArt = {
  id: "01a0b4c8-5d7f-7909-8478-5bb28dab9d8e",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-how-great-thou-art",
  ownLength: 3.422433333333333,
  ownProgress: 3.422433333333333,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  status: "completed",
  unit: "unit/minutes",
  title: "How Great Thou Art",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "howgreatthouart|7FQRbf8gbKw8KZQZAJWxH2|205346",
  song: "song/paul-cardall-how-great-thou-art",
  carriedBy: [
    {
      release: "release/paul-cardall-daily-devotions",
      discNumber: 1,
      position: 8,
      externalId: "7FPzzAixjzW9zNWDujBJ2u",
      externalLink: "https://open.spotify.com/track/7FPzzAixjzW9zNWDujBJ2u",
    },
  ],
} as const satisfies Track
