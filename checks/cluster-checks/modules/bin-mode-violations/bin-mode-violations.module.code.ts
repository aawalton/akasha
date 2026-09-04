import { posix } from "node:path"
import { z } from "zod"

export const PackageJsonSchema = z
  .object({
    name: z.string().optional(),
    bin: z.union([z.string(), z.record(z.string(), z.string())]).optional(),
  })
  .passthrough()

export type PackageJsonShape = z.infer<typeof PackageJsonSchema>

export function parseManifest(raw: string): PackageJsonShape {
  let result: ReturnType<typeof PackageJsonSchema.safeParse>
  try {
    result = PackageJsonSchema.safeParse(JSON.parse(raw))
  } catch (err) {
    throw new Error(`not JSON: ${err instanceof Error ? err.message : String(err)}`)
  }
  if (result.success) return result.data
  const where = result.error.issues
    .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("; ")
  throw new Error(`JSON, but not a shape \`name\` and \`bin\` can be read off — ${where}`)
}

export interface BinTargetPath {
  readonly pkgName: string
  readonly pkgJsonPath: string
  readonly command: string
  readonly target: string
}

export interface BinModeViolation {
  message?: string
  readonly pkgName: string
  readonly pkgJsonPath: string
  readonly command: string
  readonly target: string
  readonly actualMode: string
}

const EXPECTED_MODE = "100755"

function unscoped(name: string): string {
  const slash = name.indexOf("/")
  return slash === -1 ? name : name.slice(slash + 1)
}

function joinTarget(pkgJsonPath: string, value: string): string {
  const dir = posix.dirname(pkgJsonPath)
  return posix.normalize(dir === "." ? value : posix.join(dir, value))
}

export function extractBinTargets(
  pkgJson: PackageJsonShape,
  pkgJsonPath: string
): readonly BinTargetPath[] {
  const bin = pkgJson.bin
  if (bin === undefined) return []
  const name = pkgJson.name
  if (name === undefined) {
    throw new Error(
      "carries a `bin` field and no `name`, so no command can be derived and no package named for its targets"
    )
  }
  if (typeof bin === "string") {
    return [
      {
        pkgName: name,
        pkgJsonPath,
        command: unscoped(name),
        target: joinTarget(pkgJsonPath, bin),
      },
    ]
  }
  return Object.entries(bin).map(([command, value]) => ({
    pkgName: name,
    pkgJsonPath,
    command,
    target: joinTarget(pkgJsonPath, value),
  }))
}

export function findBinModeViolations(
  entries: readonly BinTargetPath[],
  modeOf: (target: string) => string | undefined
): readonly BinModeViolation[] {
  const violations: BinModeViolation[] = []
  for (const entry of entries) {
    const actual = modeOf(entry.target)
    if (actual === EXPECTED_MODE) continue
    violations.push({
      pkgName: entry.pkgName,
      pkgJsonPath: entry.pkgJsonPath,
      command: entry.command,
      target: entry.target,
      actualMode: actual ?? "(untracked)",
    })
  }
  violations.sort((a, b) => {
    if (a.pkgJsonPath !== b.pkgJsonPath) return a.pkgJsonPath < b.pkgJsonPath ? -1 : 1
    return a.command < b.command ? -1 : a.command > b.command ? 1 : 0
  })
  return violations
}
