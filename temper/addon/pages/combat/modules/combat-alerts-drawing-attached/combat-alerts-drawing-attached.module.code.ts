import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { unpackColor } from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-core/combat-alerts-drawing-core.module.code.ts"
import type {
  DrawingColor,
  DrawingKey,
  DrawingUpdateFunc,
  SpaceOptions,
  SuppressionFilter,
  UnitIconsEntry,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const Draw = CRUTCH.Drawing
const C = CRUTCH.Constants

export const UNIT_ICONS: Record<string, UnitIconsEntry> = {}
Draw.unitIcons = UNIT_ICONS

Draw.DumpUnitIcons = () => {
  d("============== attached icons dump ==============")
  for (const [tag, data] of pairs(UNIT_ICONS)) {
    d(
      string.format(
        "%s (%s)\n----key: %s\n----active: %s",
        GetUnitDisplayName(tag) ?? "NO USER",
        tag,
        data.key ?? "NO KEY",
        data.active ?? "NO ACTIVE"
      )
    )
    for (const [uniqueName, icon] of pairs(data.icons)) {
      d(
        string.format(
          "----%s: %d [|t100%%:100%%:%s|t]",
          uniqueName,
          icon.priority,
          icon.texture ?? "no texture"
        )
      )
    }
  }
  d("playerGroupTag: " + CRUTCH.playerGroupTag)
}

function removeAttachedIcon(this: void, key: DrawingKey): undefined {
  Draw.RemoveWorldTexture(key)
}

function createAttachedIcon(
  this: void,
  unitTag: string,
  texture: string | undefined,
  size: number,
  color: DrawingColor,
  yOffset: number,
  callback: DrawingUpdateFunc | undefined,
  spaceOptions: SpaceOptions | undefined
): DrawingKey {
  const [, x, y, z] = GetUnitRawWorldPosition(unitTag)

  const onUpdate: DrawingUpdateFunc = (icon) => {
    const [, uX, uY, uZ] = GetUnitRawWorldPosition(unitTag)
    icon.SetPosition(icon, uX, uY + yOffset, uZ)

    if (callback !== undefined) {
      callback(icon)
    }
  }

  let key: DrawingKey
  if (spaceOptions !== undefined) {
    key = Draw.CreateSpaceControl(x, y + yOffset, z, true, undefined, spaceOptions, onUpdate)
  } else {
    key = Draw.CreateWorldTexture(
      texture as string,
      x,
      y + yOffset,
      z,
      size / 100,
      size / 100,
      color,
      CRUTCH.savedOptions.drawing.attached.useDepthBuffers,
      true,
      undefined,
      onUpdate
    )
  }

  return key
}

function reevaluatePrioritization(this: void, unitTag: string): undefined {
  const entry = UNIT_ICONS[unitTag]
  if (entry === undefined) {
    return
  }

  let highestPriority = -1
  let highestName: string | undefined
  for (const [uniqueName, iconData] of pairs(entry.icons)) {
    if (iconData.priority >= highestPriority) {
      highestPriority = iconData.priority
      highestName = uniqueName
    }
  }

  const currentKey = entry.key

  if (highestName === undefined) {
    if (currentKey !== undefined) {
      removeAttachedIcon(currentKey)
      entry.key = undefined
      entry.active = undefined
    }
    return
  }

  if (entry.active === highestName) {
    return
  }

  if (currentKey !== undefined) {
    removeAttachedIcon(currentKey)
  }
  const icon = entry.icons[highestName]
  if (icon === undefined) {
    return
  }
  const key = createAttachedIcon(
    unitTag,
    icon.texture,
    icon.size,
    icon.color,
    icon.yOffset,
    icon.callback,
    icon.spaceOptions
  )
  entry.key = key
  entry.active = highestName
}

let playerGroupTag: string | undefined

export function setPlayerGroupTag(this: void, tag: string | undefined): undefined {
  playerGroupTag = tag
}

export function isSelf(this: void, unitTag: string): boolean {
  if (unitTag === "player") {
    return true
  }

  if (AreUnitsEqual("player", unitTag)) {
    playerGroupTag = unitTag
    return true
  }

  return false
}

export function removeIconForUnit(
  this: void,
  unitTagArg: string,
  uniqueName: string,
  forcePlayer?: boolean
): undefined {
  let unitTag = unitTagArg
  if (unitTag === "player" && playerGroupTag !== undefined && forcePlayer !== true) {
    unitTag = playerGroupTag
    CRUTCH.dbgSpam("Translating player tag to " + playerGroupTag + " to remove " + uniqueName)
  }

  const entry = UNIT_ICONS[unitTag]
  if (entry === undefined) {
    return
  }

  const iconData = entry.icons[uniqueName]
  if (iconData === undefined) {
    return
  }

  CRUTCH.dbgSpam(
    string.format(
      "RemoveIconForUnit %s (%s) %s was: |t100%%:100%%:%s|t",
      unitTag,
      GetUnitDisplayName(unitTag) ?? "???",
      uniqueName,
      iconData.texture ?? "blank.dds"
    )
  )

  delete entry.icons[uniqueName]

  reevaluatePrioritization(unitTag)
}

export function setIconForUnit(
  this: void,
  unitTagArg: string,
  uniqueName: string,
  priority: number,
  texture: string | undefined,
  size?: number,
  colorArg?: DrawingColor,
  yOffset?: number,
  persistOutsideCombat?: boolean,
  callback?: DrawingUpdateFunc,
  spaceOptions?: SpaceOptions
): undefined {
  let unitTag = unitTagArg
  if (unitTag === "player" && playerGroupTag !== undefined) {
    unitTag = playerGroupTag
    CRUTCH.dbgSpam("Translating player tag to " + playerGroupTag + " to set " + uniqueName)
  }

  let entry = UNIT_ICONS[unitTag]
  if (entry === undefined) {
    entry = { icons: {} }
    UNIT_ICONS[unitTag] = entry
  }

  if (entry.icons[uniqueName] !== undefined) {
    CRUTCH.dbgSpam(
      string.format(
        "Icon already exists for %s uniqueName %s, removing first and then replacing...",
        unitTag,
        uniqueName
      )
    )
    removeIconForUnit(unitTag, uniqueName)
  }

  CRUTCH.dbgSpam(
    string.format(
      "SetIconForUnit %s (%s) %s |t100%%:100%%:%s|t",
      unitTag,
      GetUnitDisplayName(unitTag) ?? "???",
      uniqueName,
      texture ?? "blank.dds"
    )
  )

  const color = colorArg ?? C.WHITE

  const attached = CRUTCH.savedOptions.drawing.attached
  const [r, g, b, alpha] = unpackColor(color)
  const a = alpha ?? attached.opacity

  entry.icons[uniqueName] = {
    priority,
    texture,
    size: size ?? attached.size,
    color: [r, g, b, a],
    yOffset: yOffset ?? attached.yOffset,
    persistOutsideCombat,
    callback,
    spaceOptions,
  }

  reevaluatePrioritization(unitTag)
}

const SUPPRESS_NAME = "CrutchAlertsSuppress"
const SUPPRESSION_FILTERS: Record<string, SuppressionFilter> = {}

function suppressIcons(this: void, unitTag: string): undefined {
  setIconForUnit(unitTag, SUPPRESS_NAME, C.PRIORITY.SUPPRESS, "blank.dds")
}

function unsuppressIcons(this: void, unitTag: string): undefined {
  removeIconForUnit(unitTag, SUPPRESS_NAME)
}

function shouldUnitBeShown(this: void, unitTag: string): boolean {
  if (AreUnitsEqual("player", unitTag)) {
    return true
  }

  for (const [, filter] of pairs(SUPPRESSION_FILTERS)) {
    if (!filter(unitTag)) {
      return false
    }
  }

  return true
}
Draw.ShouldUnitBeShown = shouldUnitBeShown

function evaluateSuppressionFor(this: void, unitTag: string): undefined {
  if (!shouldUnitBeShown(unitTag)) {
    suppressIcons(unitTag)
    Draw.Model.RemoveGrave(unitTag)
  } else {
    unsuppressIcons(unitTag)
  }
}
Draw.EvaluateSuppressionFor = evaluateSuppressionFor

export function evaluateAllSuppression(this: void): undefined {
  for (let i = 1; i <= MAX_GROUP_SIZE_THRESHOLD; i++) {
    const unitTag = "group" + tostring(i)

    if (!DoesUnitExist(unitTag)) {
      unsuppressIcons(unitTag)
    } else if (IsUnitOnline(unitTag)) {
      evaluateSuppressionFor(unitTag)
    }
  }
}
Draw.EvaluateAllSuppression = evaluateAllSuppression

function registerSuppressionFilter(
  this: void,
  name: string,
  filterFunc: SuppressionFilter
): undefined {
  CRUTCH.dbgSpam("Registering suppression filter " + name)
  SUPPRESSION_FILTERS[name] = filterFunc
  evaluateAllSuppression()
}
Draw.RegisterSuppressionFilter = registerSuppressionFilter

Draw.UnregisterSuppressionFilter = (name) => {
  CRUTCH.dbgSpam("Unregistering suppression filter " + name)
  delete SUPPRESSION_FILTERS[name]
  evaluateAllSuppression()
}

let suppressionInitialized = false
export function initializeSuppression(this: void): undefined {
  if (suppressionInitialized) {
    return
  }
  suppressionInitialized = true

  registerSuppressionFilter("CrutchAlertsSameWorld", (unitTag) =>
    IsGroupMemberInSameWorldAsPlayer(unitTag)
  )

  registerSuppressionFilter(
    "CrutchAlertsRemoteRegion",
    (unitTag) => !IsGroupMemberInRemoteRegion(unitTag)
  )
}

CRUTCH.SetAttachedIconForUnit = (
  unitTag,
  uniqueName,
  priority,
  texture,
  size,
  color,
  persistOutsideCombat,
  callback,
  spaceOptions
) => {
  if (priority < 0 || priority > 10000) {
    CRUTCH.msg("|cFF0000Invalid priority for " + uniqueName + " icon; use 0~10000")
    return
  }
  setIconForUnit(
    unitTag,
    uniqueName,
    priority,
    texture,
    size,
    color,
    undefined,
    persistOutsideCombat,
    callback,
    spaceOptions
  )
}

CRUTCH.RemoveAttachedIconForUnit = (unitTag, uniqueName) => {
  removeIconForUnit(unitTag, uniqueName)
}

CRUTCH.RemoveAllAttachedIcons = (uniqueName) => {
  for (let i = 1; i <= MAX_GROUP_SIZE_THRESHOLD; i++) {
    removeIconForUnit("group" + tostring(i), uniqueName)
  }
  removeIconForUnit("player", uniqueName, true)
}
