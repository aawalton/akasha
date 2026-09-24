import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysAThousandYears = {
  id: "01a0afa2-19b8-7895-99ba-fc106f2cf03d",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-a-thousand-years",
  ownLength: 4.612433333333334,
  ownProgress: 4.612433333333334,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Thousand Years",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "athousandyears|0jW6R8CVyVohuUJVcuweDI|276746",
  song: "song/evynne-hollens-a-thousand-years",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys",
      discNumber: 1,
      position: 9,
      externalId: "0E0xI4AgMNU7UkwBt3FCVN",
      externalLink: "https://open.spotify.com/track/0E0xI4AgMNU7UkwBt3FCVN",
    },
  ],
} as const satisfies Track
