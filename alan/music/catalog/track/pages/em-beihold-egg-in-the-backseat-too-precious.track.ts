import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdEggInTheBackseatTooPrecious = {
  id: "01a0d3ab-b7bd-72e9-be13-1bdd52d9b699",
  type: "page-type/track",
  slug: "em-beihold-egg-in-the-backseat-too-precious",
  ownLength: 2.8308333333333335,
  ownProgress: 2.8308333333333335,
  partOfCollections: ["release/em-beihold-egg-in-the-backseat", "release/em-beihold-too-precious"],
  status: "completed",
  unit: "unit/minutes",
  title: "Too Precious",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/em-beihold" }],
  trackKey: "tooprecious|7o2ZQYM7nTsaVdkXY38UAA|169850",
  song: "song/em-beihold-too-precious",
  carriedBy: [
    {
      release: "release/em-beihold-egg-in-the-backseat",
      discNumber: 1,
      position: 5,
      externalId: "6fE3wA5brWaKWadgaGJWMw",
      externalLink: "https://open.spotify.com/track/6fE3wA5brWaKWadgaGJWMw",
    },
    {
      release: "release/em-beihold-too-precious",
      discNumber: 1,
      position: 1,
      externalId: "7FUDnQ7zR7MltFMakoJwnG",
      externalLink: "https://open.spotify.com/track/7FUDnQ7zR7MltFMakoJwnG",
    },
  ],
} as const satisfies Track
