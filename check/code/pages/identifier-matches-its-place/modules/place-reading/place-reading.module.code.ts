import { dirname } from "node:path"
import { luaExport } from "akasha/design/language/lua-compiler/lualib-helper/properties/lua-export.text-property.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  textAt,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { matchingIn } from "akasha/page/name-format/modules/format-reaching/format-reaching.module.code.ts"
import type { Matching } from "akasha/page/name-format/modules/name-matching/name-matching.module.code.ts"
import { componentIdentifier } from "akasha/page/name-place/pages/component-identifier.name-place.ts"
import { constantIdentifier } from "akasha/page/name-place/pages/constant-identifier.name-place.ts"
import { derivedIdentifier } from "akasha/page/name-place/pages/derived-identifier.name-place.ts"
import { functionIdentifier } from "akasha/page/name-place/pages/function-identifier.name-place.ts"
import { typeIdentifier } from "akasha/page/name-place/pages/type-identifier.name-place.ts"
import { textProperty } from "akasha/page/text-property/text-property.page-type.ts"
import { loadedExport } from "akasha/page/type/properties/loaded-export.text-property.ts"

const FIXED_BY = `${textProperty.slug}/${luaExport.slug}` as const

const FIXED_KEY = "luaExport"

const LOADED_BY = `${textProperty.slug}/${loadedExport.slug}` as const

const LOADED_KEY = "loadedExport"

const SLUG = "slug"

export type Placing = {
  readonly nameFormat: string
  readonly matching: Matching
}

export type Places = {
  readonly typeIdentifier: Placing
  readonly functionIdentifier: Placing
  readonly componentIdentifier: Placing
  readonly constantIdentifier: Placing
  readonly derivedIdentifier: Placing
  readonly fixed: ReadonlyMap<string, string>
  readonly loaded: ReadonlyMap<string, ReadonlySet<string>>
}

function fixedNamesIn(index: Answering): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const held = index.carryingOf(FIXED_BY)
  if ("refused" in held) return found
  for (const one of held.carrying) {
    const value = index.pageByPath(one.path)
    if (value === null) continue
    const named = value[FIXED_KEY]
    if (typeof named === "string") found.set(dirname(one.path), named)
  }
  return found
}

function loadedNamesIn(index: Answering): ReadonlyMap<string, ReadonlySet<string>> {
  const found = new Map<string, ReadonlySet<string>>()
  const held = index.carryingOf(LOADED_BY)
  if ("refused" in held) return found
  for (const one of held.carrying) {
    const value = index.pageByPath(one.path)
    if (value === null) continue
    const named = textsAt(value, LOADED_KEY)
    const slug = textAt(value, SLUG)
    if (named === null || slug === null) continue
    found.set(slug, new Set(named))
  }
  return found
}

export function placesIn(
  root: string,
  index: Answering,
  codeAt: (path: string) => string | null = (path) => path
): Places {
  const formatting = matchingIn(root, index, codeAt)
  const held = (nameFormat: string): Placing => ({
    nameFormat,
    matching: formatting(nameFormat),
  })
  return {
    fixed: fixedNamesIn(index),
    loaded: loadedNamesIn(index),
    typeIdentifier: held(typeIdentifier.nameFormat),
    functionIdentifier: held(functionIdentifier.nameFormat),
    componentIdentifier: held(componentIdentifier.nameFormat),
    constantIdentifier: held(constantIdentifier.nameFormat),
    derivedIdentifier: held(derivedIdentifier.nameFormat),
  }
}
