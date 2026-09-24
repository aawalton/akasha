import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsPioneerOrphans = {
  id: "01a0b4c8-1f39-7020-8e13-be7bc3399f4c",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-pioneer-orphans",
  ownLength: 3.929333333333333,
  ownProgress: 3.929333333333333,
  partOfCollections: ["release/paul-cardall-ancestors"],
  status: "completed",
  unit: "unit/minutes",
  title: "Pioneer Orphans",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "pioneerorphans|7FQRbf8gbKw8KZQZAJWxH2|235760",
  song: "song/paul-cardall-pioneer-orphans",
  carriedBy: [
    {
      release: "release/paul-cardall-ancestors",
      discNumber: 1,
      position: 8,
      externalId: "1WMvkzZUz4LO1ucxkeG5vK",
      externalLink: "https://open.spotify.com/track/1WMvkzZUz4LO1ucxkeG5vK",
    },
  ],
} as const satisfies Track
