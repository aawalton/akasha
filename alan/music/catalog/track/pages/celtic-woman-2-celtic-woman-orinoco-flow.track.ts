import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanOrinocoFlow = {
  id: "01a0abea-7920-7201-aa70-0ddbb3cdfdc5",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-orinoco-flow",
  ownLength: 3.5394833333333335,
  ownProgress: 3.5394833333333335,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "77Fx1HtDox0xmvmvL23arD",
      externalLink: "https://open.spotify.com/track/77Fx1HtDox0xmvmvL23arD",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Orinoco Flow",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "orinocoflow|6NWtt9pNOL2Gx7kBykdE5x|212369",
  song: "song/celtic-woman-orinoco-flow",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celtic-woman",
      discNumber: 1,
      position: 9,
      externalId: "77Fx1HtDox0xmvmvL23arD",
      externalLink: "https://open.spotify.com/track/77Fx1HtDox0xmvmvL23arD",
    },
  ],
} as const satisfies Track
