import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele30StrangersByNature = {
  id: "01a0d52b-c25a-783c-9b81-b65198bc27fd",
  type: "page-type/track",
  slug: "adele-30-strangers-by-nature",
  ownLength: 3.03605,
  ownProgress: 0,
  partOfCollections: ["release/adele-30"],
  status: "not-started",
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
} as const satisfies Track
