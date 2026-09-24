import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresSomethingJustLikeThisLiveInBuenosAires = {
  id: "01a0b9ee-d466-73bd-a9e7-ef69312187c1",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-something-just-like-this-live-in-buenos-aires",
  ownLength: 4.070666666666667,
  ownProgress: 4.070666666666667,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "Something Just like This - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "somethingjustlikethisliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|244240",
  song: "song/coldplay-something-just-like-this",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 21,
      externalId: "0hreO9tj5yiYftUuVThaea",
      externalLink: "https://open.spotify.com/track/0hreO9tj5yiYftUuVThaea",
    },
  ],
} as const satisfies Track
