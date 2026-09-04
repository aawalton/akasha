import { AKASHA, rootFor, rootsHere } from "@akasha/pages-system/checkout-roots"
import { textAt, valueAt } from "@akasha/pages-system/page-value"
import { HOLE } from "../markdown-document-holes/markdown-document-holes.module.code.ts"

const REFUSALS = "checks/refusals/pages"

export class HoleMismatch extends Error {}

export function fill(body: string, values: Readonly<Record<string, string>>): string {
  const used = new Set<string>()
  const text = body.replace(HOLE, (whole, name: string) => {
    const value = values[name]
    if (value === undefined) {
      throw new HoleMismatch(`\`{${name}}\` is marked in the body and no value was handed over`)
    }
    used.add(name)
    return value
  })
  const surplus = Object.keys(values).filter((name) => !used.has(name))
  if (surplus.length > 0) {
    const named = surplus.map((name) => `\`${name}\``).join(", ")
    throw new HoleMismatch(`${named} was handed over and the body marks no such hole`)
  }
  return text
}

export function refusalText(
  slug: string,
  values: Readonly<Record<string, string>>,
  root: string = rootFor(rootsHere(), AKASHA)
): string {
  const at = `${REFUSALS}/${slug}.refusal.ts`
  const value = valueAt(at, root)
  if (value === null) {
    throw new Error(`${root}/${at} is not there, so there is no refusal to print`)
  }
  const text = textAt(value, "text")
  if (text === null) {
    throw new Error(`${root}/${at} states no words to print, so there is no refusal to print`)
  }
  return fill(text, values)
}
