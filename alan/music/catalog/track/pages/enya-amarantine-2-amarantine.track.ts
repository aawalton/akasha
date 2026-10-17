import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaAmarantine2Amarantine = {
  id: "01a14a1d-db47-7b71-86f5-8dabf30298e2",
  type: "page-type/track",
  slug: "enya-amarantine-2-amarantine",
  ownLength: 3.17555,
  ownProgress: 0,
  partOfCollections: ["release/enya-amarantine-2", "release/enya-amarantine-christmas-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Amarantine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "amarantine|6uothxMWeLWIhsGeF7cyo4|190533",
  song: "song/enya-amarantine",
  carriedBy: [
    {
      release: "release/enya-amarantine-2",
      discNumber: 1,
      position: 2,
      externalId: "0VmzazQQ0Mo1vJldr5NxTW",
      externalLink: "https://open.spotify.com/track/0VmzazQQ0Mo1vJldr5NxTW",
    },
    {
      release: "release/enya-amarantine-christmas-edition",
      discNumber: 1,
      position: 2,
      externalId: "5zzr84iUlFqvCFMQBmSZ34",
      externalLink: "https://open.spotify.com/track/5zzr84iUlFqvCFMQBmSZ34",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
