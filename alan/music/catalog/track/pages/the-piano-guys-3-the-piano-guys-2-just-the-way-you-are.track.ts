import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2JustTheWayYouAre = {
  id: "01a0afa2-20a5-72f9-8d66-ef4124d7f2c8",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-just-the-way-you-are",
  ownLength: 4.364583333333333,
  ownProgress: 4.364583333333333,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Just the Way You Are",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "justthewayyouare|0jW6R8CVyVohuUJVcuweDI|261875",
  song: "song/the-piano-guys-just-the-way-you-are",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys-2",
      discNumber: 1,
      position: 7,
      externalId: "3wGQULikds23nGCvIJf5G4",
      externalLink: "https://open.spotify.com/track/3wGQULikds23nGCvIJf5G4",
    },
  ],
} as const satisfies Track
