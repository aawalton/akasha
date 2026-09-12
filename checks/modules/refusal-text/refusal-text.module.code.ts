import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  AKASHA,
  rootFor,
  rootsHere,
} from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

const REFUSAL = "refusal"

const HOLE = /\{([^{}]*)\}/g

class HoleMismatch extends Error {}

function fill(body: string, values: Readonly<Record<string, string>>): string {
  const used = new Set<string>()
  const text = body.replace(HOLE, (_whole, name: string) => {
    const value = values[name]
    if (value === undefined) {
      throw new HoleMismatch(`\`{${name}}\` is marked in the body and no value was handed over`)
    }
    used.add(name)
    return value
  })
  const surplus = Object.keys(values).filter((name) => !used.has(name))
  if (surplus.length > 0) {
    const named = namesDrawn(surplus)
    throw new HoleMismatch(`${named} was handed over and the body marks no such hole`)
  }
  return text
}

export function refusalText(
  slug: string,
  values: Readonly<Record<string, string>>,
  root: string = rootFor(rootsHere(), AKASHA)
): string {
  const one = listedAt(root, REFUSAL, slug)[0]
  if (one === undefined) {
    throw new Error(
      `the index files no \`${REFUSAL}\` under \`${slug}\`, so there is none to print`
    )
  }
  const value = valueAt(one.path, root)
  if (value === null) {
    throw new Error(`${root}/${one.path} is not there, so there is no refusal to print`)
  }
  const text = textAt(value, "text")
  if (text === null) {
    throw new Error(`${root}/${one.path} states no words to print, so there is no refusal to print`)
  }
  return fill(text, values)
}
