export const EXACT_PIN_REQUIRED: ReadonlySet<string> = new Set<string>(["typescript-7"])

const ALIASED = /^npm:(?:@[^/]+\/)?[^@]+@/

const EXACT = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/

export function isExactPin(spec: string): boolean {
  return EXACT.test(spec.replace(ALIASED, ""))
}

export interface PinDepEntry {
  readonly workspace: string
  readonly version: string
  readonly depType: string
}

export interface PinViolation {
  readonly package: string
  readonly workspace: string
  readonly version: string
  readonly depType: string
}

export function computePinViolations(
  depMap: ReadonlyMap<string, readonly PinDepEntry[]>,
  required: ReadonlySet<string> = EXACT_PIN_REQUIRED
): readonly PinViolation[] {
  const violations: PinViolation[] = []
  for (const pkg of required) {
    const entries = depMap.get(pkg)
    if (entries === undefined) continue
    for (const e of entries) {
      if (isExactPin(e.version)) continue
      violations.push({
        package: pkg,
        workspace: e.workspace,
        version: e.version,
        depType: e.depType,
      })
    }
  }
  return violations
}
