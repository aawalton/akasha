import { AL_POTION_4X } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-required-skill/writ-required-skill.module.code.ts"
import type {
  CraftCandidate,
  CraftFound,
  CraftShortfallResolver,
  Takes,
} from "akasha/temper/addon/pages/items/modules/inventory-craft-shortfall/inventory-craft-shortfall.module.code.ts"
import {
  cheapestOption,
  type PricedOption,
  yieldPassive,
} from "akasha/temper/addon/pages/items/modules/inventory-craft-shortfall-plan/inventory-craft-shortfall-plan.module.code.ts"
import { lookupTtcPricing } from "akasha/temper/addon/pages/items/modules/inventory-item-data/inventory-item-data.module.code.ts"
import { REAGENT_TRAITS } from "akasha/temper/addon/pages/items/modules/inventory-writ-crafting-alchemy-solver/inventory-writ-crafting-alchemy-solver.module.code.ts"
import { findItemInBags } from "akasha/temper/addon/pages/items/modules/inventory-writ-crafting-enchanting/inventory-writ-crafting-enchanting.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-02/eso-enums-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

const SOLVENT_PROFICIENCY = "Solvent Proficiency"

interface OnHand {
  readonly id: number
  readonly bag: number
  readonly slot: number
}

interface RankedSolvent {
  readonly solvent: OnHand
  readonly rank: number
}

const LORKHANS_TEARS = 64501

const ALKAHEST = 75365

function topSolventsOnHand(this: void): RankedSolvent[] {
  const found: RankedSolvent[] = []
  for (const id of [LORKHANS_TEARS, ALKAHEST]) {
    const where = findItemInBags(id)
    if (where === undefined) continue
    const link = GetItemLink(where.bag, where.slot, LINK_STYLE_BRACKETS)
    found.push({
      solvent: { id, bag: where.bag, slot: where.slot },
      rank: GetItemLinkRequiredCraftingSkillRank(link),
    })
  }
  return found
}

function reagentsOnHand(this: void): OnHand[] {
  const found: OnHand[] = []
  for (const key of Object.keys(REAGENT_TRAITS)) {
    const id = Number(key)
    const where = findItemInBags(id)
    if (where !== undefined) found.push({ id, bag: where.bag, slot: where.slot })
  }
  return found
}

function resultOf(this: void, solvent: OnHand, reagents: readonly OnHand[]): string {
  const [r1, r2, r3] = reagents
  if (r1 === undefined || r2 === undefined) return ""
  const [link] = GetAlchemyResultingItemLink(
    solvent.bag,
    solvent.slot,
    r1.bag,
    r1.slot,
    r2.bag,
    r2.slot,
    r3?.bag,
    r3?.slot,
    LINK_STYLE_BRACKETS
  )
  return link
}

function locate(this: void, ids: readonly number[]): OnHand[] | undefined {
  const found: OnHand[] = []
  for (const id of ids) {
    const where = findItemInBags(id)
    if (where === undefined) return undefined
    found.push({ id, bag: where.bag, slot: where.slot })
  }
  return found
}

function candidateFor(
  this: void,
  ranked: RankedSolvent,
  have: number,
  reagents: readonly OnHand[],
  itemLink: string,
  note: string | undefined
): CraftCandidate {
  const ids = [ranked.solvent.id]
  for (const one of reagents) ids.push(one.id)
  return {
    made: itemLink,
    ...(note === undefined ? {} : { note }),
    passives: [
      { passive: SOLVENT_PROFICIENCY, have, need: ranked.rank },
      yieldPassive(AL_POTION_4X),
    ],
    yieldPerCraft: function (this: void): number {
      const [solvent] = locate(ids) ?? []
      return solvent === undefined ? 0 : GetAlchemyResultQuantity(solvent.bag, solvent.slot, 1)
    },
    maxCrafts: function (this: void): number {
      const [solvent, r1, r2, r3] = locate(ids) ?? []
      if (solvent === undefined || r1 === undefined || r2 === undefined) return 0
      const [most] = GetMaxIterationsPossibleForAlchemyItem(
        solvent.bag,
        solvent.slot,
        r1.bag,
        r1.slot,
        r2.bag,
        r2.slot,
        r3?.bag,
        r3?.slot
      )
      return most
    },
    craft: function (this: void, crafts: number): undefined {
      const [solvent, r1, r2, r3] = locate(ids) ?? []
      if (solvent === undefined || r1 === undefined || r2 === undefined) return
      CraftAlchemyItem(
        solvent.bag,
        solvent.slot,
        r1.bag,
        r1.slot,
        r2.bag,
        r2.slot,
        r3?.bag,
        r3?.slot,
        crafts
      )
    },
  }
}

