import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3AvatarTheTheme = {
  id: "01a0676a-d717-7041-afac-c5260d418ecc",
  type: "page-type/release",
  slug: "the-piano-guys-3-avatar-the-theme",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2019-06-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6owJynSJhOtUZU85CGndvN",
      externalLink: "https://open.spotify.com/album/6owJynSJhOtUZU85CGndvN",
    },
  ],
  title: "Avatar (The Theme)",
} as const satisfies Release
