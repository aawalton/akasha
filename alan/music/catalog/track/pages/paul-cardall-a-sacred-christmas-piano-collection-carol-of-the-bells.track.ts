import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallASacredChristmasPianoCollectionCarolOfTheBells = {
  id: "01a0b4c8-4175-7048-86fd-a737ea1efd4a",
  type: "page-type/track",
  slug: "paul-cardall-a-sacred-christmas-piano-collection-carol-of-the-bells",
  ownLength: 5.410383333333334,
  ownProgress: 5.410383333333334,
  partOfCollections: ["release/paul-cardall-a-sacred-christmas-piano-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Carol of the Bells",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "carolofthebells|7FQRbf8gbKw8KZQZAJWxH2|324623",
  song: "song/paul-cardall-carol-of-the-bells",
  carriedBy: [
    {
      release: "release/paul-cardall-a-sacred-christmas-piano-collection",
      discNumber: 1,
      position: 6,
      externalId: "7obd1S9jLZXy5dYxurctD1",
      externalLink: "https://open.spotify.com/track/7obd1S9jLZXy5dYxurctD1",
    },
  ],
} as const satisfies Track
