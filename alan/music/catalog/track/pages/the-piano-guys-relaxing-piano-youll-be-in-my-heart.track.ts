import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoYoullBeInMyHeart = {
  id: "01a0afa1-cc68-7689-bd4a-bbed326a325f",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-youll-be-in-my-heart",
  ownLength: 4.123483333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5147RgnFXB445XB1NKSqPO",
      externalLink: "https://open.spotify.com/track/5147RgnFXB445XB1NKSqPO",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "You'll Be In My Heart",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "youllbeinmyheart|0jW6R8CVyVohuUJVcuweDI|247409",
} as const satisfies Track
