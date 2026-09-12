import { readFileSync } from "node:fs"
import { join } from "node:path"
import { harnessSettingsAt } from "akasha/agents/settings/harness-settings-reading/harness-settings-reading.module.code.ts"
import { ownRepoRoot } from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import { asRecord } from "akasha/utils/narrow/modules/as-record/as-record.module.code.ts"

const CLAUDE_CONFIG = "claude-config"

const UNKNOWN = "the Claude configuration a seat boots on is unknown"

function claudeConfigPath(): string {
  const root = ownRepoRoot()
  return join(root, harnessSettingsAt(root, CLAUDE_CONFIG, UNKNOWN))
}

export const CLAUDE_CONFIG_PATH = claudeConfigPath()

const HOME_TOKEN = "$HOME"

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
    if (declaredProjects === undefined) continue
    const projects: Record<string, unknown> = { ...(asRecord(existing.projects) ?? {}) }
    for (const [rawPath, entry] of Object.entries(declaredProjects)) {
      const declaredEntry = asRecord(entry)
      if (declaredEntry === undefined) continue
      const path = expandHome(rawPath, homeDir)
      projects[path] = { ...(asRecord(projects[path]) ?? {}), ...declaredEntry }
    }
    out.projects = projects
  }
  return out
}

function parseClaudeConfig(held: unknown): Record<string, unknown> | null {
  return asRecord(held) ?? null
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
    const held: unknown = JSON.parse(raw)
    return parseClaudeConfig(held)
  } catch {
    return null
  }
}
