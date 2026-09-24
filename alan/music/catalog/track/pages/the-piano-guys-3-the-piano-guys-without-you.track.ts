import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysWithoutYou = {
  id: "01a0afa2-1a90-7b3b-b655-e1e8718634c8",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-without-you",
  ownLength: 3.64355,
  ownProgress: 3.64355,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  status: "completed",
  unit: "unit/minutes",
  title: "Without You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "withoutyou|0jW6R8CVyVohuUJVcuweDI|218613",
  song: "song/the-piano-guys-without-you",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys",
      discNumber: 1,
      position: 15,
      externalId: "11bCHjLwV7XLUc94MKK57O",
      externalLink: "https://open.spotify.com/track/11bCHjLwV7XLUc94MKK57O",
    },
  ],
} as const satisfies Track
