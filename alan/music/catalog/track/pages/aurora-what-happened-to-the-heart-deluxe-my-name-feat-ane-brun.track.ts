import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeMyNameFeatAneBrun = {
  id: "01a0b637-ecd8-7c21-8a82-61407f06ed0b",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-my-name-feat-ane-brun",
  ownLength: 3.326433333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart-deluxe"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Q42h5c9vdjpNjGBnM657Q",
      externalLink: "https://open.spotify.com/track/6Q42h5c9vdjpNjGBnM657Q",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "My Name (feat. Ane Brun)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "2L3kwZFd16zjHz9a5kEPAm", artistName: "Ane Brun" },
  ],
  trackKey: "mynamefeatanebrun|1WgXqy2Dd70QQOU7Ay074N,2L3kwZFd16zjHz9a5kEPAm|199586",
  song: "song/aurora-my-name",
} as const satisfies Track
