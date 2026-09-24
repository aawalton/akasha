import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsBirdsBirds = {
  id: "01a0c43f-dc17-7e16-9289-9409efc8dbb2",
  type: "page-type/track",
  slug: "imagine-dragons-birds-birds",
  ownLength: 3.6573333333333333,
  ownProgress: 3.6573333333333333,
  partOfCollections: ["release/imagine-dragons-birds", "release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Birds",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "birds|53XhwfbYqKCa1cC15pYq2q|219440",
  song: "song/imagine-dragons-birds",
  carriedBy: [
    {
      release: "release/imagine-dragons-birds",
      discNumber: 1,
      position: 2,
      externalId: "2DWn3Qnk2MLaKSR2O6BcI6",
      externalLink: "https://open.spotify.com/track/2DWn3Qnk2MLaKSR2O6BcI6",
    },
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 13,
      externalId: "6Tvzf3VEi16JMhAgOwdt2y",
      externalLink: "https://open.spotify.com/track/6Tvzf3VEi16JMhAgOwdt2y",
    },
  ],
} as const satisfies Track
