import { existsSync, readFileSync, renameSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  HOME_DIR,
  LOG,
} from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import type { SupervisorHandoff } from "akasha/agent/seat/supervisor-restart/modules/supervisor-handoff-env/supervisor-handoff-env.module.code.ts"
import { harnessSettingsAt } from "akasha/agent/settings/modules/harness-settings-reading/harness-settings-reading.module.code.ts"
import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { z } from "zod"

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

const CLAUDE_CONFIG_HELD = z.record(z.string(), z.unknown())

export function reconcileAgentBootFiles(
  configDir: string,
  inheritedClaude: SupervisorHandoff["claude"]
): undefined {
  if (inheritedClaude) {
    console.log(
      `${LOG} adopt: skipping .claude.json reconcile (inherited from previous supervisor)`
    )
    return
  }
  const declared = readClaudeConfigDeclaration()
  if (declared === null) {
    console.error(
      `${LOG} adopt: nothing readable at ${CLAUDE_CONFIG_PATH}, so this seat boots on whatever ` +
        `${configDir}/.claude.json already says. Where that leaves the spawn directory untrusted, ` +
        `Claude drops the hooks and permissions the settings declare and says nothing.`
    )
    return
  }
  const path = `${configDir}/.claude.json`
  let existing: Record<string, unknown> = {}
  if (existsSync(path)) {
    let parsed: Record<string, unknown> | undefined
    try {
      parsed = CLAUDE_CONFIG_HELD.safeParse(JSON.parse(readFileSync(path, "utf8"))).data
    } catch (err) {
      console.error(`${LOG} adopt: ${path} did not parse, so nothing was reconciled into it:`, err)
      return
    }
    if (parsed === undefined) {
      console.error(`${LOG} adopt: ${path} holds no JSON object, so nothing was reconciled into it`)
      return
    }
    existing = parsed
  }
  const tmp = `${path}.tmp-${process.pid}`
  writeFileSync(tmp, JSON.stringify(reconcileClaudeConfig(existing, declared, HOME_DIR)))
  renameSync(tmp, path)
}
