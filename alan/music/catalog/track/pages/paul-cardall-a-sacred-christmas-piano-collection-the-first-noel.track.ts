import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallASacredChristmasPianoCollectionTheFirstNoel = {
  id: "01a0b4c8-41da-7032-8558-77fedb991414",
  type: "page-type/track",
  slug: "paul-cardall-a-sacred-christmas-piano-collection-the-first-noel",
  ownLength: 2.7472,
  ownProgress: 2.7472,
  partOfCollections: ["release/paul-cardall-a-sacred-christmas-piano-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "The First Noel",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thefirstnoel|7FQRbf8gbKw8KZQZAJWxH2|164832",
  song: "song/paul-cardall-the-first-noel",
  carriedBy: [
    {
      release: "release/paul-cardall-a-sacred-christmas-piano-collection",
      discNumber: 1,
      position: 9,
      externalId: "4kGRP2a9RzSpbX5E2SkSo8",
      externalLink: "https://open.spotify.com/track/4kGRP2a9RzSpbX5E2SkSo8",
    },
  ],
} as const satisfies Track
