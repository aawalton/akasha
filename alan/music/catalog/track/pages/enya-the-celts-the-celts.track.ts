import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheCeltsTheCelts = {
  id: "01a14a1d-db53-7e6b-8f66-cd9a929efb36",
  type: "page-type/track",
  slug: "enya-the-celts-the-celts",
  ownLength: 2.966666666666667,
  ownProgress: 2.966666666666667,
  partOfCollections: ["release/enya-the-celts"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Celts",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "thecelts|6uothxMWeLWIhsGeF7cyo4|178000",
  song: "song/enya-the-celts",
  carriedBy: [
    {
      release: "release/enya-the-celts",
      discNumber: 1,
      position: 1,
      externalId: "7BVJeVGFZdN7blBsSu3fUP",
      externalLink: "https://open.spotify.com/track/7BVJeVGFZdN7blBsSu3fUP",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
