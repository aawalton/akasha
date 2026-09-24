import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishSixFeetUnderTheRemixesSixFeetUnderJerryFolkRemix = {
  id: "01a0b638-ed99-70a4-90bd-16d62371c9f8",
  type: "page-type/track",
  slug: "billie-eilish-six-feet-under-the-remixes-six-feet-under-jerry-folk-remix",
  ownLength: 3.3483,
  ownProgress: 3.3483,
  partOfCollections: ["release/billie-eilish-six-feet-under-the-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Six Feet Under - Jerry Folk Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }, { artistName: "Jerry Folk" }],
  trackKey: "sixfeetunderjerryfolkremix|356FCJoyYWyzONni54Dgrv,6qqNVTkY8uBg9cP3Jd7DAH|200898",
  song: "song/billie-eilish-six-feet-under",
  carriedBy: [
    {
      release: "release/billie-eilish-six-feet-under-the-remixes",
      discNumber: 1,
      position: 3,
      externalId: "58nxGpcCfNDiqmFXklOslz",
      externalLink: "https://open.spotify.com/track/58nxGpcCfNDiqmFXklOslz",
    },
  ],
} as const satisfies Track
