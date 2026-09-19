import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeFaithsSong = {
  id: "01a0abea-59e0-7da4-9211-9bf68f412d18",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-faiths-song",
  ownLength: 4.05555,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Ds7wfGUQwrQQ959Seu40N",
      externalLink: "https://open.spotify.com/track/3Ds7wfGUQwrQQ959Seu40N",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Faith’s Song",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "faithssong|6NWtt9pNOL2Gx7kBykdE5x|243333",
  song: "song/celtic-woman-faiths-song",
} as const satisfies Track
