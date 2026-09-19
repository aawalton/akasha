import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartMyNameFeatAneBrun = {
  id: "01a0b637-f021-7b59-ba8c-6f9ebe3f25fc",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-my-name-feat-ane-brun",
  ownLength: 3.326433333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1CnkJJM3nMGhNMe5QQEv7e",
      externalLink: "https://open.spotify.com/track/1CnkJJM3nMGhNMe5QQEv7e",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "My Name (feat. Ane Brun)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "2L3kwZFd16zjHz9a5kEPAm", artistName: "Ane Brun" },
  ],
  trackKey: "mynamefeatanebrun|1WgXqy2Dd70QQOU7Ay074N,2L3kwZFd16zjHz9a5kEPAm|199586",
  song: "song/aurora-my-name",
} as const satisfies Track
