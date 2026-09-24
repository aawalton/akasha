import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoOnMyWayHome = {
  id: "01a0b4c8-31e4-7878-826b-4b0ead1b4061",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-on-my-way-home",
  ownLength: 3.864,
  ownProgress: 3.864,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "On My Way Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "onmywayhome|7FQRbf8gbKw8KZQZAJWxH2|231840",
  song: "song/paul-cardall-on-my-way-home",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 5,
      externalId: "6vxYsKo97A6jXyAHwNV61x",
      externalLink: "https://open.spotify.com/track/6vxYsKo97A6jXyAHwNV61x",
    },
  ],
} as const satisfies Track
