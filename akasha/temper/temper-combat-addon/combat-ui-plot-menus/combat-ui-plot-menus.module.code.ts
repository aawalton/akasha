import type { DamageCategory } from "@akasha/temper-combat-addon/combat-core-types"
import {
  LIBCOMBAT_STAT_CRITICALRESISTANCE,
  LIBCOMBAT_STAT_MAXHEALTH,
  LIBCOMBAT_STAT_MAXMAGICKA,
  LIBCOMBAT_STAT_MAXSTAMINA,
  LIBCOMBAT_STAT_PHYSICALRESISTANCE,
  LIBCOMBAT_STAT_SPELLCRIT,
  LIBCOMBAT_STAT_SPELLCRITBONUS,
  LIBCOMBAT_STAT_SPELLPENETRATION,
  LIBCOMBAT_STAT_SPELLPOWER,
  LIBCOMBAT_STAT_SPELLRESISTANCE,
  LIBCOMBAT_STAT_WEAPONCRIT,
  LIBCOMBAT_STAT_WEAPONCRITBONUS,
  LIBCOMBAT_STAT_WEAPONPENETRATION,
  LIBCOMBAT_STAT_WEAPONPOWER,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { namedChild } from "@akasha/temper-combat-addon/combat-ui-helpers"
import type { SelectorControl } from "@akasha/temper-combat-addon/combat-ui-plot"
import {
  drawAllPlots,
  getLastPlotSelector,
  removePlotSelection,
  setLastPlotSelector,
  updatePlot,
} from "@akasha/temper-combat-addon/combat-ui-plot"
import { absolute, smooth, total } from "@akasha/temper-combat-addon/combat-ui-plot-data"
import type { PlotData, PlotWindowControl } from "@akasha/temper-combat-addon/combat-ui-plot-math"

export const PLOT_FUNCTIONS: ((this: void) => undefined)[] = []

function plotFunction(funcId: number): (this: void) => undefined {
  const [fn] = assert(PLOT_FUNCTIONS[funcId - 1], "unregistered plot menu function " + funcId)
  return fn
}

export interface LabeledPlotFunction {
  label: number
  func: (this: void, category?: DamageCategory) => PlotData | undefined
}

export interface CategoryEntry {
  label: number
  category: DamageCategory
}

export interface PowerTypeEntry {
  label: number
  powerType: number
}

export interface StatIdEntry {
  label: number
  statId: number
}

export interface PlotMenuData {
  mainCategoryFunctions: LabeledPlotFunction[]
  categoryStrings: CategoryEntry[]
  resourceStrings: PowerTypeEntry[]
  statStrings: StatIdEntry[]
  performanceStrings: StatIdEntry[]
}

let plotMenuDataCache: PlotMenuData | undefined

export function getPlotMenuData(): PlotMenuData {
  if (plotMenuDataCache === undefined) {
    plotMenuDataCache = {
      mainCategoryFunctions: [
        { label: SI_TEMPER_COMBAT_SMOOTHED, func: smooth },
        { label: SI_TEMPER_COMBAT_TOTAL, func: total },
        { label: SI_TEMPER_COMBAT_ABSOLUTE, func: absolute },
      ],
      categoryStrings: [
        { label: SI_TEMPER_COMBAT_DPS, category: "damageOut" },
        { label: SI_TEMPER_COMBAT_HPS, category: "healingOut" },
        { label: SI_TEMPER_COMBAT_INCOMING_DPS, category: "damageIn" },
        { label: SI_TEMPER_COMBAT_INCOMING_HPS, category: "healingIn" },
      ],
      resourceStrings: [
        { label: SI_TEMPER_COMBAT_HEALTH, powerType: COMBAT_MECHANIC_FLAGS_HEALTH },
        { label: SI_TEMPER_COMBAT_MAGICKA, powerType: COMBAT_MECHANIC_FLAGS_MAGICKA },
        { label: SI_TEMPER_COMBAT_STAMINA, powerType: COMBAT_MECHANIC_FLAGS_STAMINA },
        { label: SI_TEMPER_COMBAT_ULTIMATE, powerType: COMBAT_MECHANIC_FLAGS_ULTIMATE },
      ],
      statStrings: [
        { label: SI_TEMPER_COMBAT_STATS_MAGICKA1, statId: LIBCOMBAT_STAT_MAXMAGICKA },
        { label: SI_TEMPER_COMBAT_STATS_MAGICKA2, statId: LIBCOMBAT_STAT_SPELLPOWER },
        { label: SI_TEMPER_COMBAT_STATS_MAGICKA3, statId: LIBCOMBAT_STAT_SPELLCRIT },
        { label: SI_TEMPER_COMBAT_STATS_MAGICKA4, statId: LIBCOMBAT_STAT_SPELLCRITBONUS },
        { label: SI_TEMPER_COMBAT_STATS_MAGICKA5, statId: LIBCOMBAT_STAT_SPELLPENETRATION },
        { label: SI_TEMPER_COMBAT_STATS_STAMINA1, statId: LIBCOMBAT_STAT_MAXSTAMINA },
        { label: SI_TEMPER_COMBAT_STATS_STAMINA2, statId: LIBCOMBAT_STAT_WEAPONPOWER },
        { label: SI_TEMPER_COMBAT_STATS_STAMINA3, statId: LIBCOMBAT_STAT_WEAPONCRIT },
        { label: SI_TEMPER_COMBAT_STATS_STAMINA4, statId: LIBCOMBAT_STAT_WEAPONCRITBONUS },
        { label: SI_TEMPER_COMBAT_STATS_STAMINA5, statId: LIBCOMBAT_STAT_WEAPONPENETRATION },
        { label: SI_TEMPER_COMBAT_STATS_HEALTH1, statId: LIBCOMBAT_STAT_MAXHEALTH },
        { label: SI_TEMPER_COMBAT_STATS_HEALTH2, statId: LIBCOMBAT_STAT_PHYSICALRESISTANCE },
        { label: SI_TEMPER_COMBAT_STATS_HEALTH3, statId: LIBCOMBAT_STAT_SPELLRESISTANCE },
        { label: SI_TEMPER_COMBAT_STATS_HEALTH4, statId: LIBCOMBAT_STAT_CRITICALRESISTANCE },
      ],
      performanceStrings: [
        { label: SI_TEMPER_COMBAT_PERFORMANCE_FPSAVG, statId: 3 },
        { label: SI_TEMPER_COMBAT_PERFORMANCE_FPSMIN, statId: 4 },
        { label: SI_TEMPER_COMBAT_PERFORMANCE_FPSMAX, statId: 5 },
        { label: SI_TEMPER_COMBAT_PERFORMANCE_FPSPING, statId: 6 },
        { label: SI_TEMPER_COMBAT_PERFORMANCE_DESYNC, statId: 7 },
      ],
    }
  }
  return plotMenuDataCache
}

export function getCustomMenuFunction<TParam>(
  basefunc: (this: void, parameter?: TParam) => PlotData | undefined,
  parameter: TParam | undefined,
  labelString: string
): (this: void) => undefined {
  return () => {
    const selector = assert(getLastPlotSelector())

    const control = assert(selector.GetParent<SelectorControl>())
    const id = control.id

    const label = namedChild<LabelControl>(control, "Label")

    label.SetText(labelString)

    const plotwindow = namedChild<PlotWindowControl>(
      assert(assert(control.GetParent()).GetParent()),
      "PlotWindow"
    )

    const plot = assert(plotwindow.plots[id - 1])

    plot.func = () => basefunc(parameter)
    const [cleanLabel] = string.gsub(labelString, " %%", "")
    plot.label = cleanLabel

    updatePlot(plot)

    drawAllPlots(plotwindow)
    return undefined
  }
}

export function plotSelectionMenu(this: void, selector: Control): undefined {
  ClearMenu()

  setLastPlotSelector(selector)

  AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_NONE), removePlotSelection)

  const menuData = getPlotMenuData()

  let funcId = 1

  for (const data of menuData.categoryStrings) {
    const submenu: LibCustomMenuEntry[] = []

    for (const data2 of menuData.mainCategoryFunctions) {
      table.insert(submenu, {
        label: GetString(data2.label),
        callback: plotFunction(funcId),
      })

      funcId = funcId + 1
    }

    AddCustomSubMenuItem(GetString(data.label), submenu)
  }

  AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_BOSS_HP), plotFunction(funcId))
  funcId = funcId + 1

  const submenu2: LibCustomMenuEntry[] = []

  for (const data of menuData.resourceStrings) {
    table.insert(submenu2, {
      label: GetString(data.label) + " %",
      callback: plotFunction(funcId),
    })

    funcId = funcId + 1
  }

  AddCustomSubMenuItem(GetString(SI_TEMPER_COMBAT_RESOURCES), submenu2)

  const submenu3: LibCustomMenuEntry[] = []

  let id = 0
  for (const data of menuData.statStrings) {
    id = id + 1
    table.insert(submenu3, {
      label: GetString(data.label) + " %",
      callback: plotFunction(funcId),
    })

    funcId = funcId + 1

    if (id === 5 || id === 10) {
      table.insert(submenu3, { label: "-" })
    }
  }

  AddCustomSubMenuItem(GetString(SI_TEMPER_COMBAT_STATS), submenu3)

  const submenu4: LibCustomMenuEntry[] = []

  for (const data of menuData.performanceStrings) {
    table.insert(submenu4, {
      label: GetString(data.label),
      callback: plotFunction(funcId),
    })

    funcId = funcId + 1
  }

  AddCustomSubMenuItem(GetString(SI_TEMPER_COMBAT_PERFORMANCE), submenu4)

  ShowMenu(selector)
  AnchorMenu(selector)
  return undefined
}

TemperCombat.PlotSelectionMenu = plotSelectionMenu
