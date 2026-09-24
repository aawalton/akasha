import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdPedestalPedestal = {
  id: "01a0d3ab-b69f-7866-8f93-cb896412c1b3",
  type: "page-type/track",
  slug: "em-beihold-pedestal-pedestal",
  ownLength: 3.1925833333333333,
  ownProgress: 0,
  partOfCollections: ["release/em-beihold-pedestal"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Pedestal",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7o2ZQYM7nTsaVdkXY38UAA", artistName: "Em Beihold" }],
  trackKey: "pedestal|7o2ZQYM7nTsaVdkXY38UAA|191555",
  song: "song/em-beihold-pedestal",
  carriedBy: [
    {
      release: "release/em-beihold-pedestal",
      discNumber: 1,
      position: 1,
      externalId: "3C8Z6rLzMjQiDSkZxpRHxV",
      externalLink: "https://open.spotify.com/track/3C8Z6rLzMjQiDSkZxpRHxV",
    },
  ],
} as const satisfies Track
