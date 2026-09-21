import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeImSoSorry = {
  id: "01a0c43f-cf7e-7020-a2b0-391e583218c9",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-im-so-sorry",
  ownLength: 3.8371,
  ownProgress: 3.8371,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "68hC01gNja5yqY5JCkV82E",
      externalLink: "https://open.spotify.com/track/68hC01gNja5yqY5JCkV82E",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "I’m So Sorry",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "imsosorry|53XhwfbYqKCa1cC15pYq2q|230226",
  song: "song/imagine-dragons-i-m-so-sorry",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "68hC01gNja5yqY5JCkV82E",
      externalLink: "https://open.spotify.com/track/68hC01gNja5yqY5JCkV82E",
    },
  ],
} as const satisfies Track
