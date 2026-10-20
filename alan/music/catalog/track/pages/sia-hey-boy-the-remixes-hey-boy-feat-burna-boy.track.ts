import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaHeyBoyTheRemixesHeyBoyFeatBurnaBoy = {
  id: "01a15994-8c5e-7d92-9097-691ffdc977fd",
  type: "page-type/track",
  slug: "sia-hey-boy-the-remixes-hey-boy-feat-burna-boy",
  ownLength: 3.0259,
  ownProgress: 0,
  partOfCollections: ["release/sia-hey-boy-the-remixes", "release/sia-hey-boy-feat-burna-boy"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Hey Boy (feat. Burna Boy)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sia" }, { artistName: "Burna Boy" }],
  trackKey: "heyboyfeatburnaboy|3wcj11K77LjEY1PkEazffa,5WUlDfRSoLAfcVSX1WnrxN|181554",
  song: "song/sia-hey-boy",
  carriedBy: [
    {
      release: "release/sia-hey-boy-feat-burna-boy",
      discNumber: 1,
      position: 1,
      externalId: "7H9hyqq8cr8jHquz9HhCzm",
      externalLink: "https://open.spotify.com/track/7H9hyqq8cr8jHquz9HhCzm",
    },
    {
      release: "release/sia-hey-boy-the-remixes",
      discNumber: 1,
      position: 4,
      externalId: "2Wz3XTG4UOEB8M1eGY9A7P",
      externalLink: "https://open.spotify.com/track/2Wz3XTG4UOEB8M1eGY9A7P",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Track
