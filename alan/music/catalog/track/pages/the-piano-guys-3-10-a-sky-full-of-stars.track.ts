import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310ASkyFullOfStars = {
  id: "01a0afa2-0be0-77ac-b26b-e0349bba0412",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-a-sky-full-of-stars",
  ownLength: 4.0909,
  ownProgress: 4.0909,
  partOfCollections: ["release/the-piano-guys-3-10", "release/the-piano-guys-3-pop-on-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Sky Full of Stars",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "askyfullofstars|0jW6R8CVyVohuUJVcuweDI|245454",
  song: "song/the-piano-guys-a-sky-full-of-stars",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 1,
      externalId: "0OhlRpRBIK15U6ZbE59IIj",
      externalLink: "https://open.spotify.com/track/0OhlRpRBIK15U6ZbE59IIj",
    },
    {
      release: "release/the-piano-guys-3-pop-on-piano",
      discNumber: 1,
      position: 8,
      externalId: "2PFaSutzMUXaJNNt5SCn0H",
      externalLink: "https://open.spotify.com/track/2PFaSutzMUXaJNNt5SCn0H",
    },
  ],
} as const satisfies Track
