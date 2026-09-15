import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaUnderTheMilkyWayUnderTheMilkyWay = {
  id: "01a0a59c-3d14-7640-bae2-eef208d270d8",
  type: "page-type/track",
  slug: "sia-under-the-milky-way-under-the-milky-way",
  ownLength: 3.58155,
  ownProgress: 0,
  partOfCollections: ["release/sia-under-the-milky-way"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4W62BliXdCXOSW6Ec9GWbO",
      externalLink: "https://open.spotify.com/track/4W62BliXdCXOSW6Ec9GWbO",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Under the Milky Way",
} as const satisfies Track
