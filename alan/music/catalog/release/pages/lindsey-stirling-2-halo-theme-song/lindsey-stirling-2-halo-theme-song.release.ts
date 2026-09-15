import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lindseyStirling2HaloThemeSong = {
  id: "01a0676a-d71f-7040-8b22-068d7319682b",
  type: "page-type/release",
  slug: "lindsey-stirling-2-halo-theme-song",
  title: "Halo Theme Song",
  partOfCollections: ["artist/lindsey-stirling"],
  position: 0,
  ownLength: 3.938883,
  ownProgress: 3.938883,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-05-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1yvJE1JJ33MQqnnKQeLrda",
      externalLink: "https://open.spotify.com/album/1yvJE1JJ33MQqnnKQeLrda",
    },
  ],
} as const satisfies Release
