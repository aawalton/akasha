import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeOnTopOfTheWorld = {
  id: "01a0c43f-d706-71c4-89e8-05cbdfff74fb",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-on-top-of-the-world",
  ownLength: 3.164,
  ownProgress: 3.164,
  partOfCollections: [
    "release/imagine-dragons-night-visions-deluxe",
    "release/imagine-dragons-night-visions",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "On Top Of The World",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "ontopoftheworld|53XhwfbYqKCa1cC15pYq2q|189840",
  song: "song/imagine-dragons-on-top-of-the-world",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions",
      discNumber: 1,
      position: 5,
      externalId: "6Qj1WXW41Mn3Fh9V2sHphM",
      externalLink: "https://open.spotify.com/track/6Qj1WXW41Mn3Fh9V2sHphM",
    },
    {
      release: "release/imagine-dragons-night-visions-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "6KuHjfXHkfnIjdmcIvt9r0",
      externalLink: "https://open.spotify.com/track/6KuHjfXHkfnIjdmcIvt9r0",
    },
  ],
} as const satisfies Track
