import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedOneWonderfulNightLiveTheSoundtrackTheWizardAndILiveFromTheDolby = {
  id: "01a0a6c5-0c4d-71fa-b330-0eb9857b0430",
  type: "page-type/track",
  slug: "ariana-grande-wicked-one-wonderful-night-live-the-soundtrack-the-wizard-and-i-live-from-the-dolby",
  ownLength: 5.883583333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-one-wonderful-night-live-the-soundtrack"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "77FVwIjrWlgLEVacsARg3Q",
      externalLink: "https://open.spotify.com/track/77FVwIjrWlgLEVacsARg3Q",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Wizard And I - Live from the Dolby Theatre",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "46UMQ0cW8ToR8egkBRwAxZ", artistName: "Cynthia Erivo" },
    { externalId: "0O1n2TpXR4XizmHi7aY0l8", artistName: "Jeff Goldblum" },
  ],
  trackKey:
    "thewizardandilivefromthedolbytheatre|0O1n2TpXR4XizmHi7aY0l8,46UMQ0cW8ToR8egkBRwAxZ|353015",
  song: "song/ariana-grande-the-wizard-and-i",
} as const satisfies Track
