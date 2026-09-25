import type { PlayerAnswers } from "akasha/temper/capture/player-answer/modules/player-answer-descriptor/player-answer-descriptor.module.code.ts"
import {
  ACTION_DEVICE,
  ACTION_NAME,
  ACTION_SLOT,
  BAG,
  BAG_SLOT,
  CURRENCY,
  CURRENCY_HELD,
  EQUIP_SLOT,
  GUILD,
  GUILD_INDEX,
  HOTBAR,
  HOTBAR_SLOT,
  ITEM_LINK,
  LAYER,
  LAYER_ACTION,
  LAYER_BINDING,
  LAYER_CATEGORY,
  MAP,
  MAP_INDEX,
  NO_VALUES,
  SETTING,
  UNIT,
  UNIT_BUFF,
  ZONE,
  ZONE_INDEX,
} from "akasha/temper/capture/player-answer/modules/player-asking-shapes/player-asking-shapes.module.code.ts"
import { PLAYER_ASKINGS } from "akasha/temper/capture/player-answer/modules/player-askings/player-askings.data-table.code.ts"
import type { EngineAnswer } from "akasha/temper/capture/shape/modules/engine-answer-catalog/engine-answer-catalog.module.code.ts"
import {
  type AskedValue,
  answersOf,
} from "akasha/temper/capture/writer/modules/function-answers/function-answers.module.code.ts"
import { runBatched } from "akasha/temper/capture/writer/modules/run-batched/run-batched.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

interface Asking {
  readonly shape: string
  readonly values: AskedValue[]
}

type Adding = (this: void, shape: string, values: AskedValue[]) => undefined

const UNITS: readonly string[] = ["player", "companion"]

const BAGS: readonly string[] = [
  "BAG_WORN",
  "BAG_BACKPACK",
  "BAG_BANK",
  "BAG_SUBSCRIBER_BANK",
  "BAG_VIRTUAL",
  "BAG_COMPANION_WORN",
]

const VIRTUAL_BAG = "BAG_VIRTUAL"

const HOTBARS: readonly string[] = [
  "HOTBAR_CATEGORY_PRIMARY",
  "HOTBAR_CATEGORY_BACKUP",
  "HOTBAR_CATEGORY_OVERLOAD",
  "HOTBAR_CATEGORY_WEREWOLF",
  "HOTBAR_CATEGORY_TEMPORARY",
  "HOTBAR_CATEGORY_DAEDRIC_ARTIFACT",
  "HOTBAR_CATEGORY_COMPANION",
  "HOTBAR_CATEGORY_QUICKSLOT_WHEEL",
  "HOTBAR_CATEGORY_CHAMPION",
]

const LOCATIONS: readonly string[] = [
  "CURRENCY_LOCATION_CHARACTER",
  "CURRENCY_LOCATION_BANK",
  "CURRENCY_LOCATION_ACCOUNT",
  "CURRENCY_LOCATION_GUILD_BANK",
]

const DEVICES: readonly string[] = [
  "PREFERRED_INPUT_DEVICE_TYPE_GAMEPAD",
  "PREFERRED_INPUT_DEVICE_TYPE_KEYBOARD",
  "PREFERRED_INPUT_DEVICE_TYPE_KEYBOARD_OR_MOUSE",
  "PREFERRED_INPUT_DEVICE_TYPE_MOUSE",
]

const SETTING_NAMED = "_SETTING_"

const SETTING_TYPE_NAMED = "SETTING_TYPE_"

const CHOICE_NAMED = "_CHOICE_"

const LAST_ACTION_SLOT = 12

const PER_BATCH = 20

const BATCH_DELAY = 0

const FIRST = 1

const NOTHING = 0

function emptyAnswer(this: void, one: EngineAnswer): boolean {
  return one === false || one === NOTHING || one === ""
}

function answerOf(this: void, name: string, values: readonly AskedValue[], at = 0): unknown {
  return answersOf(name, values)?.[at]
}

