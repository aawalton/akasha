import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserRingTheAlarm = {
  id: "01a0b637-e777-775e-9c92-f0e500c5dde8",
  type: "page-type/track",
  slug: "aurora-come-closer-ring-the-alarm",
  grade: "C",
  ownLength: 5.52355,
  ownProgress: 5.52355,
  partOfCollections: ["release/aurora-come-closer", "release/aurora-ring-the-alarm"],
  status: "completed",
  unit: "unit/minutes",
  title: "RING THE ALARM",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "TOMORA" },
    { artist: "artist/aurora" },
    { artistName: "Tom Rowlands" },
  ],
  trackKey:
    "ringthealarm|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|331413",
  song: "song/aurora-ring-the-alarm",
  carriedBy: [
    {
      release: "release/aurora-come-closer",
      discNumber: 1,
      position: 4,
      externalId: "3i3Qa9DLMVeexn7ighFoVS",
      externalLink: "https://open.spotify.com/track/3i3Qa9DLMVeexn7ighFoVS",
    },
    {
      release: "release/aurora-ring-the-alarm",
      discNumber: 1,
      position: 1,
      externalId: "4ewxZwUwLeMZEMWF1CRLeG",
      externalLink: "https://open.spotify.com/track/4ewxZwUwLeMZEMWF1CRLeG",
    },
  ],
} as const satisfies Track
