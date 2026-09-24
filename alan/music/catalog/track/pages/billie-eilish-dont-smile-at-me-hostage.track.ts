import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishDontSmileAtMeHostage = {
  id: "01a0b638-ec58-72f4-8e73-8db75ac9eaf1",
  type: "page-type/track",
  slug: "billie-eilish-dont-smile-at-me-hostage",
  ownLength: 3.82375,
  ownProgress: 3.82375,
  partOfCollections: ["release/billie-eilish-dont-smile-at-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "hostage",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "hostage|6qqNVTkY8uBg9cP3Jd7DAH|229425",
  song: "song/billie-eilish-hostage",
  carriedBy: [
    {
      release: "release/billie-eilish-dont-smile-at-me",
      discNumber: 1,
      position: 8,
      externalId: "1WsEgieHsWWndAzLkmV105",
      externalLink: "https://open.spotify.com/track/1WsEgieHsWWndAzLkmV105",
    },
  ],
} as const satisfies Track
