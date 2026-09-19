import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyJesuJoy = {
  id: "01a0afa1-de55-7ef9-9726-f59da8303ede",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-jesu-joy",
  ownLength: 3.269216666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6JxUc4ZorM1xJZr2QtoQiC",
      externalLink: "https://open.spotify.com/track/6JxUc4ZorM1xJZr2QtoQiC",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Jesu Joy",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "jesujoy|0jW6R8CVyVohuUJVcuweDI|196153",
  song: "song/the-piano-guys-jesu-joy",
} as const satisfies Track