interface Combination {
  readonly reagents: OnHand[]
  readonly itemLink: string
}

function combinationsMaking(
  this: void,
  solvent: OnHand,
  reagents: readonly OnHand[],
  thirdSlot: boolean,
  takes: Takes
): Combination[] {
  const found: Combination[] = []
  const n = reagents.length
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const pair = [reagents[i], reagents[j]].filter((one): one is OnHand => one !== undefined)
      const link = resultOf(solvent, pair)
      if (link !== "" && takes(link)) found.push({ reagents: pair, itemLink: link })
      if (!thirdSlot) continue
      for (let k = j + 1; k < n; k++) {
        const three = [reagents[i], reagents[j], reagents[k]].filter(
          (one): one is OnHand => one !== undefined
        )
        const tripleLink = resultOf(solvent, three)
        if (tripleLink !== "" && takes(tripleLink)) {
          found.push({ reagents: three, itemLink: tripleLink })
        }
      }
    }
  }
  return found
}

function unitPrice(this: void, reagent: OnHand): number | undefined {
  return lookupTtcPricing(GetItemLink(reagent.bag, reagent.slot, LINK_STYLE_BRACKETS)).marketValue
}

function pricedCombinations(
  this: void,
  found: readonly Combination[]
): PricedOption<Combination>[] {
  const priced: PricedOption<Combination>[] = []
  for (const one of found) {
    const unitPrices: (number | undefined)[] = []
    for (const reagent of one.reagents) unitPrices.push(unitPrice(reagent))
    priced.push({ option: one, unitPrices })
  }
  return priced
}

function findCombination(this: void, takes: Takes): CraftFound {
  const solvents = topSolventsOnHand()
  if (solvents.length === 0) {
    return { kind: "refused", why: "no Lorkhan's Tears or Alkahest, the top solvents, is on hand" }
  }
  const reagents = reagentsOnHand()
  if (reagents.length < 2) return { kind: "refused", why: "fewer than two reagents are on hand" }
  const have = GetNonCombatBonus(NON_COMBAT_BONUS_ALCHEMY_LEVEL)
  const thirdSlot = GetNonCombatBonus(NON_COMBAT_BONUS_ALCHEMY_THIRD_SLOT) > 0
  for (const ranked of solvents) {
    const found = combinationsMaking(ranked.solvent, reagents, thirdSlot, takes)
    const chosen = cheapestOption(pricedCombinations(found))
    if (chosen !== undefined) {
      const note = chosen.priced
        ? undefined
        : "no reagent combination had Tamriel Trade Centre prices, so the first found was used"
      return {
        kind: "found",
        candidate: candidateFor(ranked, have, chosen.option.reagents, chosen.option.itemLink, note),
      }
    }
  }
  return {
    kind: "refused",
    why: "no solvent and reagents on hand make anything the rule takes",
  }
}

export function alchemyShortfallResolver(this: void): CraftShortfallResolver {
  return {
    craftType: CRAFTING_TYPE_ALCHEMY,
    categoryIds: ["potions", "poisons"],
    itemTypes: [ITEMTYPE_POTION, ITEMTYPE_POISON],
    find: findCombination,
  }
}
