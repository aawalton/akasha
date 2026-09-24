import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeEchoOfMyShadow = {
  id: "01a0b637-eb69-7669-874f-4aa97e50558e",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-echo-of-my-shadow",
  ownLength: 4.080216666666667,
  ownProgress: 4.080216666666667,
  partOfCollections: [
    "release/aurora-what-happened-to-the-heart-deluxe",
    "release/aurora-what-happened-to-the-heart",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Echo Of My Shadow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "echoofmyshadow|1WgXqy2Dd70QQOU7Ay074N|244813",
  song: "song/aurora-echo-of-my-shadow",
  carriedBy: [
    {
      release: "release/aurora-what-happened-to-the-heart",
      discNumber: 1,
      position: 1,
      externalId: "71C3wpAeAjNfK8hwacQW5U",
      externalLink: "https://open.spotify.com/track/71C3wpAeAjNfK8hwacQW5U",
    },
    {
      release: "release/aurora-what-happened-to-the-heart-deluxe",
      discNumber: 1,
      position: 1,
      externalId: "5XFi6TdNIZgHTyM2eCxXJv",
      externalLink: "https://open.spotify.com/track/5XFi6TdNIZgHTyM2eCxXJv",
    },
  ],
} as const satisfies Track
