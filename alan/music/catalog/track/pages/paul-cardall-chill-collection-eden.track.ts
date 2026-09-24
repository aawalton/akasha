import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionEden = {
  id: "01a0b4c8-4591-721b-837d-5075ff862712",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-eden",
  ownLength: 3.4368333333333334,
  ownProgress: 3.4368333333333334,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Eden",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "eden|7FQRbf8gbKw8KZQZAJWxH2|206210",
  song: "song/paul-cardall-eden",
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 8,
      externalId: "5ca2Qm05YfC5C8dtH70qNI",
      externalLink: "https://open.spotify.com/track/5ca2Qm05YfC5C8dtH70qNI",
    },
  ],
} as const satisfies Track