function numberOf(this: void, name: string, values: readonly AskedValue[] = [], at = 0): number {
  const got = answerOf(name, values, at)
  return typeof got === "number" ? got : NOTHING
}

function constantsOf(this: void, names: readonly string[]): number[] {
  const found: number[] = []
  for (const name of names) {
    const held: unknown = _G[name]
    if (typeof held === "number") found[found.length] = held
  }
  return found
}

function fromTo(this: void, first: number, last: number): number[] {
  const found: number[] = []
  for (let at = first; at <= last; at += 1) found[found.length] = at
  return found
}

function virtualSlots(this: void): number[] {
  const found: number[] = []
  let at = answerOf("GetNextVirtualBagSlotId", [])
  while (typeof at === "number") {
    found[found.length] = at
    at = answerOf("GetNextVirtualBagSlotId", [at])
  }
  return found
}

function slotsOf(this: void, bag: number, virtualBag: number | undefined): number[] {
  if (bag === virtualBag) return virtualSlots()
  const found: number[] = []
  const size = numberOf("GetBagSize", [bag])
  for (let slot = 0; slot < size; slot += 1) {
    if (answerOf("HasItemInSlot", [bag, slot]) === true) found[found.length] = slot
  }
  return found
}

function bagAskings(this: void, add: Adding): undefined {
  const virtualBag = constantsOf([VIRTUAL_BAG])[0]
  const seen: Record<string, boolean> = {}
  for (const bag of constantsOf(BAGS)) {
    add(BAG, [bag])
    for (const slot of slotsOf(bag, virtualBag)) {
      add(BAG_SLOT, [bag, slot])
      const link = answerOf("GetItemLink", [bag, slot])
      if (typeof link !== "string" || link === "" || seen[link] === true) continue
      seen[link] = true
      add(ITEM_LINK, [link])
    }
  }
  const [firstSlot = NOTHING, lastSlot = NOTHING] = constantsOf([
    "EQUIP_SLOT_ITERATION_BEGIN",
    "EQUIP_SLOT_ITERATION_END",
  ])
  for (const slot of fromTo(firstSlot, lastSlot)) add(EQUIP_SLOT, [slot])
  return undefined
}

function barAskings(this: void, add: Adding): undefined {
  const slots = fromTo(FIRST, LAST_ACTION_SLOT)
  for (const slot of slots) add(ACTION_SLOT, [slot])
  for (const bar of constantsOf(HOTBARS)) {
    add(HOTBAR, [bar])
    for (const slot of slots) add(HOTBAR_SLOT, [slot, bar])
  }
  return undefined
}

function currencyAskings(this: void, add: Adding): undefined {
  const [firstCurrency = NOTHING, lastCurrency = NOTHING] = constantsOf([
    "CURT_ITERATION_BEGIN",
    "CURT_ITERATION_END",
  ])
  const locations = constantsOf(LOCATIONS)
  for (const currency of fromTo(firstCurrency, lastCurrency)) {
    add(CURRENCY, [currency])
    for (const location of locations) add(CURRENCY_HELD, [currency, location])
  }
  return undefined
}

function placeAskings(this: void, add: Adding): undefined {
  const zoneIndices = [numberOf("GetUnitZoneIndex", ["player"]), numberOf("GetCurrentMapZoneIndex")]
  const zones = [numberOf("GetUnitWorldPosition", ["player"])]
  for (const zoneIndex of zoneIndices) {
    add(ZONE_INDEX, [zoneIndex])
    zones[zones.length] = numberOf("GetZoneId", [zoneIndex])
  }
  const seen: Record<number, boolean> = {}
  for (const zone of zones) {
    if (seen[zone] === true) continue
    seen[zone] = true
    add(ZONE, [zone])
  }
  add(MAP_INDEX, [numberOf("GetCurrentMapIndex")])
  add(MAP, [numberOf("GetCurrentMapId")])
  return undefined
}

