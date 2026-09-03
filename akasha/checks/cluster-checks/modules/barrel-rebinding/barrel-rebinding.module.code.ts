import type { MockLeakContext } from "../mock-module-leak-context/mock-module-leak-context.module.code.ts"
import { slotKeyOf } from "../mock-module-leak-context/mock-module-leak-context.module.code.ts"

export type BarrelRebindingFinding = {
  readonly file: string
  readonly line: number
  readonly specifier: string
  readonly stubbedExports: readonly string[]
  readonly definingModule: string
  readonly internalImporters: readonly string[]
}

export const findBarrelRebindingViolations = (
  ctx: MockLeakContext
): readonly BarrelRebindingFinding[] => {
  const findings: BarrelRebindingFinding[] = []

  for (const site of ctx.sites) {
    if (site.mockerType === null) continue
    if (site.targetRel === null || !site.objectLiteral) continue

    const groups = new Map<string, { symbols: Set<string>; importers: Set<string> }>()
    for (const { key, definer } of site.stubbedSlots) {
      if (definer.moduleId === site.targetId) continue
      const definerRel = ctx.relById.get(definer.moduleId)
      const definerPackage = ctx.packageById.get(definer.moduleId)
      if (definerRel === undefined || definerPackage === undefined) continue
      const importers = ctx.slotInternalImporters.get(slotKeyOf(definer))?.get(definerPackage)
      if (importers === undefined || importers.size === 0) continue
      const group = groups.get(definerRel) ?? {
        symbols: new Set<string>(),
        importers: new Set<string>(),
      }
      group.symbols.add(key)
      for (const imp of importers) group.importers.add(imp)
      groups.set(definerRel, group)
    }

    for (const [definerRel, group] of groups) {
      findings.push({
        file: site.mockerRel,
        line: site.line,
        specifier: site.specifier,
        stubbedExports: [...group.symbols].sort(),
        definingModule: definerRel,
        internalImporters: [...group.importers].sort(),
      })
    }
  }

  findings.sort((a, b) => {
    if (a.file !== b.file) return a.file < b.file ? -1 : 1
    if (a.line !== b.line) return a.line - b.line
    return a.definingModule < b.definingModule ? -1 : a.definingModule > b.definingModule ? 1 : 0
  })
  return findings
}
