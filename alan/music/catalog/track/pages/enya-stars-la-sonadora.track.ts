import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsLaSonadora = {
  id: "01a14a1d-db51-75cb-b498-664a204f9965",
  type: "page-type/track",
  slug: "enya-stars-la-sonadora",
  ownLength: 3.576,
  ownProgress: 3.576,
  partOfCollections: ["release/enya-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "La Soñadora",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "lasonadora|6uothxMWeLWIhsGeF7cyo4|214560",
  song: "song/enya-la-sonadora",
  carriedBy: [
    {
      release: "release/enya-stars",
      discNumber: 1,
      position: 5,
      externalId: "33dcd2jXvei3noJeGGrwxm",
      externalLink: "https://open.spotify.com/track/33dcd2jXvei3noJeGGrwxm",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
