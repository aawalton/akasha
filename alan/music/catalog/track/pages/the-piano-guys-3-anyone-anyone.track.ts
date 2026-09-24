import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AnyoneAnyone = {
  id: "01a0afa2-067b-7fb1-834e-721889dd9480",
  type: "page-type/track",
  slug: "the-piano-guys-3-anyone-anyone",
  ownLength: 3.6998,
  ownProgress: 3.6998,
  partOfCollections: [
    "release/the-piano-guys-3-anyone",
    "release/the-piano-guys-3-chill",
    "release/the-piano-guys-3-wedding-season",
    "release/the-piano-guys-piano-focus",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Anyone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "anyone|0jW6R8CVyVohuUJVcuweDI|221988",
  song: "song/the-piano-guys-anyone",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-anyone",
      discNumber: 1,
      position: 1,
      externalId: "6WIRN90YrKdDooT1H7Yo3c",
      externalLink: "https://open.spotify.com/track/6WIRN90YrKdDooT1H7Yo3c",
    },
    {
      release: "release/the-piano-guys-3-chill",
      discNumber: 1,
      position: 13,
      externalId: "756F9H7o6Kao9Gfpzw3RDF",
      externalLink: "https://open.spotify.com/track/756F9H7o6Kao9Gfpzw3RDF",
    },
    {
      release: "release/the-piano-guys-3-wedding-season",
      discNumber: 1,
      position: 13,
      externalId: "5LBWVpIqKo9m3pfADLIfQ6",
      externalLink: "https://open.spotify.com/track/5LBWVpIqKo9m3pfADLIfQ6",
    },
    {
      release: "release/the-piano-guys-piano-focus",
      discNumber: 1,
      position: 10,
      externalId: "6QRLIaRPm8gUN6cl6cY1LQ",
      externalLink: "https://open.spotify.com/track/6QRLIaRPm8gUN6cl6cY1LQ",
    },
  ],
} as const satisfies Track
