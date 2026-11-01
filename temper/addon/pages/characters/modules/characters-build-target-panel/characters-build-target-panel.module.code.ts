import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import { applyAttributeTarget } from "akasha/temper/addon/pages/characters/modules/characters-build-attributes/characters-build-attributes.module.code.ts"
import {
  applyBarTarget,
  whenBarsSaid,
} from "akasha/temper/addon/pages/characters/modules/characters-build-bars/characters-build-bars.module.code.ts"
import { applyChampionTarget } from "akasha/temper/addon/pages/characters/modules/characters-build-champion/characters-build-champion.module.code.ts"
import {
  type ChecklistSection,
  checklistOf,
  currentCharacterTarget,
  currentCharacterTargets,
} from "akasha/temper/addon/pages/characters/modules/characters-build-checklist/characters-build-checklist.module.code.ts"
import { applyGearTarget } from "akasha/temper/addon/pages/characters/modules/characters-build-gear/characters-build-gear.module.code.ts"
import { applyPassiveTarget } from "akasha/temper/addon/pages/characters/modules/characters-build-passives/characters-build-passives.module.code.ts"
import {
  lineLabel,
  linkLabel,
  type ShownRow,
  showRows,
  wrapTo,
} from "akasha/temper/addon/pages/characters/modules/characters-build-target-rows/characters-build-target-rows.module.code.ts"
import {
  HUD_ROW_HEIGHT,
  hudColor,
  styleHudLine,
} from "akasha/temper/addon/pages/characters/modules/characters-hud-line/characters-hud-line.module.code.ts"
import { PANEL_GAP } from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import type { CharacterTarget } from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"
import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/addon/type/temper-items-global/temper-items-global.type-declaration.d.ts"

const PANEL_NAME = "TemperCharactersTargetBuild"

const BESIDE_NAMES = ["ZO_Skills", "ZO_AdvancedStatsPanel", "ZO_StatsPanel"]

const SKILLS_SCENE_NAME = "skills"

const KEYBIND_STRIP_NAME = "ZO_KeybindStripControl"

const LINES_SHOWN = 40

const PADDING = 16

const HEADER_GAP = 8

const MIN_WIDTH = 250

const SAID_WIDTH = 420

const REFRESH_AFTER_APPLY_MS = 1500

const UPDATES_NAME = `${PANEL_NAME}Updates`

const APPLIERS: Readonly<Record<string, (target: CharacterTarget) => string>> = {
  Attributes: (target) => applyAttributeTarget(target.attributes),
  "Champion points": applyChampionTarget,
  "Skill bars": applyBarTarget,
  Gear: applyGearTarget,
  Passives: applyPassiveTarget,
}

function toApply(sections: readonly ChecklistSection[]): readonly string[] {
  return sections
    .filter((section) => APPLIERS[section.title] !== undefined)
    .filter((section) => section.lines.some((line) => !line.met))
    .map((section) => section.title)
}

function applyText(titles: readonly string[]): string {
  const named = titles.map((title) => string.lower(title))
  const last = named.pop()
  return named.length === 0 ? `Apply ${last}` : `Apply ${named.join(", ")} and ${last}`
}

interface TargetPanel {
  readonly window: TopLevelWindow
  readonly title: LabelControl
  readonly choose: LabelControl
  readonly apply: LabelControl
  readonly said: LabelControl
  readonly lines: readonly LabelControl[]
  readonly counts: readonly LabelControl[]
}

let held: TargetPanel | undefined

export function applyCharacterTarget(target: CharacterTarget): string {
  const said: string[] = []
  for (const title of toApply(checklistOf(target))) said.push(APPLIERS[title]?.(target) ?? "")
  zo_callLater(refreshTargetPanel, REFRESH_AFTER_APPLY_MS)
  return said.join("\n")
}

function applyTarget(): undefined {
  if (held === undefined) return undefined
  const target = currentCharacterTarget()
  if (target === undefined) return undefined
  held.said.SetText(applyCharacterTarget(target))
  return undefined
}

function nextTarget(): CharacterTarget | undefined {
  const targets = currentCharacterTargets()
  if (targets.length < 2) return undefined
  const at = targets.findIndex((one) => one.buildId === currentCharacterTarget()?.buildId)
  return targets[(at + 1) % targets.length]
}

