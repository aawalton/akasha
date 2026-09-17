import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310AvengersPortals = {
  id: "01a0afa2-0b5a-7704-8bc1-1225ebaafee7",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-avengers-portals",
  ownLength: 2.95,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ilWVkgfVdfpdSccLSQ0QQ",
      externalLink: "https://open.spotify.com/track/1ilWVkgfVdfpdSccLSQ0QQ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Avengers/Portals",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "avengersportals|0jW6R8CVyVohuUJVcuweDI|177000",
} as const satisfies Track
