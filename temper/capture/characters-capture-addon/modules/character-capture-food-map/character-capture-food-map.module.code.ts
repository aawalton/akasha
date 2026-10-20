import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.ts"
import type { TemperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.types.ts"

type FoodPage = Pick<TemperFoodOrDrink, "abilityId" | "hashPlace">

type Held = { readonly places: { [abilityId: number]: number | undefined }; readonly bits: number }

let held: Held | undefined

function bitsFor(this: void, count: number): number {
  let bits = 1
  let span = 2
  while (span < count) {
    span *= 2
    bits += 1
  }
  return bits
}

function heldOf(this: void): Held {
  const pages = $pagesOfType<FoodPage>(temperFoodOrDrink)
  const places: Held["places"] = {}
  for (const one of pages) {
    if (one.abilityId !== undefined) places[one.abilityId] = one.hashPlace
  }
  return { places, bits: bitsFor(pages.length) }
}

export function getFoodIndex(abilityId: number): number {
  held ??= heldOf()
  return held.places[abilityId] ?? 0
}

export function foodOrDrinkBits(): number {
  held ??= heldOf()
  return held.bits
}
