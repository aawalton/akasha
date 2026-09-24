import { existsSync, readFileSync, realpathSync, renameSync, writeFileSync } from "node:fs"
import {
  computeMcpConfigContent,
  type McpServerConfig,
} from "akasha/agent/claude-code/modules/claude-launch-args/claude-launch-args.module.code.ts"
import { planDisableReconcile } from "akasha/agent/seat/supervisor/seat-agent-mcp/modules/mcp-disable-reconcile/mcp-disable-reconcile.module.code.ts"
import { getMcpServerRegistry } from "akasha/agent/seat/supervisor/seat-agent-mcp/modules/mcp-registry/mcp-registry.module.code.ts"

const LOG = "[supervisor-mcp]"

function safeRealpath(p: string): string {
  try {
    return realpathSync(p)
  } catch {
    return p
  }
}

function reconcileDisabledMcpServers(
  configDir: string,
  launchCwd: string,
  declaredServers: readonly string[]
): undefined {
  try {
    const configPath = `${configDir}/.claude.json`
    if (!existsSync(configPath)) return
    const raw = readFileSync(configPath, "utf8")
    const plan = planDisableReconcile(raw, launchCwd, declaredServers, safeRealpath)
    if (!plan) return

    const tmp = `${configPath}.tmp-${process.pid}`
    writeFileSync(tmp, plan.nextConfigText)
    renameSync(tmp, configPath)
    console.log(
      `${LOG} disabledMcpServers reconcile: cleared [${plan.clearedServers.join(", ")}] ` +
        `from ${configPath} (registry-declared MCPs are authoritative — RCA #14818)`
    )
  } catch (err) {
    console.error(
      `${LOG} disabledMcpServers reconcile failed (non-fatal, spawn proceeds):`,
      err instanceof Error ? err.message : err
    )
  }
}

export function resolveMcpConfig(
  sessionId: string,
  opts?: {
    configDir?: string
    cwd?: string
    extraServers?: Record<string, McpServerConfig>
  }
): string | null {
  const registry = getMcpServerRegistry()
  const content = computeMcpConfigContent(registry, opts?.extraServers)
  if (!content) return null
  if (opts?.configDir != null && opts.cwd != null) {
    reconcileDisabledMcpServers(opts.configDir, opts.cwd, Object.keys(content.mcpServers))
  }
  const configPath = `/var/tmp/mcp-local-${sessionId}.json`
  writeFileSync(configPath, JSON.stringify(content))
  return configPath
}
