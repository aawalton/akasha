import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2DeathByAThousandCutsLiveFromParis = {
  id: "01a0676a-d71b-7071-a635-8693081bd08a",
  type: "page-type/release",
  slug: "taylor-swift-2-death-by-a-thousand-cuts-live-from-paris",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-05-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5nDpkszadFMGW6ZSYM9Q1V",
      externalLink: "https://open.spotify.com/album/5nDpkszadFMGW6ZSYM9Q1V",
    },
  ],
  title: "Death By A Thousand Cuts (Live From Paris)",
} as const satisfies Release
