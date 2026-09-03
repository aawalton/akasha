import { hasVisibleBoundary } from "../component-layout-boundary/component-layout-boundary.module.code.ts"
import type { ClassUsage } from "../jsx-class-tokens/jsx-class-tokens.module.code.ts"

export function isCompoundSlotInBoundedFamily(
  usages: readonly ClassUsage[],
  target: ClassUsage,
  componentNames: ReadonlySet<string>
): boolean {
  if (!target.isRootElement) return false
  if (target.dataSlot === null) return false
  const slotPascal = kebabToPascal(target.dataSlot)
  if (slotPascal === null) return false

  const familyRoot = longestStrictPrefixIn(slotPascal, componentNames)
  if (familyRoot === null) return false

  return anyMemberPaintsBoundary(usages, componentNames, familyRoot)
}

function kebabToPascal(kebab: string): string | null {
  let out = ""
  for (const segment of kebab.split("-")) {
    if (segment.length === 0) continue
    out += segment.charAt(0).toUpperCase() + segment.slice(1)
  }
  return out.length === 0 ? null : out
}

function longestStrictPrefixIn(
  slotPascal: string,
  componentNames: ReadonlySet<string>
): string | null {
  let best: string | null = null
  for (const name of componentNames) {
    if (name.length >= slotPascal.length) continue
    if (!slotPascal.startsWith(name)) continue
    if (best === null || name.length > best.length) best = name
  }
  return best
}

function anyMemberPaintsBoundary(
  usages: readonly ClassUsage[],
  componentNames: ReadonlySet<string>,
  familyRoot: string
): boolean {
  const family = new Set<string>()
  for (const name of componentNames) {
    if (name.startsWith(familyRoot)) family.add(name)
  }
  if (family.size === 0) return false
  for (const u of usages) {
    if (u.enclosingComponent === null) continue
    if (!family.has(u.enclosingComponent)) continue
    if (hasVisibleBoundary(u.tokens, u.callExpressionNames, u.jsxTagName)) return true
  }
  return false
}
