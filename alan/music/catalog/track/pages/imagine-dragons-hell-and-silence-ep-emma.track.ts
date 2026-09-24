import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsHellAndSilenceEpEmma = {
  id: "01a0c43f-e66f-7453-b43d-2afd5f18e742",
  type: "page-type/track",
  slug: "imagine-dragons-hell-and-silence-ep-emma",
  ownLength: 3.5491,
  ownProgress: 3.5491,
  partOfCollections: ["release/imagine-dragons-hell-and-silence-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "Emma",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "emma|53XhwfbYqKCa1cC15pYq2q|212946",
  song: "song/imagine-dragons-emma",
  carriedBy: [
    {
      release: "release/imagine-dragons-hell-and-silence-ep",
      discNumber: 1,
      position: 5,
      externalId: "4BixqolRkt6q6uFRfx57wm",
      externalLink: "https://open.spotify.com/track/4BixqolRkt6q6uFRfx57wm",
    },
  ],
} as const satisfies Track
