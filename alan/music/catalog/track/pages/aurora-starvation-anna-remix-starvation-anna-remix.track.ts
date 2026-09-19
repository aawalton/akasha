import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraStarvationAnnaRemixStarvationAnnaRemix = {
  id: "01a0b637-ff97-78c8-ad72-12890d74699a",
  type: "page-type/track",
  slug: "aurora-starvation-anna-remix-starvation-anna-remix",
  ownLength: 3.5664333333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-starvation-anna-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7jUSeUGV45yIv4DriLMlNV",
      externalLink: "https://open.spotify.com/track/7jUSeUGV45yIv4DriLMlNV",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Starvation (ANNA Remix)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "3wkaDi2HJV3eCaBJ4iH6om", artistName: "ANNA" },
  ],
  trackKey: "starvationannaremix|1WgXqy2Dd70QQOU7Ay074N,3wkaDi2HJV3eCaBJ4iH6om|213986",
  song: "song/aurora-starvation",
} as const satisfies Track
