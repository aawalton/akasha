import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassTheDream = {
  id: "01a0b4c8-608d-7c47-83ee-c237cab29641",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-the-dream",
  ownLength: 3.5822166666666666,
  ownProgress: 3.5822166666666666,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Dream",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thedream|7FQRbf8gbKw8KZQZAJWxH2|214933",
  song: "song/paul-cardall-the-dream",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 3,
      externalId: "6EDk8EPJ60RIg7YuWWQy7o",
      externalLink: "https://open.spotify.com/track/6EDk8EPJ60RIg7YuWWQy7o",
    },
  ],
} as const satisfies Track
