import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeAlrightTheSanctuaryRemixToBeAlrightTheSanctuaryRemix = {
  id: "01a0b637-ffbe-7b9a-b623-237231ee5622",
  type: "page-type/track",
  slug: "aurora-to-be-alright-the-sanctuary-remix-to-be-alright-the-sanctuary-remix",
  ownLength: 3.77415,
  ownProgress: 0,
  partOfCollections: ["release/aurora-to-be-alright-the-sanctuary-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4K09m6T7nrlYMTuXWxqCCu",
      externalLink: "https://open.spotify.com/track/4K09m6T7nrlYMTuXWxqCCu",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "To Be Alright - The Sanctuary Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "3c7DW1zmCGBdgHy8HllzV2", artistName: "The Sanctuary" },
  ],
  trackKey: "tobealrightthesanctuaryremix|1WgXqy2Dd70QQOU7Ay074N,3c7DW1zmCGBdgHy8HllzV2|226449",
  song: "song/aurora-to-be-alright",
} as const satisfies Track
