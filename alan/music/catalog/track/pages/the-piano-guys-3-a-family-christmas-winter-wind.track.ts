import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasWinterWind = {
  id: "01a0afa2-185c-7a33-a674-c11a6ae4663b",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-winter-wind",
  ownLength: 4.445416666666667,
  ownProgress: 4.445416666666667,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Winter Wind",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Steven Sharp Nelson" },
    { artistName: "Jon Schmidt" },
    { artist: "artist/the-piano-guys" },
  ],
  trackKey:
    "winterwind|0jW6R8CVyVohuUJVcuweDI,2YQ4MY2VwOMv43C0GemUY5,67CqEIMpWuNb6MnpTKjlFv|266725",
  song: "song/the-piano-guys-winter-wind",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-a-family-christmas",
      discNumber: 1,
      position: 11,
      externalId: "6vp9J0CECnsA3PRxasHhEM",
      externalLink: "https://open.spotify.com/track/6vp9J0CECnsA3PRxasHhEM",
    },
  ],
} as const satisfies Track
