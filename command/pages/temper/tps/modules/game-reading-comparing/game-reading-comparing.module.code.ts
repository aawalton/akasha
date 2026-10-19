import type { CatalogBar } from "akasha/temper/player/character/stat/modules/character-rotation-reading/character-rotation-reading.module.code.ts"
import type { RotationReading } from "akasha/temper/player/character/stat/modules/rotation-reading/rotation-reading.module.code.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

type GameReading = NonNullable<CharacterCompletion["rotationReading"]>

type GameBar = GameReading["bars"][number]

const NEAR = 0.005

const MULTIPLIERS = ["healthMaximum", "armorShare", "damageTaken", "healing", "damage"] as const

const DIFFERS = "  <- differs"

function differs(one: number, two: number): boolean {
  const scale = Math.max(Math.abs(one), Math.abs(two))
  if (scale === 0) return false
  return Math.abs(one - two) / scale > NEAR
}

function shown(value: number): string {
  return Math.abs(value) >= 100 ? `${Math.round(value)}` : value.toFixed(3)
}

function pairLine(name: string, catalog: number, game: number): string {
  const mark = differs(catalog, game) ? DIFFERS : ""
  return `  ${name}: catalog ${shown(catalog)}, game ${shown(game)}${mark}`
}

function barLines(catalog: CatalogBar, game: GameBar | undefined): string[] {
  const lines = [`  ${catalog.bar}:`]
  if (game === undefined) {
    lines.push("    the add-on kept no multipliers for this bar")
    return lines
  }
  const styles = `catalog ${catalog.weaponStyle ?? "none"}, game ${game.weaponStyle ?? "none"}`
  const styleMark = (catalog.weaponStyle ?? "") === (game.weaponStyle ?? "") ? "" : DIFFERS
  lines.push(`    weapon style: ${styles}${styleMark}`)
  const multipliers = catalog.multipliers
  if (multipliers === undefined) {
    lines.push("    the catalog worked out no multipliers for this bar")
    return lines
  }
  for (const name of MULTIPLIERS) lines.push(`  ${pairLine(name, multipliers[name], game[name])}`)
  return lines
}

function catalogReavingShare(reading: RotationReading): number {
  return reading.directDamage === 0 ? 0 : reading.reavingBlowsHealing / reading.directDamage
}

export function comparedLines(
  bars: readonly CatalogBar[],
  reading: RotationReading,
  game: GameReading | undefined
): string[] {
  if (game === undefined) {
    return [
      "",
      "the add-on has worked out no reading for this character, so opening the character sheet in the game takes one",
    ]
  }
  const lines = [
    "",
    "set beside the reading the add-on worked out in the game:",
    pairLine("toughness", reading.toughnessPerSecond, game.toughness),
    pairLine("damage", reading.damagePerSecond, game.damage),
    pairLine("healing", reading.healingPerSecond, game.healing),
    pairLine("Reaving Blows share", catalogReavingShare(reading), game.reavingBlowsShare),
  ]
  for (const bar of bars) {
    lines.push(
      ...barLines(
        bar,
        game.bars.find((one) => one.bar === bar.bar)
      )
    )
  }
  return lines
}
