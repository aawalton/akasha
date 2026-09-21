import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingGhost = {
  id: "01a0afa1-ca0e-7271-a543-afddb0c7b742",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-ghost",
  ownLength: 3.4423,
  ownProgress: 3.4423,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 15,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "08gusbNwqFeQbExWbNcEWg",
      externalLink: "https://open.spotify.com/track/08gusbNwqFeQbExWbNcEWg",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Ghost",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "ghost|0jW6R8CVyVohuUJVcuweDI|206538",
  song: "song/the-piano-guys-ghost",
  carriedBy: [
    {
      release: "release/the-piano-guys-classical-for-studying",
      discNumber: 1,
      position: 15,
      externalId: "08gusbNwqFeQbExWbNcEWg",
      externalLink: "https://open.spotify.com/track/08gusbNwqFeQbExWbNcEWg",
    },
  ],
} as const satisfies Track
