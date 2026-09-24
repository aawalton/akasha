import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityJustTheWayYouAre = {
  id: "01a0afa2-097f-789a-bf88-ca5196a04f52",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-just-the-way-you-are",
  ownLength: 4.370666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Just the Way You Are",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "justthewayyouare|0jW6R8CVyVohuUJVcuweDI|262240",
  song: "song/the-piano-guys-just-the-way-you-are",
  carriedBy: [
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 10,
      externalId: "1f34b8HCyxc7dNNVJC9ivJ",
      externalLink: "https://open.spotify.com/track/1f34b8HCyxc7dNNVJC9ivJ",
    },
  ],
} as const satisfies Track
