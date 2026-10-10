import type { SubRowSpec } from "akasha/temper/addon/pages/characters/modules/characters-task-hud-rows/characters-task-hud-rows.module.code.ts"

type Rgb = readonly [number, number, number]

export interface ShownItem {
  readonly name: string
  readonly count: number
  readonly note?: string
  readonly rgb?: Rgb
}

export interface InventoryHintLine {
  readonly text: string
  readonly venue?: string
  readonly items?: readonly ShownItem[]
}

const ITEM_CAP = 15

const EXPANDED_VENUES: Record<string, boolean> = {}

export function itemLines(items: readonly ShownItem[], cap: number): SubRowSpec[] {
  const shown = items.length > cap ? cap : items.length
  const lines: SubRowSpec[] = []
  for (let i = 0; i < shown; i++) {
    const item = items[i]
    if (item === undefined) continue
    const count = item.count > 1 ? ` x${item.count}` : ""
    const note = item.note === undefined ? "" : ` (${item.note})`
    lines.push({ text: `${item.name}${count}${note}`, color: "default", indent: 2, rgb: item.rgb })
  }
  if (items.length > shown) {
    lines.push({ text: `+${items.length - shown} more`, color: "default", indent: 2 })
  }
  return lines
}

export function itemNote(
  destination: string | undefined,
  verb: string,
  label: string,
  characterName: (this: void, characterId: string) => string | undefined
): string | undefined {
  if (destination === "craft-bag") return "craft bag"
  if (destination?.startsWith("character:") === true) {
    return characterName(destination.substring("character:".length)) ?? "another character"
  }
  if (verb === "deposit" || verb === "sell") return undefined
  if (verb.toLowerCase() === label.toLowerCase()) return undefined
  return verb
}

function keepExpansions(venues: readonly string[]): undefined {
  for (const venue of Object.keys(EXPANDED_VENUES)) {
    if (!venues.includes(venue)) delete EXPANDED_VENUES[venue]
  }
}

export function inventoryHintSpecs(lines: readonly InventoryHintLine[]): SubRowSpec[] {
  const venues: string[] = []
  for (const line of lines) {
    if (line.venue !== undefined) venues.push(line.venue)
  }
  keepExpansions(venues)

  const specs: SubRowSpec[] = []
  for (const line of lines) {
    const venue = line.venue
    const items = line.items ?? []
    if (venue === undefined || items.length === 0) {
      specs.push({ text: line.text, color: "default" })
      continue
    }
    specs.push({
      text: line.text,
      color: "default",
      onClick: function (this: void): undefined {
        if (EXPANDED_VENUES[venue] === true) {
          delete EXPANDED_VENUES[venue]
        } else {
          EXPANDED_VENUES[venue] = true
        }
      },
    })
    if (EXPANDED_VENUES[venue] === true) {
      for (const spec of itemLines(items, ITEM_CAP)) specs.push(spec)
    }
  }
  return specs
}
