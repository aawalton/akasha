import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-core-log"
import type { EffectInstance } from "@akasha/temper-combat-addon/combat-core-types"
import { getFormattedAbilityIcon } from "@akasha/temper-combat-addon/combat-lib-constants"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import { spairs } from "@akasha/temper-combat-addon/combat-sorted-pairs"
import {
  type BuffRowControl,
  buffSortFunction,
  buffTextColor,
  effectColor,
  getBuffData,
  getTotalUnitTime,
  type RowAnchor,
  updateBuffPanelLegacy,
} from "@akasha/temper-combat-addon/combat-ui-buff-panel"
import { isSigilAbility } from "@akasha/temper-combat-addon/combat-ui-helpers"
import { adjustRowSize, resetBars } from "@akasha/temper-combat-addon/combat-ui-main-panel"
import type { BarsPanelControl } from "@akasha/temper-combat-addon/combat-ui-selection"
import {
  getDx,
  getFightData,
  getSelections,
  UNCOLLAPSED_BUFFS,
} from "@akasha/temper-combat-addon/combat-ui-state"

interface BuffRowData {
  buffName?: string
  color: [number, number, number, number]
  groupColor: [number, number, number, number]
  highlight: boolean
  icon: string
  label: string
  uptimeRatio: number
  groupUptimeRatio: number
  count: number
  groupCount: number
  textcolor: [number, number, number, number]
  indent: number
  hasDetails: boolean
}

function addBuffPanelRow(
  this: void,
  panel: BarsPanelControl,
  scrollchild: Control,
  anchor: RowAnchor,
  rowdata: BuffRowData,
  parentrow?: BuffRowControl
): LuaMultiReturn<[RowAnchor, BuffRowControl]> {
  const hideGroupValues =
    rowdata.count === rowdata.groupCount && rowdata.uptimeRatio === rowdata.groupUptimeRatio

  const countFormat = hideGroupValues ? "%d" : "%d/%d"
  const uptimeFormat = hideGroupValues ? "%d" : "%d/%d"

  const bars = panel.bars ?? []
  panel.bars = bars
  const rowId = bars.length + 1

  const rowName = `${scrollchild.GetName()}Row${rowId}`
  const row =
    GetControl<BuffRowControl>(rowName) ??
    CreateControlFromVirtual<BuffRowControl>(rowName, scrollchild, "TemperCombat_BuffRowTemplate")
  row.SetAnchor(...anchor)
  row.SetHidden(false)

  const header = panel.GetNamedChild("Header")
  if (header != null) {
    adjustRowSize(row, header)
  }

  row.GetNamedChild("HighLight")?.SetHidden(!rowdata.highlight)

  const iconControl = row.GetNamedChild<TextureControl>("Icon")
  iconControl?.SetTexture(rowdata.icon)

  const nameControl = row.GetNamedChild<LabelControl>("Name")
  nameControl?.SetText(rowdata.label)
  nameControl?.SetColor(...rowdata.textcolor)

  let maxwidth = header?.GetNamedChild<LabelControl>("Name")?.GetWidth() ?? 0

  const indent = (rowdata.indent * (iconControl?.GetWidth() ?? 0)) / 2

  if (indent > 0) {
    maxwidth = maxwidth - indent
  }

  nameControl?.SetWidth(maxwidth)

  if (iconControl != null) {
    const [, point, relativeTo, relativePoint, , offsetY, constrains] = iconControl.GetAnchor(0)
    iconControl.ClearAnchors()
    iconControl.SetAnchor(
      point,
      relativeTo,
      relativePoint,
      2 * getDx() + indent,
      offsetY,
      constrains
    )
  }

  const groupBarControl = row.GetNamedChild<BackdropControl>("GroupBar")
  groupBarControl?.SetWidth(maxwidth * rowdata.groupUptimeRatio)
  groupBarControl?.SetCenterColor(...rowdata.groupColor)

  const playerBarControl = row.GetNamedChild<BackdropControl>("PlayerBar")
  playerBarControl?.SetWidth(maxwidth * rowdata.uptimeRatio)
  playerBarControl?.SetCenterColor(...rowdata.color)
  row
    .GetNamedChild<LabelControl>("Count")
    ?.SetText(string.format(countFormat, rowdata.count, rowdata.groupCount))
  row
    .GetNamedChild<LabelControl>("Uptime")
    ?.SetText(
      string.format(uptimeFormat, rowdata.uptimeRatio * 100, rowdata.groupUptimeRatio * 100)
    )

  row.GetNamedChild("IndicatorSwitch")?.SetHidden(!rowdata.hasDetails)

  bars[rowId - 1] = row

  row.dataId = rowdata.buffName
  row.type = "buff"
  row.id = rowId
  row.panel = panel
  row.parentrow = parentrow
  row.hasDetails = rowdata.hasDetails

  const currentanchor: RowAnchor = [TOPLEFT, row, BOTTOMLEFT, 0, getDx()]

  return $multi(currentanchor, row)
}

