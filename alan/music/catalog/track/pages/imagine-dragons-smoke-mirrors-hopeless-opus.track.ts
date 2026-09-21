import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsHopelessOpus = {
  id: "01a0c43f-d407-77d5-810d-05f2032098e6",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-hopeless-opus",
  ownLength: 3.98,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "46dszOgLrnBSqbo6Vkc91Q",
      externalLink: "https://open.spotify.com/track/46dszOgLrnBSqbo6Vkc91Q",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Hopeless Opus",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "hopelessopus|53XhwfbYqKCa1cC15pYq2q|238800",
  song: "song/imagine-dragons-hopeless-opus",
} as const satisfies Track
