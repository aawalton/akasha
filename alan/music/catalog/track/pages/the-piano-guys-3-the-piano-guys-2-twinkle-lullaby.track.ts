import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2TwinkleLullaby = {
  id: "01a0afa2-2139-7956-a59a-fccc09e6dc01",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-twinkle-lullaby",
  ownLength: 1.8541666666666667,
  ownProgress: 1.8541666666666667,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Twinkle Lullaby",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "twinklelullaby|0jW6R8CVyVohuUJVcuweDI|111250",
  song: "song/the-piano-guys-twinkle-lullaby",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys-2",
      discNumber: 1,
      position: 11,
      externalId: "50BSgrvg1WgrudUbw2fQG4",
      externalLink: "https://open.spotify.com/track/50BSgrvg1WgrudUbw2fQG4",
    },
  ],
} as const satisfies Track
