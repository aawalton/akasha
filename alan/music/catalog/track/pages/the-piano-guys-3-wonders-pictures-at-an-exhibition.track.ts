import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersPicturesAtAnExhibition = {
  id: "01a0afa2-16fd-799b-a51e-e0b2681557a8",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-pictures-at-an-exhibition",
  ownLength: 4.038,
  ownProgress: 4.038,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  status: "completed",
  unit: "unit/minutes",
  title: "Pictures at an Exhibition",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "picturesatanexhibition|0jW6R8CVyVohuUJVcuweDI|242280",
  song: "song/the-piano-guys-pictures-at-an-exhibition",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-wonders",
      discNumber: 1,
      position: 12,
      externalId: "6dqDzxkK6QVjRIogGJo9U9",
      externalLink: "https://open.spotify.com/track/6dqDzxkK6QVjRIogGJo9U9",
    },
  ],
} as const satisfies Track
