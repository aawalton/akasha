import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiLeaveThisPartyLeaveThisParty = {
  id: "01a0b112-96f8-7b00-927d-fbc8c30161db",
  type: "page-type/track",
  slug: "vinny-marchi-leave-this-party-leave-this-party",
  ownLength: 3.99125,
  ownProgress: 3.99125,
  partOfCollections: ["release/vinny-marchi-leave-this-party"],
  status: "completed",
  unit: "unit/minutes",
  title: "Leave This Party",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "leavethisparty|5USAMqcbMAzF3HBmeD5pJF|239475",
  song: "song/vinny-marchi-leave-this-party",
  carriedBy: [
    {
      release: "release/vinny-marchi-leave-this-party",
      discNumber: 1,
      position: 1,
      externalId: "2knVmukUYh6iltBr9cvvBV",
      externalLink: "https://open.spotify.com/track/2knVmukUYh6iltBr9cvvBV",
    },
  ],
} as const satisfies Track
