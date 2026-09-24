import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsHellAndSilenceEpEasy = {
  id: "01a0c43f-e6bc-7017-b611-139e8f343a93",
  type: "page-type/track",
  slug: "imagine-dragons-hell-and-silence-ep-easy",
  ownLength: 4.906883333333333,
  ownProgress: 4.906883333333333,
  partOfCollections: ["release/imagine-dragons-hell-and-silence-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "Easy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "easy|53XhwfbYqKCa1cC15pYq2q|294413",
  song: "song/imagine-dragons-easy",
  carriedBy: [
    {
      release: "release/imagine-dragons-hell-and-silence-ep",
      discNumber: 1,
      position: 6,
      externalId: "2mzBhcSeh7TrsPIobLFDmP",
      externalLink: "https://open.spotify.com/track/2mzBhcSeh7TrsPIobLFDmP",
    },
  ],
} as const satisfies Track
