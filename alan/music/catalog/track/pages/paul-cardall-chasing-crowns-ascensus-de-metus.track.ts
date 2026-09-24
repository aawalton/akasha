import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsAscensusDeMetus = {
  id: "01a0b4c8-2126-761a-99df-3f17384455d6",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-ascensus-de-metus",
  ownLength: 4.091666666666667,
  ownProgress: 4.091666666666667,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ascensus de Metus",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "ascensusdemetus|7FQRbf8gbKw8KZQZAJWxH2|245500",
  song: "song/paul-cardall-ascensus-de-metus",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 5,
      externalId: "36NapoqzBL6F37PDkvPlEN",
      externalLink: "https://open.spotify.com/track/36NapoqzBL6F37PDkvPlEN",
    },
  ],
} as const satisfies Track
