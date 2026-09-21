import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsExpandedEditionSuperDeluxeUnderdog = {
  id: "01a0c43f-bb27-710a-9722-1b12a1948b23",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-expanded-edition-super-deluxe-underdog",
  ownLength: 3.490666666666667,
  ownProgress: 3.490666666666667,
  partOfCollections: ["release/imagine-dragons-night-visions-expanded-edition-super-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2HVRUK7BKcJRND962eDMwK",
      externalLink: "https://open.spotify.com/track/2HVRUK7BKcJRND962eDMwK",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Underdog",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "underdog|53XhwfbYqKCa1cC15pYq2q|209440",
  song: "song/imagine-dragons-underdog",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions-expanded-edition-super-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "2HVRUK7BKcJRND962eDMwK",
      externalLink: "https://open.spotify.com/track/2HVRUK7BKcJRND962eDMwK",
    },
  ],
} as const satisfies Track
