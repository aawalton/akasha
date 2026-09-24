import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeIBetMyLife = {
  id: "01a0c43f-cfa4-73ed-bfce-fc90eca0a91a",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-i-bet-my-life",
  ownLength: 3.2117666666666667,
  ownProgress: 3.2117666666666667,
  partOfCollections: [
    "release/imagine-dragons-smoke-mirrors-deluxe",
    "release/imagine-dragons-smoke-mirrors",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "I Bet My Life",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "ibetmylife|53XhwfbYqKCa1cC15pYq2q|192706",
  song: "song/imagine-dragons-i-bet-my-life",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors",
      discNumber: 1,
      position: 5,
      externalId: "15DrrIod12Tc2IoMaHiwlQ",
      externalLink: "https://open.spotify.com/track/15DrrIod12Tc2IoMaHiwlQ",
    },
    {
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "1CQXNBt6zv15L8zDITcxRB",
      externalLink: "https://open.spotify.com/track/1CQXNBt6zv15L8zDITcxRB",
    },
  ],
} as const satisfies Track
