import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishSixFeetUnderTheRemixesSixFeetUnderJerryFolkRemix = {
  id: "01a0b638-ed99-70a4-90bd-16d62371c9f8",
  type: "page-type/track",
  slug: "billie-eilish-six-feet-under-the-remixes-six-feet-under-jerry-folk-remix",
  ownLength: 3.3483,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-six-feet-under-the-remixes"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "58nxGpcCfNDiqmFXklOslz",
      externalLink: "https://open.spotify.com/track/58nxGpcCfNDiqmFXklOslz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Six Feet Under - Jerry Folk Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" },
    { externalId: "356FCJoyYWyzONni54Dgrv", artistName: "Jerry Folk" },
  ],
  trackKey: "sixfeetunderjerryfolkremix|356FCJoyYWyzONni54Dgrv,6qqNVTkY8uBg9cP3Jd7DAH|200898",
} as const satisfies Track
