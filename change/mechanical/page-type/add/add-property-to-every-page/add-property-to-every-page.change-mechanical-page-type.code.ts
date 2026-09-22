import {
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { afterIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import {
  keyFaultIn,
  valueSpelled,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import {
  editsOver,
  type Page,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly pageType: string
  readonly key: string
  readonly value: string
  readonly after?: string
}

export function pagesIn(world: World, given: Asked): readonly Page[] | string {
  const carried = world.index.propertiesIfNamed(given.pageType)
  if (carried === null) return `\`${given.pageType}\` names no page type`
  const held = carried.find((one) => one.key === given.key)
  if (held === undefined) {
    return `a \`${given.pageType}\` carries no property under \`${given.key}\``
  }
  if (held.many) return `\`${given.key}\` carries many values, so one value states nothing`
  const listed = world.index.everyOfType(given.pageType)
  if (listed.length === 0) return `no page is a \`${given.pageType}\``
  const valued = world.index.valuesByPath(given.pageType)
  return listed.map((one) => {
    const value = valued.get(one.path)
    const placed = value === undefined ? null : afterIn(world, value, given.key)
    const after = given.after ?? placed ?? undefined
    return {
      path: one.path,
      written: [{ written: "put", key: given.key, value: given.value, after } as const],
    }
  })
}

export function addPropertyToEveryPage(world: World, given: Asked): Said {
  const fault = keyFaultIn(given.key)
  if (fault !== null) return refusing(fault)
  const value = given.value.trim()
  if (!valueSpelled(value)) {
    return refusing(`\`${value}\` parses as no value, so nothing is put in`)
  }
  const held = pagesIn(world, { ...given, value })
  if (typeof held === "string") return refusing(held)
  const made = editsOver(world, held)
  return typeof made === "string" ? refusing(made) : stating(made)
}

export function runChange(world: World, given: Asked): Said {
  return addPropertyToEveryPage(world, given)
}
