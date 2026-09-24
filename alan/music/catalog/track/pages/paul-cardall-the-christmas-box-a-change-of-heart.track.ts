import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxAChangeOfHeart = {
  id: "01a0b4c8-6612-7a7f-9945-a3f5aa894d0d",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-a-change-of-heart",
  ownLength: 3.87,
  ownProgress: 3.87,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Change Of Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "achangeofheart|7FQRbf8gbKw8KZQZAJWxH2|232200",
  song: "song/paul-cardall-a-change-of-heart",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 11,
      externalId: "1izkfUm8NdwJ4nx4w61Z6d",
      externalLink: "https://open.spotify.com/track/1izkfUm8NdwJ4nx4w61Z6d",
    },
  ],
} as const satisfies Track
