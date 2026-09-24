import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyRiverFlowsInYou = {
  id: "01a0afa1-de11-7a0c-8f9a-088bcdac57d6",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-river-flows-in-you",
  ownLength: 3.1565,
  ownProgress: 3.1565,
  partOfCollections: [
    "release/the-piano-guys-3-lullaby",
    "release/the-piano-guys-3-wedding-season",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "River Flows In You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }, { artistName: "Eli Nelson" }],
  trackKey: "riverflowsinyou|0jW6R8CVyVohuUJVcuweDI,2GCX5sWxp6ZdPZZcrMMky2|189390",
  song: "song/the-piano-guys-river-flows-in-you",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-lullaby",
      discNumber: 1,
      position: 7,
      externalId: "5DwyaU9lBwhOleAgB42Yyk",
      externalLink: "https://open.spotify.com/track/5DwyaU9lBwhOleAgB42Yyk",
    },
    {
      release: "release/the-piano-guys-3-wedding-season",
      discNumber: 1,
      position: 14,
      externalId: "3n9bwVYmldkNFKF9JBLG2l",
      externalLink: "https://open.spotify.com/track/3n9bwVYmldkNFKF9JBLG2l",
    },
  ],
} as const satisfies Track
