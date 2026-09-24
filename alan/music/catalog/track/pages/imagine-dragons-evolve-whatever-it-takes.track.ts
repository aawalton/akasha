import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsEvolveWhateverItTakes = {
  id: "01a0c43f-ca27-71bc-8dee-384916b3dadd",
  type: "page-type/track",
  slug: "imagine-dragons-evolve-whatever-it-takes",
  ownLength: 3.354,
  ownProgress: 3.354,
  partOfCollections: ["release/imagine-dragons-evolve"],
  status: "completed",
  unit: "unit/minutes",
  title: "Whatever It Takes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "whateverittakes|53XhwfbYqKCa1cC15pYq2q|201240",
  song: "song/imagine-dragons-whatever-it-takes",
  carriedBy: [
    {
      release: "release/imagine-dragons-evolve",
      discNumber: 1,
      position: 3,
      externalId: "6Qn5zhYkTa37e91HC1D7lb",
      externalLink: "https://open.spotify.com/track/6Qn5zhYkTa37e91HC1D7lb",
    },
  ],
} as const satisfies Track
