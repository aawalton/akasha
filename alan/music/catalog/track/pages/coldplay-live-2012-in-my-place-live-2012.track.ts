import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012InMyPlaceLive2012 = {
  id: "01a0b9ee-d9d0-74f7-9eae-552d90a45f24",
  type: "page-type/track",
  slug: "coldplay-live-2012-in-my-place-live-2012",
  ownLength: 3.9217666666666666,
  ownProgress: 3.9217666666666666,
  partOfCollections: ["release/coldplay-live-2012"],
  status: "completed",
  unit: "unit/minutes",
  title: "In My Place - Live 2012",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "inmyplacelive2012|4gzpq5DPGxSnKTe4SA8HAU|235306",
  song: "song/coldplay-in-my-place",
  carriedBy: [
    {
      release: "release/coldplay-live-2012",
      discNumber: 1,
      position: 3,
      externalId: "5OOloRWmvXZG3aQaeWjDNN",
      externalLink: "https://open.spotify.com/track/5OOloRWmvXZG3aQaeWjDNN",
    },
  ],
} as const satisfies Track
