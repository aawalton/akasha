import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsINeedTheeEveryHour = {
  id: "01a0b4c8-6456-75c3-a3fe-f0deac0f6932",
  type: "page-type/track",
  slug: "paul-cardall-hymns-i-need-thee-every-hour",
  ownLength: 3.3431,
  ownProgress: 3.3431,
  partOfCollections: ["release/paul-cardall-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Need Thee Every Hour",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "ineedtheeeveryhour|7FQRbf8gbKw8KZQZAJWxH2|200586",
  song: "song/paul-cardall-i-need-thee-every-hour",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns",
      discNumber: 1,
      position: 15,
      externalId: "1oVGrGvfeoDaCtcHjGTm2g",
      externalLink: "https://open.spotify.com/track/1oVGrGvfeoDaCtcHjGTm2g",
    },
  ],
} as const satisfies Track
