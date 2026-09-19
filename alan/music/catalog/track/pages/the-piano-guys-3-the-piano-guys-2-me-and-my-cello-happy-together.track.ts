import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2MeAndMyCelloHappyTogether = {
  id: "01a0afa2-2113-7e96-8e93-965c31dc3b62",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-me-and-my-cello-happy-together",
  ownLength: 3.1020833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6amWzecM9lo2uYpVOQCkEZ",
      externalLink: "https://open.spotify.com/track/6amWzecM9lo2uYpVOQCkEZ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Me and My Cello (Happy Together)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "meandmycellohappytogether|0jW6R8CVyVohuUJVcuweDI|186125",
  song: "song/the-piano-guys-me-and-my-cello-happy-together",
} as const satisfies Track
