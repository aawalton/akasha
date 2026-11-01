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
  HUD_COUNT_GAP,
  HUD_ROW_HEIGHT,
  hudColor,
  hudIndent,
  styleHudLine,
} from "akasha/temper/addon/pages/characters/modules/characters-hud-line/characters-hud-line.module.code.ts"
import { progressSuffix } from "akasha/temper/addon/pages/characters/modules/characters-progress-format/characters-progress-format.module.code.ts"
import { PANEL_GAP } from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import type { CharacterTarget } from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"
import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/addon/type/temper-items-global/temper-items-global.type-declaration.d.ts"
import {
  colorOf,
  colorText,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import { LINE_HEIGHT } from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"

const PANEL_NAME = "TemperCharactersTargetBuild"

const BESIDE_NAMES = ["ZO_Skills", "ZO_AdvancedStatsPanel", "ZO_StatsPanel"]

const SKILLS_SCENE_NAME = "skills"

const LINES_SHOWN = 40

const PADDING = 16

const HEADER_GAP = 8

const SMALL_WORDS = new Set(["a", "an", "and", "for", "of", "on", "or", "the", "to"])

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

function titleCase(title: string): string {
  return title
    .split(" ")
    .map((word, at) =>
      at > 0 && SMALL_WORDS.has(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ")
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

function lineLabel(window: Control): LabelControl {
  const label = WINDOW_MANAGER.CreateControl(undefined, window, CT_LABEL)
  label.SetHeight(HUD_ROW_HEIGHT)
  label.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  label.SetHidden(true)
  return label
}

function linkLabel(window: Control, onClick: (this: void) => undefined): LabelControl {
  const link = lineLabel(window)
  styleHudLine(link, hudColor("blue"))
  link.SetMouseEnabled(true)
  link.SetHandler("OnMouseEnter", () => colorText(link, colorOf("strong")))
  link.SetHandler("OnMouseExit", () => colorText(link, hudColor("blue")))
  link.SetHandler("OnMouseUp", (_link: Control, button: number, upInside: boolean) => {
    if (upInside && button === MOUSE_BUTTON_INDEX_LEFT) onClick()
  })
  return link
}

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

function showHeading(
  label: LabelControl,
  count: LabelControl,
  title: string,
  met: number,
  total: number
): number {
  const color = met === total ? hudColor("plain") : hudColor("gold")
  styleHudLine(label, color)
  label.SetText(titleCase(title))
  styleHudLine(count, color)
  count.SetText(progressSuffix(met, total))
  return HUD_COUNT_GAP + count.GetTextWidth()
}

function showUnmet(label: LabelControl, text: string): undefined {
  styleHudLine(label, hudColor("plain"))
  label.SetText(hudIndent(1) + text)
  return undefined
}

interface ShownRow {
  readonly label: LabelControl
  readonly count?: LabelControl
  readonly trailing: number
}

function showRows(panel: TargetPanel, sections: readonly ChecklistSection[]): readonly ShownRow[] {
  const rows: ShownRow[] = []
  let used = 0
  for (const section of sections) {
    const label = panel.lines[used]
    const count = panel.counts[used]
    if (label === undefined || count === undefined) break
    used++
    const met = section.lines.filter((line) => line.met).length
    const trailing = showHeading(label, count, section.title, met, section.lines.length)
    rows.push({ label, count, trailing })
    for (const line of section.lines) {
      if (line.met) continue
      const row = panel.lines[used]
      if (row === undefined) break
      used++
      showUnmet(row, line.text)
      rows.push({ label: row, trailing: 0 })
    }
  }
  return rows
}

function placeRow(row: ShownRow, panel: TargetPanel, top: number): number {
  const bottom = placeAt(row.label, panel, top)
  if (row.count === undefined) return bottom
  row.count.ClearAnchors()
  row.count.SetAnchor(TOPRIGHT, panel.window, TOPRIGHT, -PADDING, top)
  row.count.SetHidden(false)
  return bottom
}

function wrapTo(label: LabelControl, width: number): undefined {
  label.SetWidth(width)
  label.SetHeight(math.max(HUD_ROW_HEIGHT, label.GetTextHeight() + HUD_ROW_HEIGHT - LINE_HEIGHT))
  return undefined
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
  const rows = showRows(panel, sections)

  const tops = [panel.title]
  if (next !== undefined) tops.push(panel.choose)
  if (applying.length > 0) tops.push(panel.apply)
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
