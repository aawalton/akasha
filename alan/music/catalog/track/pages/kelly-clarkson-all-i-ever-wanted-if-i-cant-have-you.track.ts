import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonAllIEverWantedIfICantHaveYou = {
  id: "01a0a5ae-c840-7968-9a07-41de2b87f35b",
  type: "track",
  slug: "kelly-clarkson-all-i-ever-wanted-if-i-cant-have-you",
  ownLength: 3.65355,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-all-i-ever-wanted"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6W8VktzOUZNlOdTMaeLuxv",
      externalLink: "https://open.spotify.com/track/6W8VktzOUZNlOdTMaeLuxv",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "If I Can't Have You",
} as const satisfies Track
