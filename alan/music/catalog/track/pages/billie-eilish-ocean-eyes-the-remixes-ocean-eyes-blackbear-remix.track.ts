import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishOceanEyesTheRemixesOceanEyesBlackbearRemix = {
  id: "01a0b638-ee0b-7f47-af1f-11386092bc90",
  type: "page-type/track",
  slug: "billie-eilish-ocean-eyes-the-remixes-ocean-eyes-blackbear-remix",
  ownLength: 3.2551,
  ownProgress: 3.2551,
  partOfCollections: ["release/billie-eilish-ocean-eyes-the-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ocean Eyes - Blackbear Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }, { artistName: "blackbear" }],
  trackKey: "oceaneyesblackbearremix|2cFrymmkijnjDg9SS92EPM,6qqNVTkY8uBg9cP3Jd7DAH|195306",
  song: "song/billie-eilish-ocean-eyes",
  carriedBy: [
    {
      release: "release/billie-eilish-ocean-eyes-the-remixes",
      discNumber: 1,
      position: 2,
      externalId: "4JuZQeSRYJfLCqBgBIxxrR",
      externalLink: "https://open.spotify.com/track/4JuZQeSRYJfLCqBgBIxxrR",
    },
  ],
} as const satisfies Track
