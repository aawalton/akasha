const MANIFEST_ENDING = "package.json"

const OPENS = "workspace:"

const EVERY = "@*"

export type Phase = "expand" | "migrate" | "done"

export type Phasing = { readonly phase: Phase; readonly at: string } | { readonly refused: string }

function parsed(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export function namesIn(manifests: ReadonlyMap<string, string>): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [path, text] of manifests) {
    if (!path.endsWith(MANIFEST_ENDING)) continue
    const read = parsed(text) as { readonly name?: unknown } | null
    if (read !== null && typeof read.name === "string") found.set(path, read.name)
  }
  return found
}

export function aliasFor(now: string): string {
  return `${OPENS}${now}${EVERY}`
}

export function aliasedIn(text: string, was: string): boolean {
  const read = parsed(text) as { readonly dependencies?: unknown } | null
  const said = read === null ? undefined : read.dependencies
  if (said === null || typeof said !== "object" || said === undefined) return false
  return Object.hasOwn(said, was)
}

export function phaseOf(
  named: ReadonlyMap<string, string>,
  root: string,
  was: string,
  now: string
): Phasing {
  if (was === now) return { refused: `\`${was}\` is the name it already carries` }
  let atWas: string | null = null
  let atNow: string | null = null
  for (const [path, name] of named) {
    if (name === was) atWas = path
    if (name === now) atNow = path
  }
  if (atWas !== null && atNow !== null) {
    return { refused: `\`${now}\` is the name ${atNow} already carries` }
  }
  if (atWas !== null) return { phase: "expand", at: atWas }
  if (atNow === null) return { refused: `no manifest calls its package \`${was}\`` }
  return aliasedIn(root, was) ? { phase: "migrate", at: atNow } : { phase: "done", at: atNow }
}

export function batchIn(paths: readonly string[], width: number): readonly string[] {
  if (width <= 0) return paths
  return [...paths].sort().slice(0, width)
}
