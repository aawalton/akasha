import { toggleButton } from "akasha/temper/addon/pages/characters/modules/pithka-buttons/pithka-buttons.module.code.ts"
import {
  RGB_BLUE,
  RGB_GOLD,
  SMALL_THIN_FONT,
  TEXTURE_BUNDLES,
} from "akasha/temper/addon/pages/characters/modules/pithka-constants/pithka-constants.module.code.ts"
import {
  GROUP_FINDER,
  type GroupFinder,
} from "akasha/temper/addon/pages/characters/modules/pithka-group-finder/pithka-group-finder.module.code.ts"
import type { Listing } from "akasha/temper/addon/pages/characters/modules/pithka-group-finder-data-store/pithka-group-finder-data-store.module.code.ts"
import { entriesOf } from "akasha/temper/addon/pages/characters/modules/pithka-group-finder-search-queue/pithka-group-finder-search-queue.module.code.ts"
import { STATES } from "akasha/temper/addon/pages/characters/modules/pithka-group-finder-state-machine/pithka-group-finder-state-machine.module.code.ts"
import {
  type LabelControlWithPulse,
  pulseLabel,
} from "akasha/temper/addon/pages/characters/modules/pithka-labels/pithka-labels.module.code.ts"
import {
  createGrid,
  spacer,
} from "akasha/temper/addon/pages/characters/modules/pithka-layout/pithka-layout.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/characters/pithka-declarations/pithka-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-addon-list/eso-addon-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-04/eso-enums-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-fonts/eso-fonts.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-5/eso-interface-extra-5.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-scroll-list-extra/eso-scroll-list-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

const DATA_TYPE = 1

const ROW_HEIGHT = 80

let pulse: LabelControlWithPulse | undefined

function child<T extends Control = Control>(this: void, parent: Control, name: string): T {
  return parent.GetNamedChild<T>(name) as T
}

function contentContainer(this: void): Control {
  return child(TemperCharactersPithka_GroupFinderGUI, "ContentContainer")
}

function updatePulseLabel(this: void): undefined {
  const groupFinder = GROUP_FINDER.instance
  if (groupFinder === undefined || pulse === undefined) return
  const state = groupFinder.stateMachine.GetCurrentState()
  if (state === STATES.SEARCHING) {
    const current = groupFinder.searchQueue.GetCurrentSearch()
    let text = "Currently searching..."
    if (current !== undefined) {
      const enabledRoles: string[] = []
      for (const [role, enabled] of entriesOf(groupFinder.GetEnabledRoles())) {
        if (enabled === true) enabledRoles.push(groupFinder.GetRoleName(role))
      }
      const roleText = enabledRoles.length > 0 ? table.concat(enabledRoles, "+") : "NO ROLES"
      const category = groupFinder.GetCategoryName(current.category)
      const difficulty = groupFinder.GetDifficultyName(current.difficulty)
      const index = groupFinder.searchQueue.GetVisualSearchIndex()
      const total = groupFinder.searchQueue.GetTotalSearches()
      text =
        total > 0
          ? string.format(
              "SEARCHING (%d of %d):   %s %s for %s",
              index,
              total,
              difficulty,
              category,
              roleText
            )
          : string.format("SEARCHING:   %s %s for %s", difficulty, category, roleText)
    }
    pulse.SetText(text)
    pulse.SetHidden(false)
    pulse.SetPulse(true)
  } else if (state === STATES.IDLE) {
    pulse.SetText("No active searches. Use buttons above to enable.")
    pulse.SetHidden(false)
    pulse.SetPulse(false)
  } else {
    pulse.SetHidden(true)
    pulse.SetPulse(false)
  }
}

function registerPulseCallbacks(this: void, groupFinder: GroupFinder): undefined {
  groupFinder.stateMachine.RegisterCallback(STATES.SEARCHING, () => updatePulseLabel())
  groupFinder.stateMachine.RegisterCallback(STATES.IDLE, () => updatePulseLabel())
  groupFinder.AfterEachSearchStep(() => updatePulseLabel())
}

