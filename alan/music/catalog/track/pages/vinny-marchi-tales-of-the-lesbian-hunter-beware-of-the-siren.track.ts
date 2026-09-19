import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTalesOfTheLesbianHunterBewareOfTheSiren = {
  id: "01a0b112-920f-728b-a8dc-9f11d4798ae4",
  type: "page-type/track",
  slug: "vinny-marchi-tales-of-the-lesbian-hunter-beware-of-the-siren",
  ownLength: 2.97065,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-tales-of-the-lesbian-hunter"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7BA7IU3c0oItfFL5DHOiSD",
      externalLink: "https://open.spotify.com/track/7BA7IU3c0oItfFL5DHOiSD",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Beware of the Siren",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "bewareofthesiren|5USAMqcbMAzF3HBmeD5pJF|178239",
  song: "song/vinny-marchi-beware-of-the-siren",
} as const satisfies Track
