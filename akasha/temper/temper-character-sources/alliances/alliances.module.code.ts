import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface Alliance {
  id: string
  name: string
  esoAllianceId: number
}

const ALLIANCE_DATA = {
  "no-alliance": { id: "no-alliance", name: "No Alliance", esoAllianceId: 0 },
  "aldmeri-dominion": { id: "aldmeri-dominion", name: "Aldmeri Dominion", esoAllianceId: 1 },
  "ebonheart-pact": { id: "ebonheart-pact", name: "Ebonheart Pact", esoAllianceId: 2 },
  "daggerfall-covenant": {
    id: "daggerfall-covenant",
    name: "Daggerfall Covenant",
    esoAllianceId: 3,
  },
} as const satisfies Record<string, Alliance>

export const alliances = createDataFile<Alliance>()(ALLIANCE_DATA)

export type AllianceId = (typeof alliances.ids)[number]
