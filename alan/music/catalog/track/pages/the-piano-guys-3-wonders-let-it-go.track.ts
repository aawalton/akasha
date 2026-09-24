import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersLetItGo = {
  id: "01a0afa2-15ba-7828-9b99-9e6eea0f6ab9",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-let-it-go",
  ownLength: 4.030666666666667,
  ownProgress: 4.030666666666667,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  status: "completed",
  unit: "unit/minutes",
  title: "Let It Go",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "letitgo|0jW6R8CVyVohuUJVcuweDI|241840",
  song: "song/the-piano-guys-let-it-go",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-wonders",
      discNumber: 1,
      position: 2,
      externalId: "1wpyVNJcutD5uYyjDreWaW",
      externalLink: "https://open.spotify.com/track/1wpyVNJcutD5uYyjDreWaW",
    },
  ],
} as const satisfies Track
