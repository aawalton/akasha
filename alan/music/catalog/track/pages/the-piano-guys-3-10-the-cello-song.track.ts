import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310TheCelloSong = {
  id: "01a0afa2-0c75-78f5-83d8-7b821898db31",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-the-cello-song",
  ownLength: 3.2411666666666665,
  ownProgress: 3.2411666666666665,
  partOfCollections: ["release/the-piano-guys-3-10"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Cello Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "thecellosong|0jW6R8CVyVohuUJVcuweDI|194470",
  song: "song/the-piano-guys-the-cello-song",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 5,
      externalId: "0sgeEBtOJEl6IsAfxTNuiK",
      externalLink: "https://open.spotify.com/track/0sgeEBtOJEl6IsAfxTNuiK",
    },
  ],
} as const satisfies Track
