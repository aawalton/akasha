import {
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  keyFaultIn,
  valueSpelled,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import {
  editsOver,
  type Page,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

export type Valued = {
  readonly path: string
  readonly value: string
}

export type Asked = {
  readonly key: string
  readonly valued: readonly Valued[]
  readonly after?: string
}

export function pagesIn(given: Asked): readonly Page[] | string {
  const found: Page[] = []
  const named = new Set<string>()
  for (const one of given.valued) {
    if (named.has(one.path)) return `\`${one.path}\` is named twice, and one page takes one value`
    named.add(one.path)
    const value = one.value.trim()
    if (!valueSpelled(value)) return `\`${value}\` parses as no value, so nothing is put in`
    const put =
      given.after === undefined
        ? ({ written: "put", key: given.key, value } as const)
        : ({ written: "put", key: given.key, value, after: given.after } as const)
    found.push({ path: one.path, written: [put] })
  }
  return found
}

export function addPropertyToPages(world: World, given: Asked): Said {
  const fault = keyFaultIn(given.key)
  if (fault !== null) return refusing(fault)
  if (given.valued.length === 0) return refusing("no page is named, so nothing is put in")
  const held = pagesIn(given)
  if (typeof held === "string") return refusing(held)
  const made = editsOver(world, held)
  return typeof made === "string" ? refusing(made) : stating(made)
}

export function runChange(world: World, given: Asked): Said {
  return addPropertyToPages(world, given)
}
