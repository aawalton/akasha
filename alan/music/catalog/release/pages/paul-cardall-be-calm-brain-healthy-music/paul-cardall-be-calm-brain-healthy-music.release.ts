import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallBeCalmBrainHealthyMusic = {
  id: "01a0676a-d718-701b-a127-d7532ebee44c",
  type: "page-type/release",
  slug: "paul-cardall-be-calm-brain-healthy-music",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2014-03-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1tNQPyt62C3OmZqkxHZ5Hp",
      externalLink: "https://open.spotify.com/album/1tNQPyt62C3OmZqkxHZ5Hp",
    },
  ],
  title: "Be Calm: Brain Healthy Music",
} as const satisfies Release
