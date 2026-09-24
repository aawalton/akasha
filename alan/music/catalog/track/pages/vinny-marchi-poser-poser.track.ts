import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiPoserPoser = {
  id: "01a0b112-9a52-7baa-8aa0-d095f5096ae9",
  type: "page-type/track",
  slug: "vinny-marchi-poser-poser",
  ownLength: 2.7301333333333333,
  ownProgress: 2.7301333333333333,
  partOfCollections: ["release/vinny-marchi-poser"],
  status: "completed",
  unit: "unit/minutes",
  title: "POSER",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "poser|5USAMqcbMAzF3HBmeD5pJF|163808",
  song: "song/vinny-marchi-poser",
  carriedBy: [
    {
      release: "release/vinny-marchi-poser",
      discNumber: 1,
      position: 1,
      externalId: "3YAVYFHT3DPMpYK326yat3",
      externalLink: "https://open.spotify.com/track/3YAVYFHT3DPMpYK326yat3",
    },
  ],
} as const satisfies Track
