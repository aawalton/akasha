import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusWhenYoureGone = {
  id: "01a0afa1-c310-7c95-8f76-10667c009962",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-when-youre-gone",
  ownLength: 3,
  ownProgress: 3,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 6,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "56XGOjaT2JGsf8JOEz76XU",
      externalLink: "https://open.spotify.com/track/56XGOjaT2JGsf8JOEz76XU",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "When You're Gone",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "whenyouregone|0jW6R8CVyVohuUJVcuweDI|180000",
  song: "song/the-piano-guys-when-youre-gone",
  carriedBy: [
    {
      release: "release/the-piano-guys-piano-focus",
      discNumber: 1,
      position: 6,
      externalId: "56XGOjaT2JGsf8JOEz76XU",
      externalLink: "https://open.spotify.com/track/56XGOjaT2JGsf8JOEz76XU",
    },
  ],
} as const satisfies Track
