import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2JustTheWayYouAre = {
  id: "01a0afa2-20a5-72f9-8d66-ef4124d7f2c8",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-just-the-way-you-are",
  ownLength: 4.364583333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3wGQULikds23nGCvIJf5G4",
      externalLink: "https://open.spotify.com/track/3wGQULikds23nGCvIJf5G4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Just the Way You Are",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "justthewayyouare|0jW6R8CVyVohuUJVcuweDI|261875",
  song: "song/the-piano-guys-just-the-way-you-are",
} as const satisfies Track
