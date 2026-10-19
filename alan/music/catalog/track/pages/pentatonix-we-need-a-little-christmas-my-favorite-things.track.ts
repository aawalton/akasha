import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixWeNeedALittleChristmasMyFavoriteThings = {
  id: "01a1546f-2502-7e96-a87a-c18024071ab2",
  type: "page-type/track",
  slug: "pentatonix-we-need-a-little-christmas-my-favorite-things",
  ownLength: 2.873266666666667,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-we-need-a-little-christmas"],
  status: "not-started",
  unit: "unit/minutes",
  title: "My Favorite Things",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "myfavoritethings|26AHtbjWKiwYzsoGoUZq53|172396",
  song: "song/pentatonix-my-favorite-things",
  carriedBy: [
    {
      release: "release/pentatonix-we-need-a-little-christmas",
      discNumber: 1,
      position: 3,
      externalId: "2myZWpSikELxocaznAz3X1",
      externalLink: "https://open.spotify.com/track/2myZWpSikELxocaznAz3X1",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
