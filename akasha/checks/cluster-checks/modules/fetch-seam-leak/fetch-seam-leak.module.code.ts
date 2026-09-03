import type { MockLeakContext } from "../mock-module-leak-context/mock-module-leak-context.module.code.ts"
import { slotKeyOf } from "../mock-module-leak-context/mock-module-leak-context.module.code.ts"

const FETCH_CALL_RE = /(?<![.\w])fetch\s*\(/

const FETCH_ASSIGN_RE = /\b(?:globalThis|global|window)\s*\.\s*fetch\s*=/

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "")
}

export type FetchSeamLeakFinding = {
  readonly file: string
  readonly line: number
  readonly specifier: string
  readonly seam: string
  readonly stubbedExports: readonly string[]
  readonly consumers: readonly string[]
}

function reachableWithCut(
  start: string,
  adjacency: ReadonlyMap<string, readonly string[]>,
  cut: ReadonlySet<string>
): Set<string> {
  const seen = new Set<string>()
  const stack = [start]
  while (stack.length > 0) {
    const node = stack.pop()
    if (node === undefined) continue
    for (const next of adjacency.get(node) ?? []) {
      if (cut.has(next) || seen.has(next)) continue
      seen.add(next)
      stack.push(next)
    }
  }
  return seen
}

export const findFetchSeamLeakViolations = (
  ctx: MockLeakContext,
  readSource: (repoRelFile: string) => string | null
): readonly FetchSeamLeakFinding[] => {
  const seamCache = new Map<string, boolean>()
  const isFetchSeam = (rel: string): boolean => {
    const cached = seamCache.get(rel)
    if (cached !== undefined) return cached
    if ((ctx.testTypeByRel.get(rel) ?? null) !== null) {
      seamCache.set(rel, false)
      return false
    }
    const src = readSource(rel)
    const verdict = src !== null && FETCH_CALL_RE.test(stripComments(src))
    seamCache.set(rel, verdict)
    return verdict
  }
  const controllerCache = new Map<string, boolean>()
  const isFetchController = (rel: string): boolean => {
    const cached = controllerCache.get(rel)
    if (cached !== undefined) return cached
    const src = readSource(rel)
    const verdict = src !== null && FETCH_ASSIGN_RE.test(stripComments(src))
    controllerCache.set(rel, verdict)
    return verdict
  }

  const reachCache = new Map<string, Set<string>>()
  const reachOf = (t: string): Set<string> => {
    const cached = reachCache.get(t)
    if (cached !== undefined) return cached
    const r = reachableWithCut(t, ctx.importAdjacency, ctx.mockedTargets.get(t) ?? new Set())
    reachCache.set(t, r)
    return r
  }

  const findings: FetchSeamLeakFinding[] = []

  for (const site of ctx.sites) {
    if (site.mockerType === null) continue
    if (site.targetRel === null || !site.objectLiteral) continue
    if (site.mockerPackage === null) continue

    const candidates = (ctx.populationTestsByPackage.get(site.mockerPackage) ?? []).filter(
      (rel) => rel !== site.mockerRel
    )

    const leakingKeys = new Set<string>()
    const consumerFiles = new Set<string>()
    let seamModule: string | null = null

    for (const { key, definer } of site.stubbedSlots) {
      const definerRel = ctx.relById.get(definer.moduleId)
      if (definerRel === undefined || !isFetchSeam(definerRel)) continue
      const slotKey = slotKeyOf(definer)
      const productionImporters = ctx.slotProductionImporters.get(slotKey)
      if (productionImporters === undefined || productionImporters.size === 0) continue

      for (const victim of candidates) {
        if (ctx.testTypeByRel.get(victim) === site.mockerType) continue
        if (!isFetchController(victim)) continue
        if ((ctx.stubbedSlotsByTest.get(victim) ?? new Set()).has(slotKey)) continue
        const reach = reachOf(victim)
        let hit = false
        for (const importer of productionImporters) {
          if (reach.has(importer)) {
            hit = true
            break
          }
        }
        if (hit) {
          leakingKeys.add(key)
          consumerFiles.add(victim)
          seamModule = definerRel
        }
      }
    }

    if (leakingKeys.size > 0 && seamModule !== null) {
      findings.push({
        file: site.mockerRel,
        line: site.line,
        specifier: site.specifier,
        seam: seamModule,
        stubbedExports: [...leakingKeys].sort(),
        consumers: [...consumerFiles].sort(),
      })
    }
  }

  findings.sort((a, b) => {
    if (a.file !== b.file) return a.file < b.file ? -1 : 1
    if (a.line !== b.line) return a.line - b.line
    return a.specifier < b.specifier ? -1 : a.specifier > b.specifier ? 1 : 0
  })
  return findings
}
