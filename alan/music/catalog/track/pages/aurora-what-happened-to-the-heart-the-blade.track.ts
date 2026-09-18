import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartTheBlade = {
  id: "01a0b637-f09c-7266-8615-e69013e0d5ec",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-the-blade",
  ownLength: 4.55355,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5fe1NA1aVk79oV6R5mSxHI",
      externalLink: "https://open.spotify.com/track/5fe1NA1aVk79oV6R5mSxHI",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Blade",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theblade|1WgXqy2Dd70QQOU7Ay074N|273213",
} as const satisfies Track
