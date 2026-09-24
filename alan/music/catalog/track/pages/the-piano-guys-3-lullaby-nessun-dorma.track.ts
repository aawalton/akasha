import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyNessunDorma = {
  id: "01a0afa1-de33-7093-8621-3260f1de33e3",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-nessun-dorma",
  ownLength: 2.4590833333333335,
  ownProgress: 2.4590833333333335,
  partOfCollections: [
    "release/the-piano-guys-3-lullaby",
    "release/the-piano-guys-classical-for-studying",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Nessun Dorma",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "nessundorma|0jW6R8CVyVohuUJVcuweDI|147545",
  song: "song/the-piano-guys-nessun-dorma",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-lullaby",
      discNumber: 1,
      position: 8,
      externalId: "4snFyjWPGLNewIjxFPVwfT",
      externalLink: "https://open.spotify.com/track/4snFyjWPGLNewIjxFPVwfT",
    },
    {
      release: "release/the-piano-guys-classical-for-studying",
      discNumber: 1,
      position: 2,
      externalId: "6KVkNZ0lbDYYqJFTUokrdI",
      externalLink: "https://open.spotify.com/track/6KVkNZ0lbDYYqJFTUokrdI",
    },
  ],
} as const satisfies Track
