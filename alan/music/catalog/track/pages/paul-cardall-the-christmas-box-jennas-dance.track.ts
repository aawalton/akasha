import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxJennasDance = {
  id: "01a0b4c8-6528-74f3-bea8-e264f8ca8724",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-jennas-dance",
  ownLength: 2.87,
  ownProgress: 2.87,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "Jenna's Dance",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "jennasdance|7FQRbf8gbKw8KZQZAJWxH2|172200",
  song: "song/paul-cardall-jennas-dance",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 5,
      externalId: "0BUxohfM2qWelR8tKW7XeB",
      externalLink: "https://open.spotify.com/track/0BUxohfM2qWelR8tKW7XeB",
    },
  ],
} as const satisfies Track
