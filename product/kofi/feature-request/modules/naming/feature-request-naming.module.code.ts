import { pageStem } from "akasha/page/naming/named-for/modules/page-stem/page-stem.module.code.ts"

const SLUG_CEILING = 80

const FALLBACK = "request"

function stemOf(ask: string): string {
  const held = pageStem(pageStem(ask).slice(0, SLUG_CEILING))
  return held === "" ? FALLBACK : held
}

export function requestSlugFor(ask: string, taken: ReadonlySet<string>): string {
  const stem = stemOf(ask)
  let named = stem
  let nth = 1
  while (taken.has(named)) {
    nth += 1
    named = `${stem}-${nth}`
  }
  return named
}
