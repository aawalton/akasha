import { ACHIEVEMENT_ITEMS } from "../map-pins-achievement-items/map-pins-achievement-items.module.code.ts"
import { ANCESTRAL_TOMB_RUBBING } from "../map-pins-ancestral-tomb-rubbing/map-pins-ancestral-tomb-rubbing.module.code.ts"
import { CHRONOGLER_TABLET } from "../map-pins-chronogler-tablet/map-pins-chronogler-tablet.module.code.ts"
import { CUSTOM_PINS } from "../map-pins-config/map-pins-config.module.code.ts"
import type { NumberMap } from "../map-pins-data-types/map-pins-data-types.module.code.ts"
import { INSTRUMENTS } from "../map-pins-instruments/map-pins-instruments.module.code.ts"
import { MINING_SAMPLE_COLLECTOR } from "../map-pins-mining-sample-collector/map-pins-mining-sample-collector.module.code.ts"
import { MURAL_MENDER_FRAGMENTS } from "../map-pins-mural-mender-fragments/map-pins-mural-mender-fragments.module.code.ts"
import { PIECES_OF_HISTORY } from "../map-pins-pieces-of-history/map-pins-pieces-of-history.module.code.ts"
import { PRECURSOR_ITEMS } from "../map-pins-precursor-items/map-pins-precursor-items.module.code.ts"
import { RELICS_OF_SUMMERSET } from "../map-pins-relics-of-summerset/map-pins-relics-of-summerset.module.code.ts"
import { getPinTypeId } from "../map-pins-state/map-pins-state.module.code.ts"
import { WROTHGAR_RELICS } from "../map-pins-wrothgar-relics/map-pins-wrothgar-relics.module.code.ts"

const ancestralTombRubbing: NumberMap = ANCESTRAL_TOMB_RUBBING
const wrothgarRelics: NumberMap = WROTHGAR_RELICS
const relicsOfSummerset: NumberMap = RELICS_OF_SUMMERSET
const precursorItems: NumberMap = PRECURSOR_ITEMS
const chronoglerTablet: NumberMap = CHRONOGLER_TABLET
const muralMenderFragments: NumberMap = MURAL_MENDER_FRAGMENTS
const piecesOfHistory: NumberMap = PIECES_OF_HISTORY
const instruments: NumberMap = INSTRUMENTS
const miningSampleCollector: NumberMap = MINING_SAMPLE_COLLECTOR

function mark(this: void, achId: number, index: number): undefined {
  const inner = ACHIEVEMENT_ITEMS[achId]
  if (inner !== undefined) inner[index] = true
}

function refreshCompass(this: void, n: number): undefined {
  const pin = CUSTOM_PINS[n]
  if (pin === undefined) return
  if (COMPASS_PINS !== undefined) COMPASS_PINS.RefreshPins(pin.name)
}

export function onLootReceived(
  this: void,
  _eventCode: number,
  _receivedBy: string,
  _itemName: string,
  _quantity: number,
  _itemSound: number,
  lootType: number,
  _lootedBySelf: boolean,
  _isPickpocketLoot: boolean,
  _questItemIcon: unknown,
  itemId: number
): undefined {
  if (lootType !== LOOT_TYPE_ITEM && lootType !== LOOT_TYPE_QUEST_ITEM) return
  const ancestral = ancestralTombRubbing[itemId]
  const wrothgar = wrothgarRelics[itemId]
  const summerset = relicsOfSummerset[itemId]
  const precursor = precursorItems[itemId]
  const chronogler = chronoglerTablet[itemId]
  const mural = muralMenderFragments[itemId]
  const history = piecesOfHistory[itemId]
  const instrument = instruments[itemId]
  const mining = miningSampleCollector[itemId]
  if (ancestral !== undefined) {
    mark(1712, ancestral)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(51))
    refreshCompass(51)
  } else if (wrothgar !== undefined) {
    mark(1250, wrothgar)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(47))
    refreshCompass(47)
  } else if (summerset !== undefined) {
    mark(2099, summerset)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(53))
    refreshCompass(53)
  } else if (precursor !== undefined) {
    mark(1958, precursor)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(56))
    refreshCompass(56)
  } else if (chronogler !== undefined) {
    mark(2320, chronogler)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(57))
    refreshCompass(57)
  } else if (mural !== undefined) {
    mark(2463, mural)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(63))
    refreshCompass(63)
  } else if (history !== undefined) {
    mark(2534, history)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(64))
    refreshCompass(64)
  } else if (instrument !== undefined) {
    mark(2669, instrument)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(68))
    refreshCompass(68)
  } else if (mining !== undefined) {
    mark(2759, mining)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(69))
    refreshCompass(69)
  }
}
