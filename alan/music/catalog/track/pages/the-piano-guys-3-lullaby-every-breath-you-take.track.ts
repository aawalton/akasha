import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyEveryBreathYouTake = {
  id: "01a0afa1-ddcd-7637-8595-8544012fc71c",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-every-breath-you-take",
  ownLength: 4.536833333333333,
  ownProgress: 4.536833333333333,
  partOfCollections: [
    "release/the-piano-guys-3-lullaby",
    "release/the-piano-guys-3-wedding-season",
    "release/the-piano-guys-autumn-on-piano",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Every Breath You Take",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "everybreathyoutake|0jW6R8CVyVohuUJVcuweDI|272210",
  song: "song/the-piano-guys-every-breath-you-take",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-lullaby",
      discNumber: 1,
      position: 5,
      externalId: "0LQd5wZco2ZMBnxhNl9Qbq",
      externalLink: "https://open.spotify.com/track/0LQd5wZco2ZMBnxhNl9Qbq",
    },
    {
      release: "release/the-piano-guys-3-wedding-season",
      discNumber: 1,
      position: 16,
      externalId: "6dfeSWND2e74EMSJI2Ract",
      externalLink: "https://open.spotify.com/track/6dfeSWND2e74EMSJI2Ract",
    },
    {
      release: "release/the-piano-guys-autumn-on-piano",
      discNumber: 1,
      position: 1,
      externalId: "5OvCeYiBG0maA4xyyIZ2YD",
      externalLink: "https://open.spotify.com/track/5OvCeYiBG0maA4xyyIZ2YD",
    },
  ],
} as const satisfies Track
