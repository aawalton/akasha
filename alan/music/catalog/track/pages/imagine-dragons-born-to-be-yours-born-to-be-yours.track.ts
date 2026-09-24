import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsBornToBeYoursBornToBeYours = {
  id: "01a0c43f-dcbb-7d84-97c0-309de27c6061",
  type: "page-type/track",
  slug: "imagine-dragons-born-to-be-yours-born-to-be-yours",
  ownLength: 3.222,
  ownProgress: 3.222,
  partOfCollections: ["release/imagine-dragons-born-to-be-yours"],
  status: "completed",
  unit: "unit/minutes",
  title: "Born To Be Yours",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Kygo" }, { artist: "artist/imagine-dragons" }],
  trackKey: "borntobeyours|23fqKkggKUBHNkbKtXEls4,53XhwfbYqKCa1cC15pYq2q|193320",
  song: "song/imagine-dragons-born-to-be-yours",
  carriedBy: [
    {
      release: "release/imagine-dragons-born-to-be-yours",
      discNumber: 1,
      position: 1,
      externalId: "0WVAQaxrT0wsGEG4BCVSn2",
      externalLink: "https://open.spotify.com/track/0WVAQaxrT0wsGEG4BCVSn2",
    },
  ],
} as const satisfies Track
