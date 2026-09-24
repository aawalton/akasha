import { z } from "zod"

export function computeServersToClear(
  declaredServers: readonly string[],
  disabledServers: readonly string[]
): readonly string[] {
  const declared = new Set(declaredServers)
  return disabledServers.filter((name) => declared.has(name))
}

const ProjectEntry = z.looseObject({ disabledMcpServers: z.array(z.string()).optional() })

const Config = z.looseObject({ projects: z.record(z.string(), ProjectEntry).optional() })

export type ReconcilePlan = {
  clearedServers: readonly string[]
  nextConfigText: string
}

function hasProjectsMap(v: unknown): v is { projects: Record<string, Record<string, unknown>> } {
  if (v === null || typeof v !== "object" || !("projects" in v)) return false
  const projects = v.projects
  return projects !== null && typeof projects === "object"
}

export function planDisableReconcile(
  rawConfigText: string,
  launchCwd: string,
  declaredServers: readonly string[],
  resolvePath: (p: string) => string
): ReconcilePlan | null {
  let parsed: unknown
  try {
    const raw: unknown = JSON.parse(rawConfigText)
    if (!Config.safeParse(raw).success) return null
    parsed = raw
  } catch {
    return null
  }
  if (!hasProjectsMap(parsed)) return null

  const realCwd = resolvePath(launchCwd)
  const projects = parsed.projects
  const cleared: string[] = []
  for (const key of Object.keys(projects)) {
    if (resolvePath(key) !== realCwd) continue
    const entry = projects[key]
    if (entry === undefined) continue
    const disabled = entry.disabledMcpServers
    if (!Array.isArray(disabled)) continue
    const disabledStrings = disabled.filter((name): name is string => typeof name === "string")
    const toClear = computeServersToClear(declaredServers, disabledStrings)
    if (toClear.length === 0) continue
    const clearSet = new Set(toClear)
    entry.disabledMcpServers = disabledStrings.filter((name) => !clearSet.has(name))
    cleared.push(...toClear)
  }

  if (cleared.length === 0) return null

  const hadTrailingNewline = rawConfigText.endsWith("\n")
  const serialized = JSON.stringify(parsed, null, 2)
  const nextConfigText = hadTrailingNewline ? `${serialized}\n` : serialized
  return { clearedServers: cleared, nextConfigText }
}
