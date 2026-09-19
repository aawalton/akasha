import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIHoldTight = {
  id: "01a0b111-2651-7799-935b-13f29ac9f0f9",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-i-hold-tight",
  ownLength: 2.9193333333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-singular-act-i"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "72DnQlaqdNhz9QJZXfYe6L",
      externalLink: "https://open.spotify.com/track/72DnQlaqdNhz9QJZXfYe6L",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Hold Tight",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "5PsYkefUonoeM9VCnpf5zd", artistName: "UHMEER" },
  ],
  trackKey: "holdtight|5PsYkefUonoeM9VCnpf5zd,74KM79TiuVKeVCqs8QtB0B|175160",
  song: "song/sabrina-carpenter-hold-tight",
} as const satisfies Track
