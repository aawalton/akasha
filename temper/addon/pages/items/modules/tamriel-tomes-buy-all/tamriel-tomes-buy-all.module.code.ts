import { requireAt } from "akasha/code/type/narrowing/modules/require-at/require-at.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const TOMES_SCENE = "TamrielTomesSceneKeyboard"
const NS = `${ADDON_NAME}_TomesBuyAll`
const SETTLE_TIMEOUT_MS = 5000

interface ActiveTome {
  readonly index: number
  readonly trackId: number
}

interface TomeReward {
  readonly tier: number
  readonly component: RewardTrackComponent
  readonly index: number
  readonly cost: number
}

function activeTome(this: void): ActiveTome | undefined {
  if (!IsTamrielTomesEnabled()) return undefined
  const type = REWARD_TRACK_TYPE_TAMRIEL_TOMES
  const [tomeId] = GetActiveReferenceTrackIdsForRewardTrackType(type)
  if (tomeId === undefined) return undefined
  const index = GetReferenceTrackIndex(type, tomeId)
  if (index === undefined) return undefined
  return { index, trackId: GetRewardTrackIdFromReferenceTrackId(type, tomeId) }
}

function unboughtRewards(this: void, tome: ActiveTome): TomeReward[] {
  const type = REWARD_TRACK_TYPE_TAMRIEL_TOMES
  const [, currentTier] = GetInfoForRewardTrack(type, tome.index)
  const totalTiers = GetTotalNumTiersForRewardTrack(tome.trackId)
  const lastTier = currentTier < totalTiers ? currentTier : totalTiers
  const components = [REWARD_TRACK_COMPONENT_PRIMARY, REWARD_TRACK_COMPONENT_SECONDARY]
  const rewards: TomeReward[] = []
  for (let tier = 1; tier <= lastTier; tier++) {
    for (const component of components) {
      if (!HasAccessToRewardTrackComponent(type, tome.index, component)) continue
      const count = GetNumRewardsAtRewardTrackTier(tome.trackId, tier, component)
      for (let index = 1; index <= count; index++) {
        const [isClaimed, , repeats] = GetRewardTrackRewardClaimedState(
          type,
          tome.index,
          tier,
          component,
          index
        )
        if (isClaimed || repeats) continue
        const [, , cost] = GetTamrielTomesRewardInfo(tome.trackId, tier, component, index)
        rewards.push({ tier, component, index, cost })
      }
    }
  }
  return rewards
}

let buying = false

function buyAll(this: void): undefined {
  if (buying) return
  const tome = activeTome()
  if (tome === undefined) {
    d(`[${ADDON_NAME}] There is no active Tamriel Tome.`)
    return
  }
  const queue = unboughtRewards(tome)
  if (queue.length === 0) {
    d(`[${ADDON_NAME}] Every Tamriel Tome reward you have reached is already bought.`)
    return
  }
  buying = true
  const tomeIndex = tome.index
  let next = 0
  let bought = 0
  let spent = 0
  let unaffordable = 0
  let attempt = 0
  let waiting: TomeReward | undefined

  function finish(this: void, note: string): undefined {
    buying = false
    waiting = undefined
    EVENT_MANAGER.UnregisterForEvent(`${NS}_Bought`, EVENT_REWARD_TRACK_REWARD_CLAIMED)
    EVENT_MANAGER.UnregisterForEvent(`${NS}_Result`, EVENT_CLAIM_REWARD_RESULT)
    const passed = unaffordable > 0 ? `, ${unaffordable} passed over for lack of Tome Points` : ""
    d(
      `[${ADDON_NAME}] Bought ${bought} Tamriel Tome reward(s) for ${spent} Tome Points${passed}.${note}`
    )
  }

  function buyNext(this: void): undefined {
    while (next < queue.length) {
      const reward = requireAt(queue, next, "queue")
      next++
      if (GetPlayerStoredCurrencyAmount(CURT_TOME_POINTS) < reward.cost) {
        unaffordable++
        continue
      }
      waiting = reward
      attempt++
      const thisAttempt = attempt
      ClaimRewardTrackReward(
        REWARD_TRACK_TYPE_TAMRIEL_TOMES,
        tomeIndex,
        reward.tier,
        reward.component,
        reward.index
      )
      zo_callLater(() => {
        if (waiting !== undefined && attempt === thisAttempt) finish(" The game stopped answering.")
      }, SETTLE_TIMEOUT_MS)
      return
    }
    finish("")
  }

  EVENT_MANAGER.RegisterForEvent(
    `${NS}_Bought`,
    EVENT_REWARD_TRACK_REWARD_CLAIMED,
    function (this: void): undefined {
      const reward = waiting
      if (reward === undefined) return
      waiting = undefined
      bought++
      spent += reward.cost
      buyNext()
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    `${NS}_Result`,
    EVENT_CLAIM_REWARD_RESULT,
    function (this: void, _eventCode: number, result: number): undefined {
      if (waiting === undefined || result === CLAIM_REWARD_RESULT_SUCCESS) return
      waiting = undefined
      if (result === CLAIM_REWARD_RESULT_ITEM_NOT_ENOUGH_SPACE) {
        finish(" Your bags are full.")
        return
      }
      d(
        `[${ADDON_NAME}] A Tamriel Tome reward was refused: ${GetString("SI_CLAIMREWARDRESULT", result)}`
      )
      buyNext()
    }
  )
  buyNext()
}

export function registerTomesBuyAll(this: void): undefined {
  const scene = SCENE_MANAGER.scenes[TOMES_SCENE]
  if (scene === undefined) return
  const keybinds: KeybindButtonGroupDescriptor[] = [
    {
      alignment: KEYBIND_STRIP_ALIGN_LEFT,
      name: "Buy All Rewards",
      keybind: "UI_SHORTCUT_QUATERNARY",
      callback: buyAll,
    },
  ]
  scene.RegisterCallback(
    "StateChange",
    function (this: void, _old: number, newState: number): undefined {
      if (newState === SCENE_SHOWING) KEYBIND_STRIP.AddKeybindButtonGroup(keybinds)
      else if (newState === SCENE_HIDDEN) KEYBIND_STRIP.RemoveKeybindButtonGroup(keybinds)
    }
  )
}
