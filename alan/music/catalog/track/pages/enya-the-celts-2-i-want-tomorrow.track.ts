import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheCelts2IWantTomorrow = {
  id: "01a14a1d-db52-71ae-9493-8a7932c0bb16",
  type: "page-type/track",
  slug: "enya-the-celts-2-i-want-tomorrow",
  ownLength: 4.0371,
  ownProgress: 4.0371,
  partOfCollections: ["release/enya-the-celts-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Want Tomorrow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "iwanttomorrow|6uothxMWeLWIhsGeF7cyo4|242226",
  song: "song/enya-i-want-tomorrow",
  carriedBy: [
    {
      release: "release/enya-the-celts-2",
      discNumber: 1,
      position: 3,
      externalId: "6yNPs9VenWSor0wKBChVo3",
      externalLink: "https://open.spotify.com/track/6yNPs9VenWSor0wKBChVo3",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
