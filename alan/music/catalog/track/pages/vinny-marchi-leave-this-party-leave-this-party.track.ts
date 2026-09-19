import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiLeaveThisPartyLeaveThisParty = {
  id: "01a0b112-96f8-7b00-927d-fbc8c30161db",
  type: "page-type/track",
  slug: "vinny-marchi-leave-this-party-leave-this-party",
  ownLength: 3.99125,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-leave-this-party"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2knVmukUYh6iltBr9cvvBV",
      externalLink: "https://open.spotify.com/track/2knVmukUYh6iltBr9cvvBV",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Leave This Party",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "leavethisparty|5USAMqcbMAzF3HBmeD5pJF|239475",
  song: "song/vinny-marchi-leave-this-party",
} as const satisfies Track
