import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansEbudae = {
  id: "01a14a1d-db4e-75f2-9986-9c033be04a5a",
  type: "page-type/track",
  slug: "enya-oceans-ebudae",
  ownLength: 1.936,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Ebudae",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "ebudae|6uothxMWeLWIhsGeF7cyo4|116160",
  song: "song/enya-ebudae",
  carriedBy: [
    {
      release: "release/enya-oceans",
      discNumber: 1,
      position: 13,
      externalId: "4IkXBv0hicd8Jw1d2hiI5v",
      externalLink: "https://open.spotify.com/track/4IkXBv0hicd8Jw1d2hiI5v",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
