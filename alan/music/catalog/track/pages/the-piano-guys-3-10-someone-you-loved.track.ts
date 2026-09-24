import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310SomeoneYouLoved = {
  id: "01a0afa2-0b17-7570-909c-c1753442342f",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-someone-you-loved",
  ownLength: 3.3857,
  ownProgress: 3.3857,
  partOfCollections: ["release/the-piano-guys-3-10", "release/the-piano-guys-3-pop-on-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Someone You Loved",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "someoneyouloved|0jW6R8CVyVohuUJVcuweDI|203142",
  song: "song/the-piano-guys-someone-you-loved",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 1,
      position: 7,
      externalId: "2sindV5MPoBIkAW02OFtHF",
      externalLink: "https://open.spotify.com/track/2sindV5MPoBIkAW02OFtHF",
    },
    {
      release: "release/the-piano-guys-3-pop-on-piano",
      discNumber: 1,
      position: 5,
      externalId: "4ujEHSTeMg1UjA1N4NETbJ",
      externalLink: "https://open.spotify.com/track/4ujEHSTeMg1UjA1N4NETbJ",
    },
  ],
} as const satisfies Track
