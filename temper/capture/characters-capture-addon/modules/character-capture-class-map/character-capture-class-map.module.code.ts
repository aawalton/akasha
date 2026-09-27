import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { noClass } from "akasha/temper/catalog/skill/temper-class/pages/no-class.temper-class.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import type { TemperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.types.ts"

type Places = { [esoClassId: number]: number | undefined }

let held: Places | undefined

function placesOf(this: void): Places {
  const found: Places = {}
  for (const one of $pagesOfType<Pick<TemperClass, "esoClassId" | "hashPlace">>(temperClass)) {
    found[one.esoClassId] = one.hashPlace
  }
  return found
}

export function getClassIndex(esoClassId: number): number {
  held ??= placesOf()
  return held[esoClassId] ?? noClass.hashPlace
}
