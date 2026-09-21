import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraExistForLoveRemixes = {
  id: "01a0676a-d71d-704e-be4c-3ebf780adff1",
  type: "page-type/release",
  slug: "aurora-exist-for-love-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2020-07-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0gRqP69J2rqJVmvIEhN9kb",
      externalLink: "https://open.spotify.com/album/0gRqP69J2rqJVmvIEhN9kb",
    },
  ],
  title: "Exist for Love (Remixes)",
} as const satisfies Release
