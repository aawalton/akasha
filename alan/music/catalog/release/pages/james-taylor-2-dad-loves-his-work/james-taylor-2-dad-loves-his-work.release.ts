import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2DadLovesHisWork = {
  id: "01a0676a-d71b-704a-ac44-8fe01820d76f",
  type: "page-type/release",
  slug: "james-taylor-2-dad-loves-his-work",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "1981-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2MDPMawWYx0T4FjdZWCU6f",
      externalLink: "https://open.spotify.com/album/2MDPMawWYx0T4FjdZWCU6f",
    },
  ],
  title: "Dad Loves His Work",
} as const satisfies Release
