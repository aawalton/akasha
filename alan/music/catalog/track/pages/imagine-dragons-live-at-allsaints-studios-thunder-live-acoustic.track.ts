import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLiveAtAllsaintsStudiosThunderLiveAcoustic = {
  id: "01a0c43f-dda5-776f-82b7-4b590666a9c5",
  type: "page-type/track",
  slug: "imagine-dragons-live-at-allsaints-studios-thunder-live-acoustic",
  ownLength: 3.566666666666667,
  ownProgress: 3.566666666666667,
  partOfCollections: ["release/imagine-dragons-live-at-allsaints-studios"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2mZrKpdrNUA4oZJWzTunqZ",
      externalLink: "https://open.spotify.com/track/2mZrKpdrNUA4oZJWzTunqZ",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Thunder - Live/Acoustic",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "thunderliveacoustic|53XhwfbYqKCa1cC15pYq2q|214000",
  song: "song/imagine-dragons-thunder",
  carriedBy: [
    {
      release: "release/imagine-dragons-live-at-allsaints-studios",
      discNumber: 1,
      position: 1,
      externalId: "2mZrKpdrNUA4oZJWzTunqZ",
      externalLink: "https://open.spotify.com/track/2mZrKpdrNUA4oZJWzTunqZ",
    },
  ],
} as const satisfies Track
