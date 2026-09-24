import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2CharlieBrownMedley = {
  id: "01a0afa2-20ef-7925-84dd-65d74dbbc67d",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-charlie-brown-medley",
  ownLength: 3.066666666666667,
  ownProgress: 3.066666666666667,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Charlie Brown Medley",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "charliebrownmedley|0jW6R8CVyVohuUJVcuweDI|184000",
  song: "song/the-piano-guys-charlie-brown-medley",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys-2",
      discNumber: 1,
      position: 9,
      externalId: "1JTKFpBQZDTyBmJMz2CK6t",
      externalLink: "https://open.spotify.com/track/1JTKFpBQZDTyBmJMz2CK6t",
    },
  ],
} as const satisfies Track
