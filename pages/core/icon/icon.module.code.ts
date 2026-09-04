import {
  ICON_NAMES,
  ICON_SEARCH_INDEX,
  type IconName,
  PASCAL_TO_KEBAB,
} from "../generated/icon-search-index/icon-search-index.module.code.ts"

const FALLBACK_ICON_NAME: IconName = "file-text"

export const DEFAULT_ICON_NAME: IconName = "file-text"

const NAME_SET: ReadonlySet<string> = new Set<string>(ICON_NAMES)

function isIconName(value: string): value is IconName {
  return NAME_SET.has(value)
}

let aliasMap: Map<string, IconName> | null = null
function getAliasMap(): Map<string, IconName> {
  if (aliasMap) return aliasMap
  const m = new Map<string, IconName>()
  for (const entry of ICON_SEARCH_INDEX) {
    for (const alias of entry.aliases) {
      if (!m.has(alias)) m.set(alias, entry.name)
    }
  }
  aliasMap = m
  return m
}

export function resolveIconName(input: string | null | undefined): IconName {
  if (input == null || input === "") return FALLBACK_ICON_NAME
  if (isIconName(input)) return input
  const pascalMapped = PASCAL_TO_KEBAB[input]
  if (pascalMapped != null) return pascalMapped
  const lower = input.toLowerCase()
  if (isIconName(lower)) return lower
  const alias = getAliasMap().get(lower)
  if (alias != null) return alias
  return FALLBACK_ICON_NAME
}

export function searchIcons(query: string): ReadonlyArray<(typeof ICON_SEARCH_INDEX)[number]> {
  const q = query.trim().toLowerCase()
  if (q === "") return ICON_SEARCH_INDEX
  return ICON_SEARCH_INDEX.filter((entry) => {
    if (entry.name.includes(q)) return true
    for (const kw of entry.keywords) if (kw.includes(q)) return true
    return false
  })
}
