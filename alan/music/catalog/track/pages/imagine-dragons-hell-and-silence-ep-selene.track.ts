import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsHellAndSilenceEpSelene = {
  id: "01a0c43f-e644-7221-a2ea-8333f4d5c664",
  type: "page-type/track",
  slug: "imagine-dragons-hell-and-silence-ep-selene",
  ownLength: 4.092433333333333,
  ownProgress: 4.092433333333333,
  partOfCollections: ["release/imagine-dragons-hell-and-silence-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "Selene",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "selene|53XhwfbYqKCa1cC15pYq2q|245546",
  song: "song/imagine-dragons-selene",
  carriedBy: [
    {
      release: "release/imagine-dragons-hell-and-silence-ep",
      discNumber: 1,
      position: 4,
      externalId: "4eGXwNXHtH8GLohrZtqB3p",
      externalLink: "https://open.spotify.com/track/4eGXwNXHtH8GLohrZtqB3p",
    },
  ],
} as const satisfies Track
