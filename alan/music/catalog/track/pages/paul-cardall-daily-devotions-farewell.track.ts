import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsFarewell = {
  id: "01a0b4c8-5cd8-7a0a-8ceb-d2f98fdc21e3",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-farewell",
  ownLength: 3.96755,
  ownProgress: 3.96755,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  status: "completed",
  unit: "unit/minutes",
  title: "Farewell",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "farewell|7FQRbf8gbKw8KZQZAJWxH2|238053",
  song: "song/paul-cardall-farewell",
  carriedBy: [
    {
      release: "release/paul-cardall-daily-devotions",
      discNumber: 1,
      position: 3,
      externalId: "79HD98hiqx1Wtao2dyfdTr",
      externalLink: "https://open.spotify.com/track/79HD98hiqx1Wtao2dyfdTr",
    },
  ],
} as const satisfies Track
