import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsHellAndSilenceEpEmma = {
  id: "01a0c43f-e66f-7453-b43d-2afd5f18e742",
  type: "page-type/track",
  slug: "imagine-dragons-hell-and-silence-ep-emma",
  ownLength: 3.5491,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-hell-and-silence-ep"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4BixqolRkt6q6uFRfx57wm",
      externalLink: "https://open.spotify.com/track/4BixqolRkt6q6uFRfx57wm",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Emma",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "emma|53XhwfbYqKCa1cC15pYq2q|212946",
  song: "song/imagine-dragons-emma",
} as const satisfies Track
