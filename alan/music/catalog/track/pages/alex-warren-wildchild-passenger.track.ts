import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexWarrenWildchildPassenger = {
  id: "01a144f7-5600-7097-a20a-00652f17337f",
  type: "page-type/track",
  slug: "alex-warren-wildchild-passenger",
  ownLength: 2.66285,
  ownProgress: 0,
  partOfCollections: ["release/alex-warren-wildchild", "release/alex-warren-passenger"],
  status: "not-started",
  unit: "unit/minutes",
  title: "PASSENGER",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/alex-warren" }],
  trackKey: "passenger|0fTSzq9jAh4c36UVb4V7CB|159771",
  song: "song/alex-warren-passenger",
  carriedBy: [
    {
      release: "release/alex-warren-passenger",
      discNumber: 1,
      position: 1,
      externalId: "5Zv2Icw3vKuzQXZRhgmXkH",
      externalLink: "https://open.spotify.com/track/5Zv2Icw3vKuzQXZRhgmXkH",
    },
    {
      release: "release/alex-warren-wildchild",
      discNumber: 1,
      position: 3,
      externalId: "4BSeso8HRRJVQzYdKi1YOX",
      externalLink: "https://open.spotify.com/track/4BSeso8HRRJVQzYdKi1YOX",
    },
  ],
  createdAt: "2026-10-16T13:47:02.519Z",
  updatedAt: "2026-10-16T13:47:02.519Z",
} as const satisfies Track
