import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoOnMyWayHome = {
  id: "01a0b4c8-31e4-7878-826b-4b0ead1b4061",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-on-my-way-home",
  ownLength: 3.864,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6vxYsKo97A6jXyAHwNV61x",
      externalLink: "https://open.spotify.com/track/6vxYsKo97A6jXyAHwNV61x",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "On My Way Home",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "onmywayhome|7FQRbf8gbKw8KZQZAJWxH2|231840",
  song: "song/paul-cardall-on-my-way-home",
} as const satisfies Track
