import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverMyFuture = {
  id: "01a0b638-e40e-7f19-b4c6-9fa161357443",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-my-future",
  ownLength: 3.5000833333333334,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3YUMWmx8EJq0DurfuIwoGh",
      externalLink: "https://open.spotify.com/track/3YUMWmx8EJq0DurfuIwoGh",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "my future",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "myfuture|6qqNVTkY8uBg9cP3Jd7DAH|210005",
} as const satisfies Track
