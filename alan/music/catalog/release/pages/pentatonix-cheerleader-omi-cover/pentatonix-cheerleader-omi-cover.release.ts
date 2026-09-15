import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixCheerleaderOmiCover = {
  id: "01a0676a-d71a-7026-8e89-19659200bd9d",
  type: "release",
  slug: "pentatonix-cheerleader-omi-cover",
  title: "Cheerleader (OMI Cover)",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 3.0511,
  ownProgress: 3.0511,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-08-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3UUJUvagu5gi0yuTF6Xvft",
      externalLink: "https://open.spotify.com/album/3UUJUvagu5gi0yuTF6Xvft",
    },
  ],
} as const satisfies Release
