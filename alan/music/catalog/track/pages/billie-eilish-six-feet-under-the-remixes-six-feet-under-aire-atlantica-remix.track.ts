import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishSixFeetUnderTheRemixesSixFeetUnderAireAtlanticaRemix = {
  id: "01a0b638-edc0-7e62-bd90-4d356f6ea646",
  type: "page-type/track",
  slug: "billie-eilish-six-feet-under-the-remixes-six-feet-under-aire-atlantica-remix",
  ownLength: 3.6953,
  ownProgress: 3.6953,
  partOfCollections: ["release/billie-eilish-six-feet-under-the-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Six Feet Under - Aire Atlantica Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }, { artistName: "Aire Atlantica" }],
  trackKey: "sixfeetunderaireatlanticaremix|6Ta9RS3a6sLulTlM4FWY5K,6qqNVTkY8uBg9cP3Jd7DAH|221718",
  song: "song/billie-eilish-six-feet-under",
  carriedBy: [
    {
      release: "release/billie-eilish-six-feet-under-the-remixes",
      discNumber: 1,
      position: 4,
      externalId: "75WGjm9867pcRxGwiLRwK8",
      externalLink: "https://open.spotify.com/track/75WGjm9867pcRxGwiLRwK8",
    },
  ],
} as const satisfies Track
