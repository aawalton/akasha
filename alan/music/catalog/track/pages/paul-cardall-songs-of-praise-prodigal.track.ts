import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseProdigal = {
  id: "01a0b4c8-520b-7847-bf08-27338e20874b",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-prodigal",
  ownLength: 5.022433333333334,
  ownProgress: 5.022433333333334,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  status: "completed",
  unit: "unit/minutes",
  title: "Prodigal",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "prodigal|7FQRbf8gbKw8KZQZAJWxH2|301346",
  song: "song/paul-cardall-prodigal",
  carriedBy: [
    {
      release: "release/paul-cardall-songs-of-praise",
      discNumber: 1,
      position: 8,
      externalId: "0BpCQv9S9ofb0pvQGZ5Rc1",
      externalLink: "https://open.spotify.com/track/0BpCQv9S9ofb0pvQGZ5Rc1",
    },
  ],
} as const satisfies Track
