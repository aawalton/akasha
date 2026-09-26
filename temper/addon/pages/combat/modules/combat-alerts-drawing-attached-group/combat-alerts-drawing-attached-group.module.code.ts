import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import {
  evaluateAllSuppression,
  initializeSuppression,
  isSelf,
  removeIconForUnit,
  setIconForUnit,
  setPlayerGroupTag,
  UNIT_ICONS,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-attached/combat-alerts-drawing-attached.module.code.ts"
import { unpackColor } from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-core/combat-alerts-drawing-core.module.code.ts"
import type {
  DrawingColor,
  DrawingUpdateFunc,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const Draw = CRUTCH.Drawing
const C = CRUTCH.Constants

const GROUP_ROLE_NAME = "CrutchAlertsGroupRole"

interface RoleSetting {
  texture: string
  color: (this: void) => DrawingColor
  show: (this: void) => boolean
}

const ROLE_SETTINGS: Record<number, RoleSetting> = {
  [LFG_ROLE_DPS]: {
    texture: "esoui/art/lfg/gamepad/lfg_roleicon_dps.dds",
    color: () => CRUTCH.savedOptions.drawing.attached.dpsColor,
    show: () => CRUTCH.savedOptions.drawing.attached.showDps,
  },
  [LFG_ROLE_HEAL]: {
    texture: "esoui/art/lfg/gamepad/lfg_roleicon_healer.dds",
    color: () => CRUTCH.savedOptions.drawing.attached.healColor,
    show: () => CRUTCH.savedOptions.drawing.attached.showHeal,
  },
  [LFG_ROLE_TANK]: {
    texture: "esoui/art/lfg/gamepad/lfg_roleicon_tank.dds",
    color: () => CRUTCH.savedOptions.drawing.attached.tankColor,
    show: () => CRUTCH.savedOptions.drawing.attached.showTank,
  },
}

const TAGS_TO_DO: Record<string, number> = {}

function createGroupRoleIcons(this: void): undefined {
  const showSelf = CRUTCH.savedOptions.drawing.attached.showSelfRole
  ZO_ClearTable(TAGS_TO_DO)
  if (GetGroupSize() <= 1) {
    if (showSelf) {
      TAGS_TO_DO.player = GetSelectedLFGRole()
    }
  } else {
    for (let i = 1; i <= GetGroupSize(); i++) {
      const tag = GetGroupUnitTagByIndex(i)
      if (tag !== undefined && IsUnitOnline(tag) && (showSelf || !isSelf(tag))) {
        TAGS_TO_DO[tag] = GetGroupMemberSelectedRole(tag)
      }
    }
  }

  for (const [unitTag, role] of pairs(TAGS_TO_DO)) {
    const settings = ROLE_SETTINGS[role]
    if (settings?.show()) {
      setIconForUnit(
        unitTag,
        GROUP_ROLE_NAME,
        C.PRIORITY.GROUP_ROLE,
        settings.texture,
        undefined,
        settings.color(),
        undefined,
        true
      )
    }
  }
}
Draw.CreateGroupRoleIcons = createGroupRoleIcons

function destroyAllRoleIcons(this: void): undefined {
  for (const [unitTag, tagData] of pairs(UNIT_ICONS)) {
    if (tagData.icons[GROUP_ROLE_NAME] !== undefined) {
      removeIconForUnit(unitTag, GROUP_ROLE_NAME)
    }
  }
  removeIconForUnit("player", GROUP_ROLE_NAME, true)
}

const GROUP_DEAD_NAME = "CrutchAlertsGroupDead"
const DEAD_Y_OFFSET = 100
const DEAD_COLOR_OVERRIDES: Record<string, DrawingColor> = {}

function onDeathStateChanged(
  this: void,
  _eventCode: number | undefined,
  unitTag: string,
  isDead: boolean
): undefined {
  const [groupMatch] = string.find(unitTag, "^group%d+$")
  if (unitTag !== "player" && groupMatch === undefined) {
    return
  }

  if (isDead) {
    const attached = CRUTCH.savedOptions.drawing.attached
    if (!attached.showDead) {
      removeIconForUnit(unitTag, GROUP_DEAD_NAME)
      return
    }

    if (isSelf(unitTag) && !attached.showSelfRole) {
      removeIconForUnit(unitTag, GROUP_DEAD_NAME)
      return
    }

    const callback: DrawingUpdateFunc = (icon) => {
      const options = CRUTCH.savedOptions.drawing.attached
      let color: DrawingColor
      const override = DEAD_COLOR_OVERRIDES[unitTag]
      if (DoesUnitHaveResurrectPending(unitTag)) {
        color = options.pendingColor
      } else if (override !== undefined) {
        color = override
      } else if (IsUnitBeingResurrected(unitTag)) {
        color = options.rezzingColor
      } else {
        color = options.deadColor
      }
      const [r, g, b] = unpackColor(color)
      Draw.SetColor(icon, r, g, b, options.opacity)
    }

    let texturePath = "esoui/art/icons/mapkey/mapkey_groupboss.dds"

    if (attached.useSupportIconsForDead) {
      let role: number
      if (isSelf(unitTag)) {
        role = GetSelectedLFGRole()
      } else {
        role = GetGroupMemberSelectedRole(unitTag)
      }

      if (role === LFG_ROLE_HEAL || role === LFG_ROLE_TANK) {
        texturePath = (ROLE_SETTINGS[role] as RoleSetting).texture
      }
    }

    const yOffset = Draw.Model.AreGravesEnabled() ? 200 : DEAD_Y_OFFSET

    setIconForUnit(
      unitTag,
      GROUP_DEAD_NAME,
      C.PRIORITY.GROUP_DEAD,
      texturePath,
      undefined,
      attached.deadColor,
      yOffset,
      true,
      callback
    )
  } else {
    removeIconForUnit(unitTag, GROUP_DEAD_NAME)
  }
}

Draw.OverrideDeadColor = (unitTag, color) => {
  if (color === undefined) {
    delete DEAD_COLOR_OVERRIDES[unitTag]
  } else {
    DEAD_COLOR_OVERRIDES[unitTag] = color
  }
}

const GROUP_CROWN_NAME = "CrutchAlertsGroupCrown"
let currentCrown: string | undefined

function onCrownChange(this: void, _eventCode: number | undefined, unitTag: string): undefined {
  if (currentCrown !== undefined) {
    removeIconForUnit(currentCrown, GROUP_CROWN_NAME)
    currentCrown = undefined
  }

  const attached = CRUTCH.savedOptions.drawing.attached
  if (!attached.showCrown) {
    return
  }

  if (isSelf(unitTag) && !attached.showSelfRole) {
    return
  }

  currentCrown = unitTag

  setIconForUnit(
    unitTag,
    GROUP_CROWN_NAME,
    C.PRIORITY.GROUP_CROWN,
    "esoui/art/icons/mapkey/mapkey_groupleader.dds",
    undefined,
    attached.crownColor,
    undefined,
    true
  )
}

let lastTime: number | undefined
let timings = ""
function printTime(this: void, reason: string): undefined {
  if (lastTime === undefined) {
    lastTime = GetGameTimeMilliseconds()
    return
  }

  const now = GetGameTimeMilliseconds()
  timings = string.format("%s\n%d - %s", timings, now - lastTime, reason)
  lastTime = now
}

function refreshGroup(this: void): undefined {
  lastTime = undefined
  timings = ""
  CRUTCH.dbgSpam("|c0055FF[draw]|r doing RefreshGroup")
  setPlayerGroupTag(undefined)
  for (let i = 1; i <= GetGroupSize(); i++) {
    const tag = GetGroupUnitTagByIndex(i)
    if (AreUnitsEqual("player", tag)) {
      setPlayerGroupTag(tag)
      break
    }
  }

  destroyAllRoleIcons()
  printTime("destroyed role icons")
  createGroupRoleIcons()
  printTime("created group role icons")

  Draw.DestroyIndividualIcons()
  printTime("destroyed individual icons")

  for (let i = 1; i <= MAX_GROUP_SIZE_THRESHOLD; i++) {
    const tag = "group" + tostring(i)

    if (!DoesUnitExist(tag)) {
      onDeathStateChanged(undefined, tag, false)
    } else {
      if (IsUnitOnline(tag)) {
        onDeathStateChanged(undefined, tag, IsUnitDead(tag))

        Draw.MaybeSetIndividualIcon(tag)
      } else {
        onDeathStateChanged(undefined, tag, false)
      }

      if (IsUnitGroupLeader(tag)) {
        onCrownChange(undefined, tag)
      }
    }
  }
  printTime("finished group")

  onDeathStateChanged(undefined, "player", IsUnitDead("player"))
  Draw.MaybeSetIndividualIcon("player")
  printTime("finished self")

  evaluateAllSuppression()
  printTime("finished suppression")
}
Draw.RefreshGroup = refreshGroup

function refreshGroupTimeout(this: void): undefined {
  EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "AttachedGroupRefreshTimeout", 200, () => {
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "AttachedGroupRefreshTimeout")
    refreshGroup()
  })
}

