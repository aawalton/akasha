import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310AvatarTheTheme = {
  id: "01a0afa2-0b7b-7872-aaea-35c64850a1a1",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-avatar-the-theme",
  ownLength: 3.0541666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0tSW7MXYWuazhRtsSi9tPz",
      externalLink: "https://open.spotify.com/track/0tSW7MXYWuazhRtsSi9tPz",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Avatar (The Theme)",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "avatarthetheme|0jW6R8CVyVohuUJVcuweDI|183250",
  song: "song/the-piano-guys-avatar-the-theme",
} as const satisfies Track
