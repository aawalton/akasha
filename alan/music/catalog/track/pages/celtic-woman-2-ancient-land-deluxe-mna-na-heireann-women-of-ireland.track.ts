import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeMnaNaHeireannWomenOfIreland = {
  id: "01a0abea-5915-7af4-8e8b-b82028358595",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-mna-na-heireann-women-of-ireland",
  ownLength: 4.001766666666667,
  ownProgress: 4.001766666666667,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land-deluxe",
    "release/celtic-woman-2-ancient-land",
  ],
  position: 7,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3FrOEslRrmHa93zgMlhxd2",
      externalLink: "https://open.spotify.com/track/3FrOEslRrmHa93zgMlhxd2",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Mná Na hÉireann (Women Of Ireland)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "mnanaheireannwomenofireland|6NWtt9pNOL2Gx7kBykdE5x|240106",
  song: "song/celtic-woman-mna-na-heireann-women-of-ireland",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 7,
      externalId: "6iXSuZPjHzX0BAZsELH1N2",
      externalLink: "https://open.spotify.com/track/6iXSuZPjHzX0BAZsELH1N2",
    },
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 7,
      externalId: "3FrOEslRrmHa93zgMlhxd2",
      externalLink: "https://open.spotify.com/track/3FrOEslRrmHa93zgMlhxd2",
    },
  ],
} as const satisfies Track
