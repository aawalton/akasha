import { partedIn } from "../../pages/file-name/page-file-name.module.code.ts"
import {
  everyOfType,
  idsNaming,
  typeSlugOf,
} from "../../pages/indexes/reading/index-reading.module.code.ts"
import { valueAt } from "../../pages/value/page-value.module.code.ts"

const INITIATIVE_TYPE = "01a04e58-5735-72b4-b945-56366461c776"

const PARENT = "parent-slug"

const PERSONA = "personaSlug"

const INTENTS = "intents"

const STATEMENT = "statement"

const WORKING_MEMORY = "workingMemory"

export type InitiativeIntent = {
  readonly statement: string
  readonly workingMemory: string | null
}

export type InitiativeRow = {
  readonly slug: string
  readonly path: string
  readonly parent: string | null
  readonly persona: string | null
  readonly intents: readonly InitiativeIntent[]
}

type Held = {
  readonly persona: string | null
  readonly intents: readonly InitiativeIntent[]
}

const NOTHING_HELD: Held = { persona: null, intents: [] }

function slugIn(path: string, typeSlug: string): string | null {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0 || said.pageType !== typeSlug) return null
  return said.slug
}

function textIn(held: unknown): string | null {
  return typeof held === "string" && held !== "" ? held : null
}

// AN INTENT WITH NO STATEMENT IS NO INTENT, and is passed over rather than drawn as a row with an
// empty label. The statement is required of an intent where the page type declares one, so a page
// short of it is a page the write gate would have refused — this reads what is on disk, which is
// not always what the gate last judged.
function intentsIn(held: unknown): readonly InitiativeIntent[] {
  if (!Array.isArray(held)) return []
  const drawn: InitiativeIntent[] = []
  for (const one of held) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const row = one as Record<string, unknown>
    const statement = textIn(row[STATEMENT])
    if (statement === null) continue
    drawn.push({ statement, workingMemory: textIn(row[WORKING_MEMORY]) })
  }
  return drawn
}

// WHAT THE PAGE ITSELF CARRIES, TAKEN IN ONE OPENING RATHER THAN ONE FOR EACH KEY. The index files
// identities and edges and no text, so both the persona and the intents have to come out of the
// page body — and transpiling a body to read it is the dearest thing this module does, so it is
// done once for each initiative however many keys are wanted off it.
function heldAt(root: string, path: string): Held {
  const value = valueAt(path, root)
  if (value === null) return NOTHING_HELD
  return { persona: textIn(value[PERSONA]), intents: intentsIn(value[INTENTS]) }
}

export function initiativesDrawn(root: string): readonly InitiativeRow[] {
  const typeSlug = typeSlugOf(root, INITIATIVE_TYPE)
  const pages = everyOfType(root, typeSlug)
  const slugById = new Map<string, string>()
  for (const one of pages) {
    const slug = slugIn(one.path, typeSlug)
    if (slug !== null) slugById.set(one.id, slug)
  }
  const edges = [...pages].flatMap((one) => {
    const parent = slugById.get(one.id)
    if (parent === undefined) return []
    return [...idsNaming(root, one.id, PARENT)].flatMap((naming) => {
      const child = slugById.get(naming)
      return child === undefined ? [] : [{ child, parent }]
    })
  })
  const parentsOf = Map.groupBy(edges, (one) => one.child)
  const drawn: InitiativeRow[] = []
  for (const one of pages) {
    const slug = slugById.get(one.id)
    if (slug === undefined) continue
    const named = parentsOf.get(slug) ?? []
    const held = heldAt(root, one.path)
    drawn.push({
      slug,
      path: one.path,
      parent: named.length === 1 ? (named[0]?.parent ?? null) : null,
      persona: held.persona,
      intents: held.intents,
    })
  }
  return drawn
}
