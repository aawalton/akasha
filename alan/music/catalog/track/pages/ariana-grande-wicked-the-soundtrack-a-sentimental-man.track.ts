import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackASentimentalMan = {
  id: "01a0a6c5-4d03-7443-804d-4ccb61f5fbd0",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-a-sentimental-man",
  ownLength: 2.21035,
  ownProgress: 2.21035,
  partOfCollections: [
    "release/ariana-grande-wicked-the-soundtrack",
    "release/ariana-grande-wicked-the-soundtrack-commentary",
    "release/musical-theater-wicked-the-soundtrack",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "A Sentimental Man",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jeff-goldblum" }],
  trackKey: "asentimentalman|0O1n2TpXR4XizmHi7aY0l8|132621",
  song: "song/ariana-grande-a-sentimental-man",
  carriedBy: [
    {
      release: "release/ariana-grande-wicked-the-soundtrack",
      discNumber: 1,
      position: 10,
      externalId: "7nj1vXAUfwiojuj0tNrEbp",
      externalLink: "https://open.spotify.com/track/7nj1vXAUfwiojuj0tNrEbp",
    },
    {
      release: "release/ariana-grande-wicked-the-soundtrack-commentary",
      discNumber: 1,
      position: 21,
      externalId: "4w2RjYBQrzWwK2W8rov3fk",
      externalLink: "https://open.spotify.com/track/4w2RjYBQrzWwK2W8rov3fk",
    },
    {
      release: "release/musical-theater-wicked-the-soundtrack",
      discNumber: 1,
      position: 10,
      externalId: "2Nox49biysRuKoIaDWMemm",
      externalLink: "https://open.spotify.com/track/2Nox49biysRuKoIaDWMemm",
    },
  ],
} as const satisfies Track
