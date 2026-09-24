import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishDontSmileAtMePartyFavor = {
  id: "01a0b638-ebdf-7113-87cf-e6bca3ca771b",
  type: "page-type/track",
  slug: "billie-eilish-dont-smile-at-me-party-favor",
  ownLength: 3.4128333333333334,
  ownProgress: 3.4128333333333334,
  partOfCollections: ["release/billie-eilish-dont-smile-at-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "party favor",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "partyfavor|6qqNVTkY8uBg9cP3Jd7DAH|204770",
  song: "song/billie-eilish-party-favor",
  carriedBy: [
    {
      release: "release/billie-eilish-dont-smile-at-me",
      discNumber: 1,
      position: 5,
      externalId: "3WxmlTZ85sCYFnuIXmUAEe",
      externalLink: "https://open.spotify.com/track/3WxmlTZ85sCYFnuIXmUAEe",
    },
  ],
} as const satisfies Track
