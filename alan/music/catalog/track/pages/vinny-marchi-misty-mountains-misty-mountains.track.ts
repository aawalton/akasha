import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiMistyMountainsMistyMountains = {
  id: "01a0b112-9a06-7c49-87f4-6ad5a3b2c3c2",
  type: "page-type/track",
  slug: "vinny-marchi-misty-mountains-misty-mountains",
  ownLength: 3.153,
  ownProgress: 3.153,
  partOfCollections: ["release/vinny-marchi-misty-mountains"],
  status: "completed",
  unit: "unit/minutes",
  title: "Misty Mountains",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }, { artistName: "Mia Asano" }],
  trackKey: "mistymountains|5USAMqcbMAzF3HBmeD5pJF,7fLnGsF79xujfrOZmPMuEG|189180",
  song: "song/vinny-marchi-misty-mountains",
  carriedBy: [
    {
      release: "release/vinny-marchi-misty-mountains",
      discNumber: 1,
      position: 1,
      externalId: "6VWrUuAb8Bp51fBinsoziz",
      externalLink: "https://open.spotify.com/track/6VWrUuAb8Bp51fBinsoziz",
    },
  ],
} as const satisfies Track
