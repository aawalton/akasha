import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsLullabyeGoodnightMyAngel = {
  id: "01a0afa1-c7f4-7b8b-9422-61e96d48212d",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-lullabye-goodnight-my-angel",
  ownLength: 3.229016666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "66XBQV3eThveyZzIjGmU41",
      externalLink: "https://open.spotify.com/track/66XBQV3eThveyZzIjGmU41",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Lullabye (Goodnight, My Angel)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "lullabyegoodnightmyangel|0jW6R8CVyVohuUJVcuweDI|193741",
  song: "song/the-piano-guys-lullabye-goodnight-my-angel",
} as const satisfies Track
