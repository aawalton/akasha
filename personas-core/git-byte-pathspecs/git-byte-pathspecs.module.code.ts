export const AWEN_ENGINE_PREFIX = "packages/alanwalton/awen/"
export const ASTRA_PAGES_PREFIX = "packages/shared/pages/"
export const ATHENA_AGENTS_PREFIX = "packages/agents/"

const CODE_EXTENSIONS = ["ts", "tsx"] as const
const MARKDOWN_EXTENSIONS = ["md"] as const

function normalizePrefix(pathPrefix: string): string {
  return pathPrefix.replace(/\/+$/, "")
}

const PREFIX_EXTENSIONS: ReadonlyMap<string, readonly string[]> = new Map<
  string,
  readonly string[]
>([
  [normalizePrefix(AWEN_ENGINE_PREFIX), CODE_EXTENSIONS],
  [normalizePrefix(ASTRA_PAGES_PREFIX), CODE_EXTENSIONS],
  [normalizePrefix(ATHENA_AGENTS_PREFIX), CODE_EXTENSIONS],
])

export function extensionsForPrefix(pathPrefix: string): readonly string[] {
  return PREFIX_EXTENSIONS.get(normalizePrefix(pathPrefix)) ?? MARKDOWN_EXTENSIONS
}

export function pathspecsForPrefix(pathPrefix: string): readonly string[] {
  const prefix = normalizePrefix(pathPrefix)
  return extensionsForPrefix(pathPrefix).flatMap((ext) => [
    `:(glob)${prefix}/**/*.${ext}`,
    `:(glob)${prefix}/*.${ext}`,
  ])
}

export function pathspecsForPrefixes(prefixes: string | readonly string[]): readonly string[] {
  const list = typeof prefixes === "string" ? [prefixes] : prefixes
  const seen = new Set<string>()
  const specs: string[] = []
  for (const prefix of list) {
    for (const spec of pathspecsForPrefix(prefix)) {
      if (seen.has(spec)) continue
      seen.add(spec)
      specs.push(spec)
    }
  }
  return specs
}

export function resolvePointsPrefixes(row: {
  readonly pointsPathPrefix?: string
  readonly pointsPathPrefixes?: readonly string[]
}): readonly string[] {
  const many = (row.pointsPathPrefixes ?? []).filter((prefix) => prefix.trim() !== "")
  if (many.length > 0) return many
  const one = row.pointsPathPrefix ?? ""
  return one.trim() === "" ? [] : [one]
}
