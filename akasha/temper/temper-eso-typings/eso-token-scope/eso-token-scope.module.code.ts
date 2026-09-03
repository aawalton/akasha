import type {
  ParsedEnum,
  ParsedEvent,
  ParsedFunction,
  ParsedObject,
} from "../eso-doc-tokens/eso-doc-tokens.module.code.ts"

export interface EsoOptIn {
  readonly functions: readonly string[]
  readonly objects: readonly string[]
  readonly events: readonly string[]
  readonly enums: readonly string[]
  readonly excludeObjects?: readonly string[]
}

export interface ParsedTokens {
  readonly functions: readonly ParsedFunction[]
  readonly objects: readonly ParsedObject[]
  readonly events: readonly ParsedEvent[]
  readonly enums: readonly ParsedEnum[]
}

export interface SelectedTokens {
  readonly functions: readonly ParsedFunction[]
  readonly objects: readonly ParsedObject[]
  readonly events: readonly ParsedEvent[]
  readonly enums: readonly ParsedEnum[]
}

const IDENTIFIER_RE = /[A-Za-z_][A-Za-z0-9_]*/g

function identifiersIn(typeStr: string): readonly string[] {
  const out: string[] = []
  for (const m of typeStr.matchAll(IDENTIFIER_RE)) out.push(m[0])
  return out
}

export function selectOptIn(parsed: ParsedTokens, optIn: EsoOptIn): SelectedTokens {
  const fnSet = new Set(optIn.functions)
  const evSet = new Set(optIn.events)

  const functions = parsed.functions.filter((f) => fnSet.has(f.name))
  const events = parsed.events.filter((e) => evSet.has(e.name))

  const excludeObjSet = new Set(optIn.excludeObjects ?? [])
  const objByName = new Map(parsed.objects.map((o) => [o.name, o]))
  const selectedObjNames = new Set<string>()
  const objQueue = [...optIn.objects]
  while (objQueue.length > 0) {
    const n = objQueue.pop()
    if (n === undefined || selectedObjNames.has(n) || excludeObjSet.has(n)) continue
    const obj = objByName.get(n)
    if (obj === undefined) continue
    selectedObjNames.add(n)
    for (const parent of obj.inheritsFrom) {
      if (!selectedObjNames.has(parent) && !excludeObjSet.has(parent)) objQueue.push(parent)
    }
  }
  const objects = parsed.objects.filter((o) => selectedObjNames.has(o.name))

  const enumNames = new Set(parsed.enums.map((e) => e.name))
  const selectedEnumNames = new Set(optIn.enums)
  const collect = (typeStr: string): undefined => {
    for (const id of identifiersIn(typeStr)) {
      if (enumNames.has(id)) selectedEnumNames.add(id)
    }
  }
  for (const f of functions) {
    for (const p of f.params) collect(p.type)
    for (const r of f.returns) collect(r.type)
  }
  for (const o of objects) {
    for (const m of o.methods) {
      for (const p of m.params) collect(p.type)
      for (const r of m.returns) collect(r.type)
    }
  }
  for (const e of events) {
    for (const p of e.params) collect(p.type)
  }
  const enums = parsed.enums.filter((e) => selectedEnumNames.has(e.name))

  return { functions, objects, events, enums }
}
