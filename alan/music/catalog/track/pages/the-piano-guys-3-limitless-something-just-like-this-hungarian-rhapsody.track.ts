import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessSomethingJustLikeThisHungarianRhapsody = {
  id: "01a0afa2-0e0a-7096-b51e-a3ee23fa0336",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-something-just-like-this-hungarian-rhapsody",
  ownLength: 3.89735,
  ownProgress: 3.89735,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  status: "completed",
  unit: "unit/minutes",
  title: "Something Just Like This / Hungarian Rhapsody",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "somethingjustlikethishungarianrhapsody|0jW6R8CVyVohuUJVcuweDI|233841",
  song: "song/the-piano-guys-something-just-like-this-hungarian-rhapsody",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-limitless",
      discNumber: 1,
      position: 1,
      externalId: "6bdy5pGNFPIvWpLIJklKaj",
      externalLink: "https://open.spotify.com/track/6bdy5pGNFPIvWpLIJklKaj",
    },
  ],
} as const satisfies Track
