import { readFileSync } from "node:fs"

export const CLAUDE_CONFIG_PATH = new URL(
  "../../agent-settings/pages/claude-config/claude-config.agent-settings.harness-settings.json",
  import.meta.url
).pathname

const HOME_TOKEN = "$HOME"

export function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null
}

export function expandHome(path: string, homeDir: string): string {
  return path.startsWith(HOME_TOKEN) ? `${homeDir}${path.slice(HOME_TOKEN.length)}` : path
}

export function reconcileClaudeConfig(
  existing: Record<string, unknown>,
  declared: Record<string, unknown>,
  homeDir: string
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...existing }
  for (const [key, value] of Object.entries(declared)) {
    if (key !== "projects") {
      out[key] = value
      continue
    }
    const declaredProjects = asRecord(value)
    if (declaredProjects === null) continue
    const projects: Record<string, unknown> = { ...(asRecord(existing.projects) ?? {}) }
    for (const [rawPath, entry] of Object.entries(declaredProjects)) {
      const declaredEntry = asRecord(entry)
      if (declaredEntry === null) continue
      const path = expandHome(rawPath, homeDir)
      projects[path] = { ...(asRecord(projects[path]) ?? {}), ...declaredEntry }
    }
    out.projects = projects
  }
  return out
}

export function readClaudeConfigDeclaration(
  path: string = CLAUDE_CONFIG_PATH
): Record<string, unknown> | null {
  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch {
    return null
  }
  try {
    return asRecord(JSON.parse(raw))
  } catch {
    return null
  }
}
