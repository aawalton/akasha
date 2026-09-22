import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxeSoWhatNow = {
  id: "01a0caa9-0c4f-7782-9073-36bc9809a7a0",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-so-what-now",
  ownLength: 2.8497666666666666,
  ownProgress: 0,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe", "release/renee-rapp-snow-angel"],
  status: "not-started",
  unit: "unit/minutes",
  title: "So What Now",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "sowhatnow|2hUYKu1x0UZQXvzCmggvSn|170986",
  song: "song/renee-rapp-so-what-now",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel",
      discNumber: 1,
      position: 6,
      externalId: "2VttL8MR8YY2Ktw3PED7w2",
      externalLink: "https://open.spotify.com/track/2VttL8MR8YY2Ktw3PED7w2",
    },
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 6,
      externalId: "1fanyDgHMNULC15WS2peWU",
      externalLink: "https://open.spotify.com/track/1fanyDgHMNULC15WS2peWU",
    },
  ],
} as const satisfies Track
