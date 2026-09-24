import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SoloYoullBeInMyHeart = {
  id: "01a0abea-6b37-792e-9e42-366b3a8f7bee",
  type: "page-type/track",
  slug: "celtic-woman-2-solo-youll-be-in-my-heart",
  ownLength: 3.99175,
  ownProgress: 3.99175,
  partOfCollections: ["release/celtic-woman-2-solo"],
  status: "completed",
  unit: "unit/minutes",
  title: "You'll Be in My Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Alex" }],
  trackKey: "youllbeinmyheart|0BPyH0yYOcGiI6MzXi8lRZ|239505",
  song: "song/celtic-woman-youll-be-in-my-heart",
  carriedBy: [
    {
      release: "release/celtic-woman-2-solo",
      discNumber: 1,
      position: 9,
      externalId: "2OGJRbX3ZrO5w5gpUUEJ2Y",
      externalLink: "https://open.spotify.com/track/2OGJRbX3ZrO5w5gpUUEJ2Y",
    },
  ],
} as const satisfies Track
