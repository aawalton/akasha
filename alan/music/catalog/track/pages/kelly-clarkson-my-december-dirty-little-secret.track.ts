import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberDirtyLittleSecret = {
  id: "01a0a5ae-cad0-7d24-826c-3b030c26591b",
  type: "track",
  slug: "kelly-clarkson-my-december-dirty-little-secret",
  ownLength: 3.5444333333333335,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6X4RGpNKxOoDPo6eFl1879",
      externalLink: "https://open.spotify.com/track/6X4RGpNKxOoDPo6eFl1879",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Dirty Little Secret",
} as const satisfies Track
