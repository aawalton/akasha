import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SomethingJustLikeThisHungarianRhapsodySomethingJustLikeThisHungarian = {
  id: "01a0afa2-1e0f-7c46-bd10-94f9eab115ba",
  type: "page-type/track",
  slug: "the-piano-guys-3-something-just-like-this-hungarian-rhapsody-something-just-like-this-hungarian",
  ownLength: 3.89735,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-something-just-like-this-hungarian-rhapsody"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7tPETW7bPcWw0IpTkeo150",
      externalLink: "https://open.spotify.com/track/7tPETW7bPcWw0IpTkeo150",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Something Just Like This / Hungarian Rhapsody",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1385hLNbrnbCJGokfH2ac2", artistName: "Franz Liszt" },
    { externalId: "2R0YxXQyGLURmOrY26P1kZ", artistName: "Guy Berryman" },
    { externalId: "6ZK1R7WvOURjOviPQkVJEm", artistName: "Jonathan Buckland" },
    { externalId: "2DXdrllW1KAUjT9KJsB9NH", artistName: "William Champion" },
    { externalId: "4ynr4Nw2OMdLugbiYZOqcE", artistName: "Chris Martin" },
    { externalId: "0fztDa29WvYXWSGqU2kLEF", artistName: "Andrew Taggart" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey:
    "somethingjustlikethishungarianrhapsody|0fztDa29WvYXWSGqU2kLEF,0jW6R8CVyVohuUJVcuweDI,1385hLNbrnbCJGokfH2ac2,2DXdrllW1KAUjT9KJsB9NH,2R0YxXQyGLURmOrY26P1kZ,4ynr4Nw2OMdLugbiYZOqcE,6ZK1R7WvOURjOviPQkVJEm|233841",
  song: "song/the-piano-guys-something-just-like-this-hungarian-rhapsody",
} as const satisfies Track
