import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export type ProminentSound = boolean | string | ((this: void) => void)

export interface ProminentEntry {
  text: string
  color: number[]
  slot: number
  playSound: boolean
  millis?: number
  preMillis?: number
  zoneIds?: Record<number, boolean>
}

export interface ProminentDisplayData {
  text: string
  color: number[]
  slot: number
  playSound?: ProminentSound
  millis?: number
}

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    prominent: Record<number, ProminentEntry>
    prominentDisplaying: Record<number, number>
    DisplayProminent: (this: void, abilityId: number) => void
    DisplayProminentSpin: (
      this: void,
      text: string,
      color?: number[],
      slot?: number,
      mute?: boolean
    ) => void
    DisplayProminent2: (
      this: void,
      abilityId: number,
      data: ProminentDisplayData | undefined
    ) => void
  }
}

const C = CRUTCH.Constants

const CHILD_NAMES = ["LeftMid", "LeftTop", "LeftBottom", "RightMid", "RightTop", "RightBottom"]

const PRE_MILLIS = 1000
const POST_MILLIS = 200

CRUTCH.prominent = {
  [C.ID.DAMAGE_TAKEN]: { text: "BAD", color: C.RED, slot: 2, playSound: false, millis: 1000 },
  [C.ID.COLOR_SWAP]: { text: "COLOR SWAP", color: C.RED, slot: 1, playSound: true, millis: 1000 },
  [C.ID.STATIC]: { text: "STATIC", color: [0.5, 1, 1], slot: 1, playSound: true, millis: 1000 },
  [C.ID.POISON]: { text: "POISON", color: [0.5, 1, 0.5], slot: 2, playSound: true, millis: 1000 },
  [C.ID.DROP_FROST]: {
    text: "DROP FROST",
    color: [0, 0.7, 1],
    slot: 2,
    playSound: true,
    millis: 1000,
  },
}

CRUTCH.prominentDisplaying = {}

function display(
  this: void,
  abilityId: number,
  text: string,
  color: number[],
  slot: number,
  millis: number
): undefined {
  CRUTCH.prominentDisplaying[abilityId] = slot

  const styles = CRUTCH.GetStyles()

  const control = GetControl("TemperCombatAlertsProminent" + tostring(slot)) as Control
  for (const name of CHILD_NAMES) {
    const label = control.GetNamedChild<LabelControl>(name)
    if (label !== undefined) {
      label.SetFont(styles.prominentFont)
      label.SetText(text)
      label.SetColor(color[0] as number, color[1] as number, color[2] as number, color[3])
    }
  }
  control.SetHidden(false)

  EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "Prominent" + tostring(slot), millis, () => {
    control.SetHidden(true)
    delete CRUTCH.prominentDisplaying[abilityId]
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "Prominent" + tostring(slot))
  })
}

let soundsSize = 0
function getRandomSound(this: void): string {
  if (soundsSize === 0) {
    // biome-ignore lint/correctness/noUnusedVariables: counting every sound needs only the loop
    for (const [soundName] of pairs(SOUNDS)) {
      soundsSize = soundsSize + 1
    }
  }

  let i = 1
  const random = math.floor(math.random() * soundsSize + 1)
  for (const [, sound] of pairs(SOUNDS)) {
    if (i === random) {
      return sound
    }
    i = i + 1
  }

  return SOUNDS.DUEL_START as string
}

CRUTCH.DisplayProminentSpin = function (this: void, text, color, slot, mute) {
  const spinColor = color ?? [1, 0.6, 0]
  const spinSlot = slot ?? 1
  display(888888, text, spinColor, spinSlot, 5000)
  let stop = false
  zo_callLater(() => {
    stop = true
  }, 5000)

  let angle = 0
  EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "Spinny" + tostring(spinSlot), 30, () => {
    if (mute !== true) {
      PlaySound(getRandomSound())
    }
    angle = angle + 10 * (spinSlot % 2 === 0 ? 1 : -1) * spinSlot
    if (stop) {
      EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "Spinny" + tostring(spinSlot))
      angle = 0
    }

    const control = GetControl("TemperCombatAlertsProminent" + tostring(spinSlot)) as Control
    for (const name of CHILD_NAMES) {
      const label = control.GetNamedChild(name)
      if (label !== undefined) {
        label.SetTransformRotationZ(math.rad(angle))
      }
    }
  })
}

CRUTCH.DisplayProminent = function (this: void, abilityId) {
  const data = CRUTCH.prominent[abilityId]
  if (data === undefined) {
    CRUTCH.dbgOther(
      string.format(
        "|cFF5555WARNING: tried to DisplayProminent without abilityId (%d) in data|r",
        abilityId
      )
    )
    return
  }

  if (data.zoneIds !== undefined && data.zoneIds[GetZoneId(GetUnitZoneIndex("player"))] !== true) {
    return
  }

  CRUTCH.dbgSpam(string.format("|cFF8888[P] DisplayProminent %d|r", abilityId))
  if (data.playSound) {
    PlaySound(SOUNDS.DUEL_START)
  }
  display(abilityId, data.text, data.color, data.slot, data.millis ?? PRE_MILLIS + POST_MILLIS)
}

CRUTCH.DisplayProminent2 = function (this: void, abilityId, data) {
  if (data === undefined) {
    CRUTCH.dbgOther("|cFF5555WARNING: tried to DisplayProminent2 without data|r")
    return
  }

  CRUTCH.dbgSpam(string.format("|cFF8888[P] DisplayProminent2 %d|r", abilityId))
  const sound = data.playSound
  if (sound !== undefined && sound !== false) {
    if (sound === true) {
      PlaySound(SOUNDS.DUEL_START)
    } else if (typeof sound === "function") {
      sound()
    } else {
      PlaySound(sound)
    }
  }
  display(abilityId, data.text, data.color, data.slot, data.millis ?? PRE_MILLIS + POST_MILLIS)
}