function refreshFor(this: void, reason: string): () => void {
  return () => {
    CRUTCH.dbgSpam("|c0055FF[draw]|r RefreshGroupTimeout reason: " + reason)
    refreshGroupTimeout()
  }
}

let hooked = false
Draw.InitializeAttachedIcons = () => {
  CRUTCH.RegisterUnitTagListener("CrutchAlertsAttachedGroup", refreshFor("unit tags changed"))

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "AttachedGroupActivated",
    EVENT_PLAYER_ACTIVATED,
    refreshFor("player activated")
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "AttachedGroupRoleChanged",
    EVENT_GROUP_MEMBER_ROLE_CHANGED,
    refreshFor("member role change")
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "AttachedGroupConnectedStatus",
    EVENT_GROUP_MEMBER_CONNECTED_STATUS,
    refreshFor("member connected status")
  )

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "AttachedGroupDeathState",
    EVENT_UNIT_DEATH_STATE_CHANGED,
    onDeathStateChanged
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "AttachedGroupDeathState",
    EVENT_UNIT_DEATH_STATE_CHANGED,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "group"
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "AttachedPlayerDeathState",
    EVENT_UNIT_DEATH_STATE_CHANGED,
    onDeathStateChanged
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "AttachedPlayerDeathState",
    EVENT_UNIT_DEATH_STATE_CHANGED,
    REGISTER_FILTER_UNIT_TAG,
    "player"
  )

  if (!hooked) {
    ZO_PostHook("UpdateSelectedLFGRole", refreshFor("UpdateSelectedLFGRole"))
    hooked = true
  }

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "AttachedGroupLeader",
    EVENT_LEADER_UPDATE,
    onCrownChange
  )

  CRUTCH.RegisterExitedGroupCombatListener("CrutchAttachedIconsCombat", () => {
    for (const [unitTag, tagData] of pairs(UNIT_ICONS)) {
      for (const [uniqueName, iconData] of pairs(tagData.icons)) {
        if (iconData.persistOutsideCombat !== true) {
          removeIconForUnit(unitTag, uniqueName)
        }
      }
    }
  })

  initializeSuppression()
}

Draw.UnregisterAttachedIcons = () => {
  CRUTCH.UnregisterUnitTagListener("CrutchAlertsAttachedGroup")
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "AttachedGroupActivated", EVENT_PLAYER_ACTIVATED)
  EVENT_MANAGER.UnregisterForEvent(
    CRUTCH.name + "AttachedGroupRoleChanged",
    EVENT_GROUP_MEMBER_ROLE_CHANGED
  )
  EVENT_MANAGER.UnregisterForEvent(
    CRUTCH.name + "AttachedGroupConnectedStatus",
    EVENT_GROUP_MEMBER_CONNECTED_STATUS
  )

  EVENT_MANAGER.UnregisterForEvent(
    CRUTCH.name + "AttachedGroupDeathState",
    EVENT_UNIT_DEATH_STATE_CHANGED
  )
  EVENT_MANAGER.UnregisterForEvent(
    CRUTCH.name + "AttachedPlayerDeathState",
    EVENT_UNIT_DEATH_STATE_CHANGED
  )

  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "AttachedGroupLeader", EVENT_LEADER_UPDATE)

  CRUTCH.UnregisterExitedGroupCombatListener("CrutchAttachedIconsCombat")
}