export function chooseCharacterTarget(buildId: string): undefined {
  const over = currentCharacterTargets()[0]?.buildId
  if (over === undefined) return undefined
  const sv = getSavedVariables()
  const chosen = sv.activeBuilds ?? {}
  chosen[GetCurrentCharacterId()] = { buildId, over }
  sv.activeBuilds = chosen
  held?.said.SetText("")
  TemperItems?.Rescan()
  refreshTargetPanel()
  return undefined
}

function chooseNextTarget(): undefined {
  const next = nextTarget()
  return next === undefined ? undefined : chooseCharacterTarget(next.buildId)
}

function createTargetPanel(): TargetPanel {
  const window = WINDOW_MANAGER.CreateTopLevelWindow(PANEL_NAME)
  window.SetHidden(true)

  const title = WINDOW_MANAGER.CreateControl("$(parent)Title", window, CT_LABEL)
  title.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  styleHudLine(title, hudColor("plain"))

  const choose = linkLabel(window, chooseNextTarget)

  const apply = linkLabel(window, applyTarget)

  const said = WINDOW_MANAGER.CreateControl(undefined, window, CT_LABEL)
  styleHudLine(said, hudColor("plain"))
  said.SetWidth(SAID_WIDTH)
  said.SetHidden(true)

  const lines: LabelControl[] = []
  for (let at = 0; at < LINES_SHOWN; at++) lines.push(lineLabel(window))

  const counts: LabelControl[] = []
  for (let at = 0; at < LINES_SHOWN; at++) {
    const count = lineLabel(window)
    count.SetHorizontalAlignment(TEXT_ALIGN_RIGHT)
    counts.push(count)
  }

  return { window, title, choose, apply, said, lines, counts }
}

function placeAt(control: Control, panel: TargetPanel, top: number): number {
  control.ClearAnchors()
  control.SetAnchor(TOPLEFT, panel.window, TOPLEFT, PADDING, top)
  control.SetHidden(false)
  return top + control.GetHeight()
}

const watchedNames = new Set<string>()

function watchBeside(name: string, target: Control): undefined {
  if (watchedNames.has(name)) return undefined
  watchedNames.add(name)
  for (const event of ["OnShow", "OnHide"]) {
    target.SetHandler(event, () => refreshTargetPanel(), PANEL_NAME)
  }
  return undefined
}

function besideTarget(): Control | undefined {
  let last: Control | undefined
  for (const name of BESIDE_NAMES) {
    const candidate = WINDOW_MANAGER.GetControlByName(name)
    if (candidate === undefined) continue
    watchBeside(name, candidate)
    if (!candidate.IsHidden()) return candidate
    last = candidate
  }
  return last
}

function besideRoom(): number | undefined {
  const beside = besideTarget()
  return beside === undefined ? undefined : beside.GetLeft() - PANEL_GAP * 2
}

function placeBeside(window: TopLevelWindow): undefined {
  window.ClearAnchors()
  const beside = besideTarget()
  if (beside === undefined) {
    window.SetAnchor(TOPRIGHT, GuiRoot, TOPRIGHT, -PANEL_GAP, PANEL_GAP)
    return undefined
  }
  if (window.GetWidth() + PANEL_GAP * 2 <= beside.GetLeft()) {
    window.SetAnchor(TOPRIGHT, beside, TOPLEFT, -PANEL_GAP, 0)
    return undefined
  }
  window.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, PANEL_GAP, beside.GetTop())
  return undefined
}

function panelTop(): number {
  return besideTarget()?.GetTop() ?? PANEL_GAP
}

function screenBottom(): number {
  const strip = WINDOW_MANAGER.GetControlByName(KEYBIND_STRIP_NAME)
  if (strip === undefined || strip.IsHidden()) return GuiRoot.GetHeight()
  return strip.GetTop()
}

function placeRow(row: ShownRow, panel: TargetPanel, top: number): number {
  const bottom = placeAt(row.label, panel, top)
  if (row.count === undefined) return bottom
  row.count.ClearAnchors()
  row.count.SetAnchor(TOPRIGHT, panel.window, TOPRIGHT, -PADDING, top)
  row.count.SetHidden(false)
  return bottom
}

