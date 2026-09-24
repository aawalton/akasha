import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310AvatarTheTheme = {
  id: "01a0afa2-0b7b-7872-aaea-35c64850a1a1",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-avatar-the-theme",
  ownLength: 3.0541666666666667,
  ownProgress: 3.0541666666666667,
  partOfCollections: ["release/the-piano-guys-3-10", "release/the-piano-guys-3-avatar-the-theme"],
  status: "completed",
  unit: "unit/minutes",
  title: "Avatar (The Theme)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "avatarthetheme|0jW6R8CVyVohuUJVcuweDI|183250",
  song: "song/the-piano-guys-avatar-the-theme",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 1,
      position: 10,
      externalId: "0tSW7MXYWuazhRtsSi9tPz",
      externalLink: "https://open.spotify.com/track/0tSW7MXYWuazhRtsSi9tPz",
    },
    {
      release: "release/the-piano-guys-3-avatar-the-theme",
      discNumber: 1,
      position: 1,
      externalId: "5lDXNxaigYgrUDxmONHdq6",
      externalLink: "https://open.spotify.com/track/5lDXNxaigYgrUDxmONHdq6",
    },
  ],
} as const satisfies Track
