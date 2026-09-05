const MANIFEST_ENDING = "package.json"

const ENDING = ".ts"

const OPENING = "./"

export type Phase = "expand" | "migrate" | "done"

export type Phasing = { readonly phase: Phase; readonly at: string } | { readonly refused: string }

export function phaseOf(named: ReadonlyMap<string, string>, was: string, now: string): Phasing {
  if (was === now) return { refused: `\`${was}\` is the name it already carries` }
  let atWas: string | null = null
  let atNow: string | null = null
  for (const [path, name] of named) {
    if (name === was) atWas = path
    if (name === now) atNow = path
  }
  if (atWas !== null && atNow === null) return { phase: "expand", at: atWas }
  if (atWas !== null && atNow !== null) return { phase: "migrate", at: atNow }
  if (atNow !== null) return { phase: "done", at: atNow }
  return { refused: `no manifest calls its package \`${was}\`` }
}

export function namesIn(manifests: ReadonlyMap<string, string>): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [path, text] of manifests) {
    if (!path.endsWith(MANIFEST_ENDING)) continue
    const read = JSON.parse(text) as { readonly name?: unknown }
    if (typeof read.name === "string") found.set(path, read.name)
  }
  return found
}

export function subpathsIn(text: string): readonly string[] {
  const read = JSON.parse(text) as { readonly exports?: Record<string, unknown> }
  if (read.exports === undefined) return []
  return Object.keys(read.exports).filter((one) => one.startsWith(OPENING))
}

export function bodyPathFor(subpath: string): string {
  return `${subpath.slice(OPENING.length)}${ENDING}`
}

export function compatBodyFor(now: string, subpath: string): string {
  return `export * from "${now}${subpath.slice(1)}"\n`
}

export function compatManifestFor(was: string, subpaths: readonly string[]): string {
  const exports: Record<string, string> = {}
  for (const one of [...subpaths].sort()) exports[one] = `${OPENING}${bodyPathFor(one)}`
  return `${JSON.stringify({ name: was, private: true, exports }, null, 2)}\n`
}

export function compatFilesFor(
  folder: string,
  was: string,
  now: string,
  subpaths: readonly string[]
): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  found.set(`${folder}/${MANIFEST_ENDING}`, compatManifestFor(was, subpaths))
  for (const one of subpaths) {
    found.set(`${folder}/${bodyPathFor(one)}`, compatBodyFor(now, one))
  }
  return found
}

export function batchIn(paths: readonly string[], width: number): readonly string[] {
  if (width <= 0) return paths
  return [...paths].sort().slice(0, width)
}
