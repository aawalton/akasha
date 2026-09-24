import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeMyNameFeatAneBrun = {
  id: "01a0b637-ecd8-7c21-8a82-61407f06ed0b",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-my-name-feat-ane-brun",
  ownLength: 3.326433333333333,
  ownProgress: 3.326433333333333,
  partOfCollections: [
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "My Name (feat. Ane Brun)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }, { artistName: "Ane Brun" }],
  trackKey: "mynamefeatanebrun|1WgXqy2Dd70QQOU7Ay074N,2L3kwZFd16zjHz9a5kEPAm|199586",
  song: "song/aurora-my-name",
  carriedBy: [
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 11,
      externalId: "1CnkJJM3nMGhNMe5QQEv7e",
      externalLink: "https://open.spotify.com/track/1CnkJJM3nMGhNMe5QQEv7e",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 11,
      externalId: "6Q42h5c9vdjpNjGBnM657Q",
      externalLink: "https://open.spotify.com/track/6Q42h5c9vdjpNjGBnM657Q",
    },
  ],
} as const satisfies Track