function actionAskings(
  this: void,
  add: Adding,
  named: unknown,
  devices: readonly number[]
): undefined {
  if (typeof named !== "string" || named === "") return undefined
  add(ACTION_NAME, [named])
  for (const device of devices) add(ACTION_DEVICE, [named, device])
  return undefined
}

function keyAskings(this: void, add: Adding): undefined {
  const bindings = fromTo(FIRST, numberOf("GetMaxBindingsPerAction"))
  const devices = constantsOf(DEVICES)
  for (const layer of fromTo(FIRST, numberOf("GetNumActionLayers"))) {
    add(LAYER, [layer])
    for (const category of fromTo(FIRST, numberOf("GetActionLayerInfo", [layer], 1))) {
      add(LAYER_CATEGORY, [layer, category])
      const actions = numberOf("GetActionLayerCategoryInfo", [layer, category], 1)
      for (const action of fromTo(FIRST, actions)) {
        add(LAYER_ACTION, [layer, category, action])
        for (const one of bindings) add(LAYER_BINDING, [layer, category, action, one])
        actionAskings(add, answerOf("GetActionInfo", [layer, category, action]), devices)
      }
    }
  }
  return undefined
}

function settingIds(this: void): number[] {
  const seen: Record<number, boolean> = {}
  const found: number[] = []
  for (const name in _G) {
    if (!name.includes(SETTING_NAMED) || name.startsWith(SETTING_TYPE_NAMED)) continue
    if (name.includes(CHOICE_NAMED)) continue
    const held: unknown = _G[name]
    if (typeof held !== "number" || seen[held] === true) continue
    seen[held] = true
    found[found.length] = held
  }
  return found
}

function settingAskings(this: void, add: Adding): undefined {
  const [firstType = NOTHING, lastType = NOTHING] = constantsOf([
    "SETTING_TYPE_ITERATION_BEGIN",
    "SETTING_TYPE_ITERATION_END",
  ])
  const ids = settingIds()
  for (const system of fromTo(firstType, lastType)) {
    for (const id of ids) add(SETTING, [system, id])
  }
  return undefined
}

function askingsNow(this: void): Asking[] {
  const found: Asking[] = []
  function add(this: void, shape: string, values: AskedValue[]): undefined {
    found[found.length] = { shape, values }
    return undefined
  }
  add(NO_VALUES, [])
  for (const unit of UNITS) {
    add(UNIT, [unit])
    for (const buff of fromTo(FIRST, numberOf("GetNumBuffs", [unit]))) add(UNIT_BUFF, [unit, buff])
  }
  bagAskings(add)
  for (const guildIndex of fromTo(FIRST, numberOf("GetNumGuilds"))) {
    add(GUILD_INDEX, [guildIndex])
    add(GUILD, [numberOf("GetGuildId", [guildIndex])])
  }
  barAskings(add)
  currencyAskings(add)
  placeAskings(add)
  keyAskings(add)
  settingAskings(add)
  return found
}

export function capturePlayerAnswers(
  this: void,
  onDone: (this: void, answers: PlayerAnswers) => undefined
): undefined {
  const answers: PlayerAnswers = {}
  runBatched<Asking>({
    items: askingsNow(),
    batchSize: PER_BATCH,
    batchDelay: BATCH_DELAY,
    process: function (this: void, asking: Asking): undefined {
      const key = asking.values.join(",")
      const held = answers[key] ?? {}
      for (const name of PLAYER_ASKINGS[asking.shape] ?? []) {
        const got = answersOf(name, asking.values)
        if (got === undefined || (got.length > 0 && got.every(emptyAnswer))) continue
        held[name] = got
        answers[key] = held
      }
      return undefined
    },
    onComplete: function (this: void): undefined {
      onDone(answers)
      return undefined
    },
  })
  return undefined
}
