import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonHeatKokiriRemix = {
  id: "01a0676a-d720-7014-b20b-595908534dc7",
  type: "page-type/release",
  slug: "kelly-clarkson-heat-kokiri-remix",
  title: "Heat (Kokiri Remix)",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 3.131467,
  ownProgress: 3.131467,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-02-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Rc26yvVyDnUoJ0Pv1efjz",
      externalLink: "https://open.spotify.com/album/4Rc26yvVyDnUoJ0Pv1efjz",
      lastSyncedAt: "2026-02-13",
    },
  ],
} as const satisfies Release
