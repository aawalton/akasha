import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverMyFuture = {
  id: "01a0b638-e40e-7f19-b4c6-9fa161357443",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-my-future",
  ownLength: 3.5000833333333334,
  ownProgress: 3.5000833333333334,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "my future",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "myfuture|6qqNVTkY8uBg9cP3Jd7DAH|210005",
  song: "song/billie-eilish-my-future",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 4,
      externalId: "3YUMWmx8EJq0DurfuIwoGh",
      externalLink: "https://open.spotify.com/track/3YUMWmx8EJq0DurfuIwoGh",
    },
  ],
} as const satisfies Track
