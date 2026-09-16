import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SoloYoullBeInMyHeart = {
  id: "01a0abea-6b37-792e-9e42-366b3a8f7bee",
  type: "page-type/track",
  slug: "celtic-woman-2-solo-youll-be-in-my-heart",
  ownLength: 3.99175,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-solo"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2OGJRbX3ZrO5w5gpUUEJ2Y",
      externalLink: "https://open.spotify.com/track/2OGJRbX3ZrO5w5gpUUEJ2Y",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "You'll Be in My Heart",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0BPyH0yYOcGiI6MzXi8lRZ", artistName: "Alex" }],
  trackKey: "youllbeinmyheart|0BPyH0yYOcGiI6MzXi8lRZ|239505",
} as const satisfies Track
