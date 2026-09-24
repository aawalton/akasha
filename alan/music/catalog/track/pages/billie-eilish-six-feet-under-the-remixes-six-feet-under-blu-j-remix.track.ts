import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishSixFeetUnderTheRemixesSixFeetUnderBluJRemix = {
  id: "01a0b638-ed4a-770a-8b31-ee263bd8c98b",
  type: "page-type/track",
  slug: "billie-eilish-six-feet-under-the-remixes-six-feet-under-blu-j-remix",
  ownLength: 3.5937333333333332,
  ownProgress: 3.5937333333333332,
  partOfCollections: ["release/billie-eilish-six-feet-under-the-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Six Feet Under - BLU J Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }, { artistName: "BLU J" }],
  trackKey: "sixfeetunderblujremix|0bI3VA9gVcpoOzrklKgG7V,6qqNVTkY8uBg9cP3Jd7DAH|215624",
  song: "song/billie-eilish-six-feet-under",
  carriedBy: [
    {
      release: "release/billie-eilish-six-feet-under-the-remixes",
      discNumber: 1,
      position: 1,
      externalId: "4D5sitThGoz0RnMsFdFUuz",
      externalLink: "https://open.spotify.com/track/4D5sitThGoz0RnMsFdFUuz",
    },
  ],
} as const satisfies Track
