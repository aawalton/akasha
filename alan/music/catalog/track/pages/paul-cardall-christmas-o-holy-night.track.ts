import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasOHolyNight = {
  id: "01a0b4c8-3495-7b15-8e75-3b8da89daeaf",
  type: "page-type/track",
  slug: "paul-cardall-christmas-o-holy-night",
  ownLength: 7.13135,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "50YWeUtsdF8sc5sijyZ6Gi",
      externalLink: "https://open.spotify.com/track/50YWeUtsdF8sc5sijyZ6Gi",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "O Holy Night",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" },
    { externalId: "3qfrrrSO7utFdJkM2tvMRb", artistName: "CeCe Winans" },
  ],
  trackKey: "oholynight|3qfrrrSO7utFdJkM2tvMRb,7FQRbf8gbKw8KZQZAJWxH2|427881",
  song: "song/paul-cardall-o-holy-night",
} as const satisfies Track
