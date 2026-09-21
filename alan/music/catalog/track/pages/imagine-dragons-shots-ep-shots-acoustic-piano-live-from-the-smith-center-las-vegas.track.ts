import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsShotsEpShotsAcousticPianoLiveFromTheSmithCenterLasVegas = {
  id: "01a0c43f-e01a-7d45-9cbf-75f22f725e91",
  type: "page-type/track",
  slug: "imagine-dragons-shots-ep-shots-acoustic-piano-live-from-the-smith-center-las-vegas",
  ownLength: 4.361766666666667,
  ownProgress: 4.361766666666667,
  partOfCollections: ["release/imagine-dragons-shots-ep"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2rO73AKiqSQef9hvYkOKB1",
      externalLink: "https://open.spotify.com/track/2rO73AKiqSQef9hvYkOKB1",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Shots - Acoustic (Piano) / Live From The Smith Center / Las Vegas",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" },
    { externalId: "3836OTICMPjhTMMcpPw4EC", artistName: "Broiler" },
  ],
  trackKey:
    "shotsacousticpianolivefromthesmithcenterlasvegas|3836OTICMPjhTMMcpPw4EC,53XhwfbYqKCa1cC15pYq2q|261706",
  song: "song/imagine-dragons-shots",
  carriedBy: [
    {
      release: "release/imagine-dragons-shots-ep",
      discNumber: 1,
      position: 3,
      externalId: "2rO73AKiqSQef9hvYkOKB1",
      externalLink: "https://open.spotify.com/track/2rO73AKiqSQef9hvYkOKB1",
    },
  ],
} as const satisfies Track
