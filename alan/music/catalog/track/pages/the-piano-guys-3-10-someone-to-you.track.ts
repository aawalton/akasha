import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310SomeoneToYou = {
  id: "01a0afa2-0a6d-7856-a455-994d3cd50958",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-someone-to-you",
  ownLength: 3.4433333333333334,
  ownProgress: 3.4433333333333334,
  partOfCollections: ["release/the-piano-guys-3-10", "release/the-piano-guys-3-pop-on-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Someone To You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "someonetoyou|0jW6R8CVyVohuUJVcuweDI|206600",
  song: "song/the-piano-guys-someone-to-you",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 1,
      position: 2,
      externalId: "4myZBpamPz9I9kAsLjIMOD",
      externalLink: "https://open.spotify.com/track/4myZBpamPz9I9kAsLjIMOD",
    },
    {
      release: "release/the-piano-guys-3-pop-on-piano",
      discNumber: 1,
      position: 1,
      externalId: "0wwDnCFc5LaSQ5dZNNjH7c",
      externalLink: "https://open.spotify.com/track/0wwDnCFc5LaSQ5dZNNjH7c",
    },
  ],
} as const satisfies Track
