export interface SourceLayoutViolation {
  rule: "noOutDir" | "sourceLayout" | "excludeShape"
  workspace: string
  message: string
}

export interface NestedContainmentViolation {
  rule: "nestedContainment"
  workspace: string
  message: string
}

const CANONICAL_INCLUDES: ReadonlyArray<readonly string[]> = [
  ["src/**/*.ts"],
  ["src/**/*.ts", "src/**/*.tsx"],
]

const REQUIRED_EXCLUDE_PREFIX: readonly string[] = ["node_modules", "dist"]

const ALLOWED_EXCLUDE_TAIL: ReadonlySet<string> = new Set([
  "**/*.test.ts",
  "**/*.test.tsx",
  "tests/**/*",
])

function arraysEqual(a: readonly unknown[], b: readonly unknown[]): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null
}

export function validateNoOutDir(
  workspace: string,
  tsconfig: Record<string, unknown>
): SourceLayoutViolation | null {
  const co = tsconfig.compilerOptions
  if (!isRecord(co) || co.outDir === undefined) return null
  if ("tstl" in tsconfig) return null
  return {
    rule: "noOutDir",
    workspace,
    message: `"${workspace}" sets compilerOptions.outDir without TSTL bundling`,
  }
}

export function validateSourceLayout(
  workspace: string,
  tsconfig: Record<string, unknown>
): SourceLayoutViolation | null {
  const include = tsconfig.include
  if (!Array.isArray(include) || include.length === 0) {
    return {
      rule: "sourceLayout",
      workspace,
      message: `"${workspace}" has missing or empty tsconfig include field`,
    }
  }
  for (const canonical of CANONICAL_INCLUDES) {
    if (arraysEqual(include, canonical)) return null
  }
  return {
    rule: "sourceLayout",
    workspace,
    message: `"${workspace}" tsconfig include ${JSON.stringify(include)} does not match canonical shape ["src/**/*.ts"] or ["src/**/*.ts", "src/**/*.tsx"]`,
  }
}

export function validateExcludeShape(
  workspace: string,
  tsconfig: Record<string, unknown>
): SourceLayoutViolation | null {
  const exclude = tsconfig.exclude
  if (exclude === undefined) return null
  if (!Array.isArray(exclude)) {
    return {
      rule: "excludeShape",
      workspace,
      message: `"${workspace}" tsconfig exclude is ${JSON.stringify(exclude)} rather than an array; it must be an array opening with ${JSON.stringify(REQUIRED_EXCLUDE_PREFIX)}, or absent`,
    }
  }
  const prefix = exclude.slice(0, REQUIRED_EXCLUDE_PREFIX.length)
  if (!arraysEqual(prefix, REQUIRED_EXCLUDE_PREFIX)) {
    return {
      rule: "excludeShape",
      workspace,
      message: `"${workspace}" tsconfig exclude ${JSON.stringify(exclude)} does not open with ${JSON.stringify(REQUIRED_EXCLUDE_PREFIX)}`,
    }
  }
  const tail = exclude.slice(REQUIRED_EXCLUDE_PREFIX.length)
  const unstated = tail.filter((e) => typeof e !== "string" || !ALLOWED_EXCLUDE_TAIL.has(e))
  if (unstated.length > 0) {
    return {
      rule: "excludeShape",
      workspace,
      message: `"${workspace}" tsconfig exclude carries ${JSON.stringify(unstated)} after ${JSON.stringify(REQUIRED_EXCLUDE_PREFIX)}; only ${JSON.stringify([...ALLOWED_EXCLUDE_TAIL])} may follow, so an exclusion cannot drop non-test source`,
    }
  }
  return null
}

export function validateNestedPackageContainment(
  workspaces: readonly string[]
): readonly NestedContainmentViolation[] {
  const violations: NestedContainmentViolation[] = []
  for (const child of workspaces) {
    for (const parent of workspaces) {
      if (parent === child) continue
      const prefix = `${parent}/`
      if (!child.startsWith(prefix)) continue
      const remainder = child.slice(prefix.length)
      if (remainder === "src" || remainder.startsWith("src/")) {
        violations.push({
          rule: "nestedContainment",
          workspace: child,
          message: `"${child}" is nested inside "${parent}"'s src/ directory; nested workspaces must be siblings of the parent's src/, not inside it`,
        })
      }
    }
  }
  return violations
}