function setupSearchControls(this: void): undefined {
  const footer = child(contentContainer(), "Footer")
  const grid = createGrid(100, 3, footer, TOPLEFT)
  grid.addRow([
    toggleButton({
      tooltipText: "Healer",
      textureBundle: TEXTURE_BUNDLES.HEALER,
      parent: footer,
      stateKey: "groupFinderHealer",
    }),
    toggleButton({
      tooltipText: "Tank",
      textureBundle: TEXTURE_BUNDLES.TANK,
      parent: footer,
      stateKey: "groupFinderTank",
    }),
    toggleButton({
      tooltipText: "DPS",
      textureBundle: TEXTURE_BUNDLES.DPS,
      parent: footer,
      stateKey: "groupFinderDps",
    }),
    spacer(15),
    toggleButton({
      tooltipText: "Dungeon",
      textureBundle: TEXTURE_BUNDLES.DUNGEON,
      parent: footer,
      stateKey: "groupFinderDungeons",
    }),
    toggleButton({
      tooltipText: "Trial",
      textureBundle: TEXTURE_BUNDLES.TRIAL,
      parent: footer,
      stateKey: "groupFinderTrials",
    }),
    spacer(15),
    toggleButton({
      tooltipText: "Normal",
      textureBundle: TEXTURE_BUNDLES.NORMAL,
      parent: footer,
      stateKey: "groupFinderNormal",
    }),
    toggleButton({
      tooltipText: "Veteran",
      textureBundle: TEXTURE_BUNDLES.VETERAN,
      parent: footer,
      stateKey: "groupFinderVeteran",
    }),
  ])
  pulse = pulseLabel({
    text: "testing label",
    width: 400,
    color: [1, 1, 1, 1],
    align: TEXT_ALIGN_CENTER,
    font: SMALL_THIN_FONT,
    parent: footer,
    hidden: false,
  })
  pulse.SetAnchor(BOTTOM, footer, BOTTOM, 0, -5)
  updatePulseLabel()
  const groupFinder = GROUP_FINDER.instance
  if (groupFinder !== undefined) registerPulseCallbacks(groupFinder)
}

function setupRow(this: void, control: Control, data: Listing): undefined {
  const card = child(control, "CardContainer")
  const left = child(card, "LeftContent")
  const categoryLabel = child<LabelControl>(left, "Category")
  const difficulty = data.difficulty === "Veteran" ? "VET" : "NORM"
  categoryLabel.SetText(string.format("%s %s", difficulty, data.specificActivity))
  const color = data.category === GROUP_FINDER_CATEGORY_DUNGEON ? RGB_GOLD : RGB_BLUE
  categoryLabel.SetColor(...color)
  const tooltipText = string.format(
    "|cFFFFFF%s:|r %s\n|cFFFFFF%s:|r %s\n|cFFFFFF%s:|r %s",
    "Leader",
    data.leader,
    "Title",
    data.title,
    "Description",
    data.description
  )
  categoryLabel.SetHandler("OnMouseEnter", () => {
    InitializeTooltip(InformationTooltip, categoryLabel, TOPLEFT, -15, -10, TOPRIGHT)
    SetTooltipText(InformationTooltip, tooltipText)
  })
  categoryLabel.SetHandler("OnMouseExit", () => {
    ClearTooltip(InformationTooltip)
  })
  child<LabelControl>(child(left, "InfoContainer"), "LeaderTitle").SetText(
    string.format("%s", data.title)
  )

  const roles = child(card, "RoleButtonsContainer")
  const tankButton = child<ButtonControl>(roles, "TankButton")
  const healerButton = child<ButtonControl>(roles, "HealerButton")
  const dpsButton = child<ButtonControl>(roles, "DPSButton")
  child<LabelControl>(roles, "GroupFilledLabel").SetText(
    string.format("%d/%d", data.totalAttained, data.numRoles)
  )

  const anyRoles = data.numRoles - (data.tankDesired + data.healerDesired + data.dpsDesired)
  const anyRolesUsed =
    Math.max(0, data.tankAttained - data.tankDesired) +
    Math.max(0, data.healerAttained - data.healerDesired) +
    Math.max(0, data.dpsAttained - data.dpsDesired)
  const anyRolesAvailable = anyRolesUsed < anyRoles
  const formatCount = (attained: number, desired: number): string => {
    if (anyRolesAvailable) return string.format("%d/%s", attained, "∞")
    return string.format("%d/%s", attained, attained > desired ? `${desired}+` : tostring(desired))
  }
  const place = (
    button: ButtonControl,
    attained: number,
    desired: number,
    role: number
  ): undefined => {
    const needed = attained < desired || anyRolesAvailable
    button.SetEnabled(needed)
    child<LabelControl>(button, "Count").SetText(formatCount(attained, desired))
    const icon = child<TextureControl>(button, "Icon")
    if (needed) {
      icon.SetColor(1, 1, 1, 1)
    } else {
      icon.SetColor(0.25, 0.25, 0.25, 0.5)
    }
    button.SetHandler("OnClicked", () => {
      if (!needed) return
      data.role = role
      GROUP_FINDER.instance?.JoinGroup(data)
    })
  }
  place(tankButton, data.tankAttained, data.tankDesired, LFG_ROLE_TANK)
  place(healerButton, data.healerAttained, data.healerDesired, LFG_ROLE_HEAL)
  place(dpsButton, data.dpsAttained, data.dpsDesired, LFG_ROLE_DPS)
}

