import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WhenYouReGoneWhenYoureGone = {
  id: "01a0afa1-fd6e-7e39-a632-c744ab075487",
  type: "page-type/track",
  slug: "the-piano-guys-3-when-you-re-gone-when-youre-gone",
  ownLength: 3,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-when-you-re-gone"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5L7QKqXiuJieIUe7NddG5G",
      externalLink: "https://open.spotify.com/track/5L7QKqXiuJieIUe7NddG5G",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "When You're Gone",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "whenyouregone|0jW6R8CVyVohuUJVcuweDI|180000",
} as const satisfies Track