export function updateBuffPanel(this: void, panel: BarsPanelControl): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating BuffPanel")
  const barsPanel = panel
  resetBars(barsPanel)
  const sigilIcon = GetControl<TextureControl & Control>(panel, "HeaderIconTexture")
  sigilIcon?.SetHidden(true)

  const fightData = getFightData()
  if (fightData == null) {
    return undefined
  }

  const buffDataVersion = fightData.calculated?.buffVersion ?? 0

  if (buffDataVersion < 2) {
    updateBuffPanelLegacy(barsPanel)
    return undefined
  }

  const buffData = getBuffData()

  if (buffData == null) {
    return undefined
  }

  const scrollchild = GetControl(panel, "PanelScrollChild")
  if (scrollchild == null) {
    return undefined
  }

  const db = getDb()
  const selectedbuffs = getSelections().buff["buff"]
  let currentanchor: RowAnchor = [TOPLEFT, scrollchild, TOPLEFT, 0, 1]

  const maxtime = zo_max(fightData.activetime ?? 0, fightData.dpstime ?? 0, fightData.hpstime ?? 0)

  const totalUnitTime = getTotalUnitTime(buffData) ?? maxtime * 1000
  const showids = db.showDebugIds
  const favs = db.FightReport.FavouriteBuffs

  let parentrow: BuffRowControl | undefined

  for (const [buffName, buff] of spairs(buffData.buffs ?? {}, buffSortFunction)) {
    if (buff.groupUptime <= 0) {
      continue
    }

    if (isSigilAbility(buff.instances)) {
      sigilIcon?.SetHidden(false)
    }

    const labelFormat = showids ? "(<<1>>) <<2>>" : "<<2>>"

    let shownUptime = buff.uptime
    let shownGroupUptime = buff.groupUptime

    const instances: Record<number, EffectInstance> | undefined = buff.instances
    const hasInstances = instances != null && NonContiguousCount(instances) > 1
    const hasStacks = instances != null && (buff.iconId === 126597 || buff.maxStacks > 1)

    let showName = buffName

    if (hasStacks) {
      const mainInstance = buff.iconId != null ? instances[buff.iconId] : undefined

      shownUptime = mainInstance?.uptime ?? 0
      shownGroupUptime = mainInstance?.groupUptime ?? 0

      showName = ZO_CachedStrFormat("<<2>>x <<1>>", buffName, buff.maxStacks)
    }

    const rowdata: BuffRowData = {
      buffName: buffName,
      color: effectColor(buff.effectType, 0.6),
      groupColor: effectColor(buff.effectType, 0.3),
      highlight: selectedbuffs != null && selectedbuffs[buffName] != null,
      icon: getFormattedAbilityIcon(buff.iconId),
      label: ZO_CachedStrFormat(labelFormat, buff.iconId, showName),
      uptimeRatio: shownUptime / totalUnitTime,
      groupUptimeRatio: shownGroupUptime / totalUnitTime,
      count: buff.count,
      groupCount: buff.groupCount,
      textcolor: buffTextColor(favs[buffName] === true),
      indent: 0,
      hasDetails: hasInstances || hasStacks,
    }

    const [nextAnchor, newParentrow] = addBuffPanelRow(
      barsPanel,
      scrollchild,
      currentanchor,
      rowdata
    )
    currentanchor = nextAnchor
    parentrow = newParentrow

    if (hasInstances && UNCOLLAPSED_BUFFS[buffName] === true) {
      rowdata.indent = 1
      rowdata.highlight = false
      rowdata.hasDetails = false

      for (const [abilityId, instance] of pairs(instances)) {
        rowdata.icon = getFormattedAbilityIcon(abilityId)
        rowdata.label = ZO_CachedStrFormat("(<<1>>) <<2>>", abilityId, buffName)

        rowdata.uptimeRatio = (instance.uptime ?? 0) / totalUnitTime
        rowdata.groupUptimeRatio = (instance.groupUptime ?? 0) / totalUnitTime
        rowdata.count = instance.count ?? 0
        rowdata.groupCount = instance.groupCount ?? 0

        const [nextInstanceAnchor] = addBuffPanelRow(
          barsPanel,
          scrollchild,
          currentanchor,
          rowdata,
          parentrow
        )
        currentanchor = nextInstanceAnchor
      }
    }

    if (hasStacks && UNCOLLAPSED_BUFFS[buffName] === true) {
      rowdata.indent = 1
      rowdata.highlight = false
      rowdata.hasDetails = false

      const keys: number[] = []
      const instanceData = buff.iconId != null ? instances[buff.iconId] : undefined

      if (instanceData != null) {
        for (const [stacks] of pairs(instanceData)) {
          if (typeof stacks === "number") {
            keys[keys.length] = stacks
          }
        }
      }

      table.sort(keys)

      for (const [, stacks] of ipairs(keys)) {
        const stackData = instanceData?.[stacks]
        if (stackData == null) {
          continue
        }

        rowdata.label = ZO_CachedStrFormat("<<1>>x <<2>>", stacks, buffName)

        rowdata.uptimeRatio = stackData.uptime / totalUnitTime
        rowdata.groupUptimeRatio = stackData.groupUptime / totalUnitTime
        rowdata.count = stackData.count
        rowdata.groupCount = stackData.groupCount

        const [nextStackAnchor] = addBuffPanelRow(
          barsPanel,
          scrollchild,
          currentanchor,
          rowdata,
          parentrow
        )
        currentanchor = nextStackAnchor
      }
    }
  }
  return undefined
}