function setupList(this: void): undefined {
  const list = child(contentContainer(), "List")
  ZO_ScrollList_Initialize(list)
  ZO_ScrollList_AddDataType(
    list,
    DATA_TYPE,
    "TemperCharactersPithka_GroupFinderRow",
    ROW_HEIGHT,
    setupRow
  )
}

function updateTable(this: void): undefined {
  const groupFinder = GROUP_FINDER.instance
  if (groupFinder === undefined) return
  const list = child(contentContainer(), "List")
  const scrollValue = ZO_ScrollList_GetScrollValue(list)
  const scrollData = ZO_ScrollList_GetDataList<Listing>(list)
  if (scrollData === undefined) return
  ZO_ClearNumericallyIndexedTable(scrollData)
  const listings = groupFinder.dataStore.GetAllListings()
  for (const leader in listings) {
    const listing = listings[leader]
    if (listing !== undefined) scrollData.push(ZO_ScrollList_CreateDataEntry(DATA_TYPE, listing))
  }
  ZO_ScrollList_Commit(list)
  if (scrollData.length > 0 && scrollValue > 0) {
    zo_callLater(() => ZO_ScrollList_ScrollAbsolute(list, scrollValue), 50)
  }
}

type HideFragment = ZoSceneFragmentObject & { wasVisible?: boolean }

function hideFragment(this: void): ZoSceneFragmentObject {
  const fragmentClass = ZO_SceneFragment.Subclass()
  fragmentClass.Show = function (this: HideFragment): undefined {
    if (!TemperCharactersPithka_GroupFinderGUI.IsControlHidden()) {
      this.wasVisible = true
      TemperCharactersPithka_GroupFinderGUI.SetHidden(true)
    } else {
      this.wasVisible = false
    }
    this.OnShown()
  }
  fragmentClass.Hide = function (this: HideFragment): undefined {
    if (this.wasVisible === true) TemperCharactersPithka_GroupFinderGUI.SetHidden(false)
    this.wasVisible = false
    this.OnHidden()
  }
  return fragmentClass.New()
}

export function initializeGroupFinderWindow(this: void): undefined {
  TemperCharactersPithka_GroupFinderGUI.SetHidden(true)
  SCENE_MANAGER.GetScene("gameMenuInGame").AddFragment(hideFragment())
  setupList()
  setupSearchControls()
  const groupFinder = GROUP_FINDER.instance
  if (groupFinder === undefined) return
  groupFinder.dataStore.RegisterUpdateCallback(updateTable)
  zo_callLater(() => groupFinder.UpdateSearchState(), 100)
}

export function toggleGroupFinderWindow(this: void): undefined {
  const hidden = TemperCharactersPithka_GroupFinderGUI.IsControlHidden()
  TemperCharactersPithka_GroupFinderGUI.SetHidden(!hidden)
  GROUP_FINDER.instance?.UpdateSearchState()
}
