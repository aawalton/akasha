import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2NollaigAChristmasJourneyWexfordCarol = {
  id: "01a0abea-508a-7f8f-89e5-85937efc561b",
  type: "page-type/track",
  slug: "celtic-woman-2-nollaig-a-christmas-journey-wexford-carol",
  ownLength: 4.157516666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-nollaig-a-christmas-journey"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "27HXHanElzInmh8bOo3eFL",
      externalLink: "https://open.spotify.com/track/27HXHanElzInmh8bOo3eFL",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Wexford Carol",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "wexfordcarol|6NWtt9pNOL2Gx7kBykdE5x|249451",
  song: "song/celtic-woman-wexford-carol",
} as const satisfies Track
