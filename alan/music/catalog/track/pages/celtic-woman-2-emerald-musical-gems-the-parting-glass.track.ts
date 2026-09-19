import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2EmeraldMusicalGemsThePartingGlass = {
  id: "01a0abea-6cc7-76a2-8ce0-6b997eaca10a",
  type: "page-type/track",
  slug: "celtic-woman-2-emerald-musical-gems-the-parting-glass",
  ownLength: 4.287983333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-emerald-musical-gems"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2UsF8l6DQFj2i0dFjNnoBL",
      externalLink: "https://open.spotify.com/track/2UsF8l6DQFj2i0dFjNnoBL",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Parting Glass",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thepartingglass|6NWtt9pNOL2Gx7kBykdE5x|257279",
  song: "song/celtic-woman-the-parting-glass",
} as const satisfies Track
