import {
  argumentsIn,
  type Taken,
} from "akasha/commands/modules/help-writing/help-writing.module.code.ts"
import { slugOfPart } from "akasha/commands/modules/namespace-listing/namespace-listing.module.code.ts"
import {
  typeSlugById,
  valuesOfType,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const ARGUMENT_TYPE = "01a093fd-9102-76e8-958e-03d34cd41e25"

const SLUG = "slug"

const SAID = "said"

const TAKES = "takes"

const PLACEHOLDER = "placeholder"

const WORD = "word"

const FLAG_OR_WORD = "flag-or-word"

export type Said = {
  readonly said: string
  readonly takes: string
  readonly placeholder: string | null
}

export function linesIn(root: string): ReadonlyMap<string, Said> {
  const found = new Map<string, Said>()
  const type = typeSlugById(root, ARGUMENT_TYPE)
  if (type === null) return found
  for (const one of valuesOfType(root, type)) {
    const slug = one.value[SLUG]
    const said = one.value[SAID]
    const takes = one.value[TAKES]
    if (typeof slug !== "string" || typeof said !== "string" || typeof takes !== "string") continue
    const shown = one.value[PLACEHOLDER]
    found.set(slug, { said, takes, placeholder: typeof shown === "string" ? shown : null })
  }
  return found
}

function asAWord(slug: string, one: Said): string {
  return `<${one.placeholder ?? slug}>`
}

function atAFlag(one: Said): string {
  return one.placeholder === null ? one.said : `${one.said} <${one.placeholder}>`
}

function spelt(slug: string, one: Said, saidAs: string | null): readonly Taken[] {
  const takes = one.takes
  if (saidAs === WORD) return [{ said: asAWord(slug, one), takes }]
  if (saidAs === FLAG_OR_WORD) {
    return [
      { said: asAWord(slug, one), takes },
      { said: atAFlag(one), takes },
    ]
  }
  return [{ said: atAFlag(one), takes }]
}

export function argumentsNamed(
  root: string,
  page: Record<string, unknown> | null
): readonly Taken[] {
  if (page === null) return []
  const named = argumentsIn(page)
  if (named.length === 0) return []
  const lines = linesIn(root)
  const held: Taken[] = []
  for (const part of named) {
    const slug = slugOfPart(part.argument)
    const one = lines.get(slug)
    if (one !== undefined) held.push(...spelt(slug, one, part.saidAs))
  }
  return held
}
