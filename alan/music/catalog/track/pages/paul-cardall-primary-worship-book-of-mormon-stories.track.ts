import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPrimaryWorshipBookOfMormonStories = {
  id: "01a0b4c8-5696-7f44-98df-e1bc30422563",
  type: "page-type/track",
  slug: "paul-cardall-primary-worship-book-of-mormon-stories",
  ownLength: 6.788883333333334,
  ownProgress: 6.788883333333334,
  partOfCollections: ["release/paul-cardall-primary-worship"],
  status: "completed",
  unit: "unit/minutes",
  title: "Book of Mormon Stories",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "bookofmormonstories|7FQRbf8gbKw8KZQZAJWxH2|407333",
  song: "song/paul-cardall-book-of-mormon-stories",
  carriedBy: [
    {
      release: "release/paul-cardall-primary-worship",
      discNumber: 1,
      position: 8,
      externalId: "55taYRw24dlfSN7MU7ErH2",
      externalLink: "https://open.spotify.com/track/55taYRw24dlfSN7MU7ErH2",
    },
  ],
} as const satisfies Track
