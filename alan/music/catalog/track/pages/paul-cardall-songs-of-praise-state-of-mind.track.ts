import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseStateOfMind = {
  id: "01a0b4c8-5287-7bdb-bfa6-51e0e9f399fe",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-state-of-mind",
  ownLength: 4.230216666666666,
  ownProgress: 4.230216666666666,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  status: "completed",
  unit: "unit/minutes",
  title: "State of Mind",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "stateofmind|7FQRbf8gbKw8KZQZAJWxH2|253813",
  song: "song/paul-cardall-state-of-mind",
  carriedBy: [
    {
      release: "release/paul-cardall-songs-of-praise",
      discNumber: 1,
      position: 11,
      externalId: "5XfLClx1ygKz4v940yDpWs",
      externalLink: "https://open.spotify.com/track/5XfLClx1ygKz4v940yDpWs",
    },
  ],
} as const satisfies Track
