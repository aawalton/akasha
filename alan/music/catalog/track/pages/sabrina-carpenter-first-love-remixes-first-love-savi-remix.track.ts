import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFirstLoveRemixesFirstLoveSaviRemix = {
  id: "01a0b111-322e-739c-8714-e5c8b47579ee",
  type: "page-type/track",
  slug: "sabrina-carpenter-first-love-remixes-first-love-savi-remix",
  ownLength: 3.4166666666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-first-love-remixes"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1TMmQ5JK4EewfiIAISLpzl",
      externalLink: "https://open.spotify.com/track/1TMmQ5JK4EewfiIAISLpzl",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "First Love - SAVI Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3hyEbRtp617pNCuuQjyOmc", artistName: "Lost Kings" },
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "1H72fTOUAUl0WQ4kH5DPVW", artistName: "SAVI" },
  ],
  trackKey:
    "firstlovesaviremix|1H72fTOUAUl0WQ4kH5DPVW,3hyEbRtp617pNCuuQjyOmc,74KM79TiuVKeVCqs8QtB0B|205000",
  song: "song/sabrina-carpenter-first-love",
} as const satisfies Track
