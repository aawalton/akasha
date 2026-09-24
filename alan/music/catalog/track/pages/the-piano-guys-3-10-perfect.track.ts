import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310Perfect = {
  id: "01a0afa2-0d38-7231-a416-99d0c74f5680",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-perfect",
  ownLength: 5.141666666666667,
  ownProgress: 5.141666666666667,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-3-classical-love-romance",
    "release/the-piano-guys-3-pop-on-piano",
    "release/the-piano-guys-the-piano-guys-solo-sessions-jon-schmidt-vol-1",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Perfect",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "perfect|0jW6R8CVyVohuUJVcuweDI|308500",
  song: "song/the-piano-guys-perfect",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 10,
      externalId: "6qCPoeANdkJhsHlqyl37X7",
      externalLink: "https://open.spotify.com/track/6qCPoeANdkJhsHlqyl37X7",
    },
    {
      release: "release/the-piano-guys-3-classical-love-romance",
      discNumber: 1,
      position: 7,
      externalId: "29gW8p46nOvvkphl6AXamd",
      externalLink: "https://open.spotify.com/track/29gW8p46nOvvkphl6AXamd",
    },
    {
      release: "release/the-piano-guys-3-pop-on-piano",
      discNumber: 1,
      position: 13,
      externalId: "7sflRilNpQtJr7LKbFImet",
      externalLink: "https://open.spotify.com/track/7sflRilNpQtJr7LKbFImet",
    },
    {
      release: "release/the-piano-guys-the-piano-guys-solo-sessions-jon-schmidt-vol-1",
      discNumber: 1,
      position: 8,
      externalId: "0g8r0qnaaVbLGUUw9n0l82",
      externalLink: "https://open.spotify.com/track/0g8r0qnaaVbLGUUw9n0l82",
    },
  ],
} as const satisfies Track
