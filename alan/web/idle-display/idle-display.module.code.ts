import { gainedStars, sumOwnedRanks } from "@akasha/idle-system/accrual"
import {
  APO_DIVISOR,
  ASCEND_MIN,
  BOON_DEFS,
  OVERDRIVE_MULT,
  PERK_DEFS,
  PRESTIGE_UNLOCK,
  STAR_VALUE,
} from "@akasha/idle-system/constants"
import {
  affinityBonus,
  apotheosisBonus,
  boonBonus,
  constellationBonus,
  echoBonus,
  eternityAvailable,
  foundationBonus,
  harmonyBonus,
  legacyPointsAvailable,
  legacyTiersBonus,
  medalBonus,
  perkBonus,
  resonanceBonus,
  seatTiers,
} from "@akasha/idle-system/dormancy"
import { collectionBonus } from "@akasha/idle-system/gacha-state"
import { teamSynergy } from "@akasha/idle-system/rate"
import type { GameState } from "@akasha/idle-system/state"
import { formatShortNumber as fmt } from "@akasha/pages-core/property-types/number"

type IndicatorChip = {
  readonly key: string
  readonly name: string
  readonly mult: number
  readonly live: boolean
  readonly detail?: string
}

export function deriveIndicatorChips(state: GameState): readonly IndicatorChip[] {
  const chip = (key: string, name: string, mult: number, detail?: string): IndicatorChip => ({
    key,
    name,
    mult,
    live: mult > 1,
    ...(detail !== undefined ? { detail } : {}),
  })
  const legacyStars = state.legacyStars ?? 0
  return [
    chip("synergy", "Synergy", 1 + teamSynergy(state)),
    chip("legacy", "Legacy", 1 + legacyStars * STAR_VALUE, `${fmt(legacyStars)}★`),
    chip(
      "affinity",
      "Affinity",
      1 +
        affinityBonus(
          state.activeTeam ?? [],
          state.teammates,
          state.affinityUnlocked === true,
          seatTiers(state)
        )
    ),
    chip("medals", "Medals", 1 + medalBonus(state)),
    chip("resonance", "Resonance", 1 + resonanceBonus(state)),
    chip("cohesion", "Cohesion", 1 + (state.cohesionMult ?? 0)),
    chip("perks", "Perks", 1 + perkBonus(state)),
    chip("boons", "Boons", 1 + boonBonus(state)),
    chip("constellation", "Constellation", 1 + constellationBonus(state)),
    chip("tiers", "Legacy Tiers", 1 + legacyTiersBonus(state)),
    chip("overdrive", "Overdrive", state.overdriveActive === true ? OVERDRIVE_MULT : 1),
    chip("harmony", "Harmony", 1 + harmonyBonus(state)),
    chip("echoes", "Echoes", 1 + echoBonus(state)),
    chip("foundation", "Foundation", 1 + foundationBonus(state)),
    chip("apotheosis", "Apotheosis", 1 + apotheosisBonus(state)),
    chip("collection", "Collection", 1 + collectionBonus(state)),
  ]
}

export type AscendTrade =
  | { readonly kind: "ready"; readonly gain: number; readonly gainPct: string }
  | { readonly kind: "too-soon"; readonly text: string }

export type AscensionBoon = { readonly id: string; readonly name: string; readonly pct: number }

export type AscensionView =
  | { readonly locked: true; readonly teaser: string; readonly progress: string }
  | {
      readonly locked: false
      readonly stars: string
      readonly mult: string
      readonly ranksLabel: string
      readonly canAscend: boolean
      readonly trade: AscendTrade
      readonly boons: readonly AscensionBoon[] | null
    }

export function deriveAscensionView(state: GameState): AscensionView {
  const ranks = sumOwnedRanks(state)
  if (state.prestigeUnlocked !== true) {
    return {
      locked: true,
      teaser: `Ascension unlocks at ${PRESTIGE_UNLOCK} total ranks`,
      progress: `${fmt(ranks)} / ${PRESTIGE_UNLOCK} ranks`,
    }
  }
  const stars = state.legacyStars ?? 0
  const gain = gainedStars(state)
  const canAscend = ranks >= ASCEND_MIN
  const trade: AscendTrade = canAscend
    ? { kind: "ready", gain, gainPct: `+${Math.round(gain * STAR_VALUE * 100)}%` }
    : { kind: "too-soon", text: `Ascend at ${ASCEND_MIN} ranks.` }
  const boons =
    state.boonsUnlocked === true
      ? Object.entries(BOON_DEFS).map(([id, def]) => ({
          id,
          name: def.name,
          pct: Math.round(def.mult * 100),
        }))
      : null
  return {
    locked: false,
    stars: `${fmt(stars)} ★`,
    mult: `+${Math.round(stars * STAR_VALUE * 100)}% permanent output`,
    ranksLabel: `${fmt(ranks)} total ranks`,
    canAscend,
    trade,
    boons,
  }
}

export type LegacyPerkOption = {
  readonly id: string
  readonly name: string
  readonly pct: number
  readonly cost: number
  readonly owned: boolean
  readonly affordable: boolean
}

export type LegacyPerksView = {
  readonly points: number
  readonly perks: readonly LegacyPerkOption[]
}

export function deriveLegacyPerksView(state: GameState): LegacyPerksView | null {
  if (state.perksUnlocked !== true) {
    return null
  }
  const points = legacyPointsAvailable(state)
  const owned = state.perks ?? []
  const perks = Object.entries(PERK_DEFS).map(([id, def]) => {
    const isOwned = owned.includes(id)
    return {
      id,
      name: def.name,
      pct: Math.round(def.mult * 100),
      cost: def.cost,
      owned: isOwned,
      affordable: !isOwned && points >= def.cost,
    }
  })
  return { points, perks }
}

export type ApotheosisView = {
  readonly eternity: string
  readonly available: number
  readonly line: string
  readonly buttonLabel: string
}

export function deriveApotheosisView(state: GameState): ApotheosisView | null {
  if (state.apotheosisUnlocked !== true) {
    return null
  }
  const pts = state.eternityPoints ?? 0
  const available = eternityAvailable(state)
  const eternity = `${fmt(pts)} ⟡ · +${Math.round(apotheosisBonus(state) * 100)}%`
  const line =
    available >= 1
      ? `Convert ${fmt(available * APO_DIVISOR)}★ → ${fmt(available)} Eternity.`
      : `Earn ${APO_DIVISOR}★ beyond converted to gain the next Eternity point.`
  const buttonLabel =
    available >= 1 ? `Ascend to Eternity (+${fmt(available)} ⟡)` : "Ascend to Eternity"
  return { eternity, available, line, buttonLabel }
}
