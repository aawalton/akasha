import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-trials-b-reach/combat-alerts-trials-b-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchSunspire {
    Test: (this: void, abilityId: number) => void
    ShowNahvPortal: (this: void) => void
    StopNahvPortal: (this: void) => void
    RegisterNahvPortal: (this: void) => void
    UnregisterNahvPortal: (this: void) => void
  }
}

const SS = CRUTCH.Sunspire

const CONE = 121422
const NEGATE = 121411
const METEOR = 121074
const PINS = 121436
const KITE = 121271

const SERVANT_IDS: Record<number, string> = {
  [CONE]: "fff1ab",
  [NEGATE]: "9447ff",
  [METEOR]: "3a9dd6",
  [PINS]: "ff00ff",
  [KITE]: "8ef5f5",
}

interface ServantPins {
  id: number
  name: string
}

const SERVANT_SEQUENCE: (number | ServantPins)[] = [
  CONE,
  NEGATE,
  CONE,
  CONE,
  { id: PINS, name: zo_strformat("<<C:1>> (0)", GetAbilityName(PINS)) },
  METEOR,
  KITE,
  NEGATE,
  CONE,
  CONE,
  { id: PINS, name: zo_strformat("<<C:1>> (1)", GetAbilityName(PINS)) },
  METEOR,
  KITE,
  NEGATE,
  CONE,
  CONE,
  { id: PINS, name: zo_strformat("<<C:1>> (2)", GetAbilityName(PINS)) },
  METEOR,
  KITE,
  NEGATE,
  CONE,
  CONE,
  { id: PINS, name: zo_strformat("<<C:1>> |cFF0000(3!!!)", GetAbilityName(PINS)) },
]

function getServantAbilityInfo(
  this: void,
  index: number
): LuaMultiReturn<[number | undefined, string | undefined]> {
  const info = SERVANT_SEQUENCE[index - 1]
  if (info === undefined) return $multi(undefined, undefined)

  if (typeof info === "object") {
    return $multi(info.id, info.name)
  }

  return $multi(info, GetAbilityName(info))
}

const SERVANT_INDEX_OFFSET = 10
let nextIndex = 1

function updateDisplay(this: void): undefined {
  CRUTCH.InfoPanel.SetLine(SERVANT_INDEX_OFFSET, "|cCCCCCCUp next:|r", 0.7)

  let [id, name] = getServantAbilityInfo(nextIndex)
  if (id !== undefined) {
    CRUTCH.InfoPanel.SetLine(
      SERVANT_INDEX_OFFSET + 1,
      zo_strformat("|c<<1>><<2>>|r", SERVANT_IDS[id], name)
    )
  } else {
    CRUTCH.InfoPanel.RemoveLine(SERVANT_INDEX_OFFSET + 1)
  }

  ;[id, name] = getServantAbilityInfo(nextIndex + 1)
  if (id !== undefined) {
    CRUTCH.InfoPanel.SetLine(
      SERVANT_INDEX_OFFSET + 2,
      zo_strformat("|c<<1>><<C:2>>|r", SERVANT_IDS[id], name),
      undefined,
      0.6
    )
  } else {
    CRUTCH.InfoPanel.RemoveLine(SERVANT_INDEX_OFFSET + 2)
  }

  ;[id, name] = getServantAbilityInfo(nextIndex + 2)
  if (id !== undefined) {
    CRUTCH.InfoPanel.SetLine(
      SERVANT_INDEX_OFFSET + 3,
      zo_strformat("|c<<1>><<C:2>>|r", SERVANT_IDS[id], name),
      undefined,
      0.3
    )
  } else {
    CRUTCH.InfoPanel.RemoveLine(SERVANT_INDEX_OFFSET + 3)
  }
}

function servantBegin(this: void, hitValue: number | undefined, abilityId: number): undefined {
  if (abilityId === PINS && hitValue !== 2000) return

  const [id, name] = getServantAbilityInfo(nextIndex)
  if (abilityId !== id) {
    CRUTCH.dbgOther(
      "|cFF0000happened out of sequence? " +
        GetAbilityName(abilityId) +
        " current " +
        nextIndex +
        " is " +
        name
    )

    let newIndex: number | undefined
    for (let i = nextIndex; i <= SERVANT_SEQUENCE.length; i++) {
      const [skipId] = getServantAbilityInfo(i)
      if (skipId === abilityId) {
        newIndex = i
        break
      }
    }

    if (newIndex === undefined) {
      CRUTCH.dbgOther("|cFF0000unable to find next matching ability to skip to")
      return
    } else {
      CRUTCH.dbgOther("|cFF4400skipping ahead to index " + newIndex)
      nextIndex = newIndex
    }
  }

  nextIndex = nextIndex + 1

  if (CRUTCH.IsInNahvPortal(CRUTCH.playerGroupTag)) {
    updateDisplay()
  }
}

function onServantBegin(
  this: void,
  _eventCode: number,
  _result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  _sourceName: string,
  _sourceType: number,
  _targetName: string,
  _targetType: number,
  hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  _sourceUnitId: number,
  _targetUnitId: number,
  abilityId: number
): undefined {
  servantBegin(hitValue, abilityId)
}

SS.Test = function (this: void, abilityId) {
  servantBegin(undefined, abilityId)
}

SS.ShowNahvPortal = function (this: void) {
  if (!CRUTCH.savedOptions.sunspire.panel.showPortalNext) return
  updateDisplay()
}

SS.StopNahvPortal = function (this: void) {
  nextIndex = 1
  for (let i = 0; i <= 3; i++) {
    CRUTCH.InfoPanel.StopCount(SERVANT_INDEX_OFFSET + i)
  }
}

SS.RegisterNahvPortal = function (this: void) {
  if (!CRUTCH.savedOptions.sunspire.panel.showPortalNext) return

  nextIndex = 1
  for (const [id] of pairs(SERVANT_IDS)) {
    CRUTCH.RegisterForCombatEvent("SSServant" + id, onServantBegin, ACTION_RESULT_BEGIN, id)
  }
}

SS.UnregisterNahvPortal = function (this: void) {
  nextIndex = 1
  for (const [id] of pairs(SERVANT_IDS)) {
    CRUTCH.UnregisterForCombatEvent("SSServant" + id)
  }
}
