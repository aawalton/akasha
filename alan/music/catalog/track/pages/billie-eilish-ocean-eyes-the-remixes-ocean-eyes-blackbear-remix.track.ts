import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishOceanEyesTheRemixesOceanEyesBlackbearRemix = {
  id: "01a0b638-ee0b-7f47-af1f-11386092bc90",
  type: "page-type/track",
  slug: "billie-eilish-ocean-eyes-the-remixes-ocean-eyes-blackbear-remix",
  ownLength: 3.2551,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-ocean-eyes-the-remixes"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4JuZQeSRYJfLCqBgBIxxrR",
      externalLink: "https://open.spotify.com/track/4JuZQeSRYJfLCqBgBIxxrR",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Ocean Eyes - Blackbear Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" },
    { externalId: "2cFrymmkijnjDg9SS92EPM", artistName: "blackbear" },
  ],
  trackKey: "oceaneyesblackbearremix|2cFrymmkijnjDg9SS92EPM,6qqNVTkY8uBg9cP3Jd7DAH|195306",
  song: "song/billie-eilish-ocean-eyes",
} as const satisfies Track