function refreshTargetPanel(this: void): undefined {
  if (held === undefined) return undefined
  const panel = held
  for (const line of [...panel.lines, panel.title, panel.choose, panel.apply]) {
    line.SetHidden(true)
    line.SetWidth(0)
    line.SetHeight(HUD_ROW_HEIGHT)
  }
  for (const count of panel.counts) count.SetHidden(true)
  const target = currentCharacterTarget()
  if (target === undefined) {
    panel.window.SetHidden(true)
    return undefined
  }
  panel.title.SetText(`Target Build — ${target.title}`)
  const next = nextTarget()
  if (next !== undefined) panel.choose.SetText(`Switch to ${next.title}`)
  const sections = checklistOf(target)
  const applying = toApply(sections)
  if (applying.length > 0) panel.apply.SetText(applyText(applying))

  const tops = [panel.title]
  if (next !== undefined) tops.push(panel.choose)
  if (applying.length > 0) tops.push(panel.apply)
  const saidHeight = panel.said.GetText() === "" ? 0 : panel.said.GetTextHeight() + HEADER_GAP
  const head = PADDING * 2 + tops.length * HUD_ROW_HEIGHT + HEADER_GAP + saidHeight
  const budget = math.floor((screenBottom() - panelTop() - head) / HUD_ROW_HEIGHT)
  const rows = showRows(panel.lines, panel.counts, sections, budget)

  let widest = MIN_WIDTH
  for (const line of tops) widest = math.max(widest, line.GetTextWidth())
  if (panel.said.GetText() !== "") widest = math.max(widest, SAID_WIDTH)
  for (const row of rows) widest = math.max(widest, row.label.GetTextWidth() + row.trailing)

  const room = besideRoom()
  let width = widest + PADDING * 2
  if (room !== undefined && width > room) {
    const inner = math.max(MIN_WIDTH, room - PADDING * 2)
    for (const line of tops) wrapTo(line, inner)
    panel.said.SetWidth(math.min(SAID_WIDTH, inner))
    for (const row of rows) wrapTo(row.label, math.max(MIN_WIDTH, inner - row.trailing))
    width = math.max(room, MIN_WIDTH + PADDING * 2)
  }

  let top = PADDING
  for (const line of tops) top = placeAt(line, panel, top)
  top += HEADER_GAP
  if (panel.said.GetText() !== "") {
    placeAt(panel.said, panel, top)
    top += math.max(panel.said.GetHeight(), panel.said.GetTextHeight()) + HEADER_GAP
  }
  for (const row of rows) top = placeRow(row, panel, top)
  panel.window.SetDimensions(width, top + PADDING)
  placeBeside(panel.window)
  panel.window.SetHidden(!shownScene())
  return undefined
}

function shownScenes(): readonly Scene[] {
  const skills = SCENE_MANAGER.GetScene(SKILLS_SCENE_NAME)
  return skills === undefined ? [STATS_SCENE] : [STATS_SCENE, skills]
}

function shownScene(): boolean {
  return shownScenes().some((scene) => scene.IsShowing())
}

export function initializeTargetBuildPanel(): undefined {
  if (held !== undefined) return undefined
  const panel = createTargetPanel()
  held = panel
  for (const scene of shownScenes()) {
    scene.RegisterCallback("StateChange", (_oldState, newState) => {
      if (newState === SCENE_SHOWING) refreshTargetPanel()
      else if (newState === SCENE_HIDDEN && !shownScene()) panel.window.SetHidden(true)
    })
  }
  const refreshShown = (): undefined => {
    if (!panel.window.IsHidden()) refreshTargetPanel()
    return undefined
  }
  whenBarsSaid((text) => {
    panel.said.SetText(text)
    return refreshShown()
  })
  EVENT_MANAGER.RegisterForEvent(UPDATES_NAME, EVENT_INVENTORY_SINGLE_SLOT_UPDATE, refreshShown)
  EVENT_MANAGER.RegisterForEvent(`${UPDATES_NAME}Bars`, EVENT_HOTBAR_SLOT_UPDATED, refreshShown)
  return undefined
}
