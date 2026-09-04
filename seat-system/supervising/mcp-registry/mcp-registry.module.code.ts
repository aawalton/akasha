import { readFileSync } from "node:fs"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { z } from "zod"
import type { McpServerConfig } from "../../claude-launch-args/claude-launch-args.module.code.ts"
import { expandHome } from "../supervisor-claude-config/supervisor-claude-config.module.code.ts"
import { HOME_DIR } from "../supervisor-config/supervisor-config.module.code.ts"

export type { McpServerConfig }

const DECLARED =
  "seat-system/agent-settings/pages/mcp-servers/mcp-servers.agent-settings.harness-settings.json"

const INSTRUCTIONS_TOKEN = "$INSTRUCTIONS"

const STORAGE_STATE_TOKEN = "$STORAGE_STATE"

const PLAYWRIGHT = "playwright"

const DeclaredServer = z.object({
  type: z.literal("stdio"),
  command: z.string(),
  args: z.array(z.string()),
  forwardEnv: z.array(z.string()).optional(),
  secretEnv: z.array(z.string()).optional(),
  storageState: z.string().optional(),
})

const Declaration = z.record(z.string(), DeclaredServer)

type Declared = z.infer<typeof Declaration>

function declaration(): Declared {
  const at = `${ownRepoRoot()}/${DECLARED}`
  return Declaration.parse(JSON.parse(readFileSync(at, "utf8")))
}

function resolved(value: string, storageState: string | null): string {
  const withRoot = value.startsWith(INSTRUCTIONS_TOKEN)
    ? `${ownRepoRoot()}${value.slice(INSTRUCTIONS_TOKEN.length)}`
    : value
  const withStorage =
    storageState === null ? withRoot : withRoot.split(STORAGE_STATE_TOKEN).join(storageState)
  return expandHome(withStorage, HOME_DIR)
}

function forwardedEnvArgs(keys: readonly string[]): readonly string[] {
  const args: string[] = ["-i"]
  for (const key of keys) {
    const value = process.env[key]
    if (value !== undefined) args.push(`${key}=${value}`)
  }
  return args
}

function secretEnv(keys: readonly string[]): Record<string, string | undefined> {
  const env: Record<string, string | undefined> = {}
  for (const key of keys) env[key] = z.string().optional().parse(process.env[key])
  return env
}

export function storageStatePathOf(server: string): string | null {
  const declared = declaration()[server]
  if (declared === undefined || declared.storageState === undefined) return null
  return resolved(declared.storageState, null)
}

export function playwrightStorageStatePath(): string {
  const path = storageStatePathOf(PLAYWRIGHT)
  if (path === null) {
    throw new Error(`${DECLARED} states no storage state for \`${PLAYWRIGHT}\``)
  }
  return path
}

export function messagesMcpPath(): string {
  const args = getMcpServerRegistry().messages
  const spawned = args?.type === "stdio" ? args.args[1] : undefined
  if (spawned === undefined) {
    throw new Error(`${DECLARED} states no script for \`messages\``)
  }
  return spawned
}

export function getMcpServerRegistry(): Record<string, McpServerConfig> {
  const registry: Record<string, McpServerConfig> = {}
  for (const [name, declared] of Object.entries(declaration())) {
    const storageState =
      declared.storageState === undefined ? null : resolved(declared.storageState, null)
    const args = [
      ...(declared.forwardEnv === undefined ? [] : forwardedEnvArgs(declared.forwardEnv)),
      ...declared.args.map((one) => resolved(one, storageState)),
    ]
    registry[name] = {
      type: "stdio",
      command: declared.command,
      args,
      ...(declared.secretEnv === undefined ? {} : { env: secretEnv(declared.secretEnv) }),
    }
  }
  return registry
}
