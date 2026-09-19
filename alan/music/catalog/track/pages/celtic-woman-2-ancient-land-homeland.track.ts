import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandHomeland = {
  id: "01a0abea-5be4-7ca9-91d6-de9be12b43be",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-homeland",
  ownLength: 4.318216666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "23xOnIHs7RDvNuBS7ztciZ",
      externalLink: "https://open.spotify.com/track/23xOnIHs7RDvNuBS7ztciZ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Homeland",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "homeland|6NWtt9pNOL2Gx7kBykdE5x|259093",
  song: "song/celtic-woman-homeland",
} as const satisfies Track
