import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassTheDream = {
  id: "01a0b4c8-608d-7c47-83ee-c237cab29641",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-the-dream",
  ownLength: 3.5822166666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6EDk8EPJ60RIg7YuWWQy7o",
      externalLink: "https://open.spotify.com/track/6EDk8EPJ60RIg7YuWWQy7o",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Dream",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thedream|7FQRbf8gbKw8KZQZAJWxH2|214933",
} as const satisfies Track
