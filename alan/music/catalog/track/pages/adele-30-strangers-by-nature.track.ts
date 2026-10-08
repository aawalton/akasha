import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele30StrangersByNature = {
  id: "01a0d52b-c25a-783c-9b81-b65198bc27fd",
  type: "page-type/track",
  slug: "adele-30-strangers-by-nature",
  ownLength: 3.03605,
  ownProgress: 3.03605,
  partOfCollections: ["release/adele-30"],
  status: "completed",
  unit: "unit/minutes",
  title: "Strangers By Nature",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "strangersbynature|4dpARuHxo51G3z768sgnrY|182163",
  song: "song/adele-strangers-by-nature",
  carriedBy: [
    {
      release: "release/adele-30",
      discNumber: 1,
      position: 1,
      externalId: "13CVSGLSFl4UxpDVR6u3dq",
      externalLink: "https://open.spotify.com/track/13CVSGLSFl4UxpDVR6u3dq",
    },
  ],
  createdAt: "2026-09-24T20:46:49.946Z",
  updatedAt: "2026-09-24T21:00:26.000Z",
} as const satisfies Track
