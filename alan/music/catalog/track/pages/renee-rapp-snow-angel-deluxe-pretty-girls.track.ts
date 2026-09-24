import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappSnowAngelDeluxePrettyGirls = {
  id: "01a0caa9-0ca6-74ad-98ec-64e7e25061ee",
  type: "page-type/track",
  slug: "renee-rapp-snow-angel-deluxe-pretty-girls",
  ownLength: 2.4372333333333334,
  ownProgress: 2.4372333333333334,
  partOfCollections: ["release/renee-rapp-snow-angel-deluxe", "release/renee-rapp-snow-angel"],
  status: "completed",
  unit: "unit/minutes",
  title: "Pretty Girls",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "prettygirls|2hUYKu1x0UZQXvzCmggvSn|146234",
  song: "song/renee-rapp-pretty-girls",
  carriedBy: [
    {
      release: "release/renee-rapp-snow-angel",
      discNumber: 1,
      position: 8,
      externalId: "1dh5DUke1yHJzIF3Sa7nXC",
      externalLink: "https://open.spotify.com/track/1dh5DUke1yHJzIF3Sa7nXC",
    },
    {
      release: "release/renee-rapp-snow-angel-deluxe",
      discNumber: 1,
      position: 8,
      externalId: "6asWSYBkVpMPmI2PRvqDXQ",
      externalLink: "https://open.spotify.com/track/6asWSYBkVpMPmI2PRvqDXQ",
    },
  ],
} as const satisfies Track
