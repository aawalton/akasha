import { detectTestType } from "../test-step-paths/test-step-paths.module.code.ts"

const DOM_PRELOAD_RE = /preload\s*=\s*\[[^\]]*happy-?dom[^\]]*\]/im

export const PRELOAD_KINDS = ["dom"] as const
export type PreloadKind = (typeof PRELOAD_KINDS)[number]

export interface PreloadObligation {
  readonly workspace: string
  readonly kind: PreloadKind
  readonly files: readonly string[]
}

export interface PreloadNeed {
  readonly file: string
  readonly workspace: string
  readonly kind: PreloadKind
}

export function preloadsNeededBy(file: string): readonly PreloadKind[] {
  return detectTestType(file) === "component" ? ["dom"] : []
}

export function bunfigRegisters(bunfig: string): boolean {
  return DOM_PRELOAD_RE.test(bunfig)
}

export function collectObligations(needs: readonly PreloadNeed[]): readonly PreloadObligation[] {
  const byKey = new Map<string, { workspace: string; kind: PreloadKind; files: string[] }>()
  for (const need of needs) {
    const key = `${need.workspace} ${need.kind}`
    const entry = byKey.get(key)
    if (entry === undefined) {
      byKey.set(key, { workspace: need.workspace, kind: need.kind, files: [need.file] })
      continue
    }
    entry.files.push(need.file)
  }
  return [...byKey.values()]
    .map((e) => ({ workspace: e.workspace, kind: e.kind, files: [...e.files].sort() }))
    .sort((a, b) => a.workspace.localeCompare(b.workspace) || a.kind.localeCompare(b.kind))
}

export function preloadRemedy(
  obligation: PreloadObligation,
  bunfigExists: boolean
): readonly string[] {
  const { workspace, files } = obligation
  const bunfig = `${workspace}/bunfig.toml`
  const shown = files.slice(0, 5).map((f) => `      ${f}`)
  const rest = files.length > shown.length ? [`      … ${files.length - shown.length} more`] : []
  const entry = `"@akasha/testing-system/dom-registering"`
  const headline = `${workspace}: ${files.length} component test file(s) and ${bunfig} does not register a happy-dom preload.`
  const cost =
    '    Without it every render throws a bare "ReferenceError: document is not defined" out of @testing-library/react.'
  const reference = "    See akasha/alan/web/bunfig.toml for a reference."
  const edit = bunfigExists
    ? [`    Add ${entry} to the [test] preload array in ${bunfig}:`]
    : [
        `    Add a bunfig.toml at the workspace root with:`,
        `      [test]`,
        `      preload = [${entry}]`,
      ]
  return [headline, ...shown, ...rest, ...edit, cost, reference]
}
