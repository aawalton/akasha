import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const weirdAlYankovic2PoodleHat = {
  id: "01a0676a-d727-7004-b382-9acad1fae10c",
  type: "page-type/release",
  slug: "weird-al-yankovic-2-poodle-hat",
  title: "Poodle Hat",
  partOfCollections: ["artist/weird-al-yankovic"],
  position: 0,
  ownLength: 54.7006,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-05-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4VzAwj9nYwEqjY6JLaTwCm",
      externalLink: "https://open.spotify.com/album/4VzAwj9nYwEqjY6JLaTwCm",
    },
  ],
} as const satisfies Release
