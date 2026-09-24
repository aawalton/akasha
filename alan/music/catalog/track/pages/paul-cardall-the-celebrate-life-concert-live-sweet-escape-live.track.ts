import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveSweetEscapeLive = {
  id: "01a0b4c8-4359-709f-8241-3a702c932f0f",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-sweet-escape-live",
  ownLength: 3.1852,
  ownProgress: 3.1852,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweet Escape - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "sweetescapelive|7FQRbf8gbKw8KZQZAJWxH2|191112",
  song: "song/paul-cardall-sweet-escape",
  carriedBy: [
    {
      release: "release/paul-cardall-the-celebrate-life-concert-live",
      discNumber: 1,
      position: 8,
      externalId: "7tNciXYhJ8cCJ39TNQIwwU",
      externalLink: "https://open.spotify.com/track/7tNciXYhJ8cCJ39TNQIwwU",
    },
  ],
} as const satisfies Track
