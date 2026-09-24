import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsMercuryActs12Wrecked = {
  id: "01a0c43f-c2bb-71e2-a5e4-3a8038dbc507",
  type: "page-type/track",
  slug: "imagine-dragons-mercury-acts-1-2-wrecked",
  ownLength: 4.0667333333333335,
  ownProgress: 4.0667333333333335,
  partOfCollections: [
    "release/imagine-dragons-mercury-acts-1-2",
    "release/imagine-dragons-wrecked",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Wrecked",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "wrecked|53XhwfbYqKCa1cC15pYq2q|244004",
  song: "song/imagine-dragons-wrecked",
  carriedBy: [
    {
      release: "release/imagine-dragons-mercury-acts-1-2",
      discNumber: 1,
      position: 4,
      externalId: "6TEftSkmWdTm1EpThnwqh6",
      externalLink: "https://open.spotify.com/track/6TEftSkmWdTm1EpThnwqh6",
    },
    {
      release: "release/imagine-dragons-wrecked",
      discNumber: 1,
      position: 1,
      externalId: "2d1MywHy6FwKdzxFuSJnwl",
      externalLink: "https://open.spotify.com/track/2d1MywHy6FwKdzxFuSJnwl",
    },
  ],
} as const satisfies Track
