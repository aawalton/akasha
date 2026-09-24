import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionEarlyMonday = {
  id: "01a0b4c8-4529-779f-94f1-4d5e4ab90728",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-early-monday",
  ownLength: 3.7424666666666666,
  ownProgress: 3.7424666666666666,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Early Monday",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "earlymonday|7FQRbf8gbKw8KZQZAJWxH2|224548",
  song: "song/paul-cardall-early-monday",
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 5,
      externalId: "0n0WKCk37T1mRILuaYIpWe",
      externalLink: "https://open.spotify.com/track/0n0WKCk37T1mRILuaYIpWe",
    },
  ],
} as const satisfies Track
