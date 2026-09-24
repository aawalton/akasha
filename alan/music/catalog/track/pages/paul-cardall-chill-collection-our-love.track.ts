import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionOurLove = {
  id: "01a0b4c8-467f-7c84-9e22-4fb69274611c",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-our-love",
  ownLength: 3.894416666666667,
  ownProgress: 3.894416666666667,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Our Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "ourlove|7FQRbf8gbKw8KZQZAJWxH2|233665",
  song: "song/paul-cardall-our-love",
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 15,
      externalId: "0WXm5VYbzc3kaoo2jlSRfP",
      externalLink: "https://open.spotify.com/track/0WXm5VYbzc3kaoo2jlSRfP",
    },
  ],
} as const satisfies Track
