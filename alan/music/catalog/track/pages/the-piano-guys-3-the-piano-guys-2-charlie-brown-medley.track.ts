import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2CharlieBrownMedley = {
  id: "01a0afa2-20ef-7925-84dd-65d74dbbc67d",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-charlie-brown-medley",
  ownLength: 3.066666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1JTKFpBQZDTyBmJMz2CK6t",
      externalLink: "https://open.spotify.com/track/1JTKFpBQZDTyBmJMz2CK6t",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Charlie Brown Medley",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "charliebrownmedley|0jW6R8CVyVohuUJVcuweDI|184000",
} as const satisfies Track
