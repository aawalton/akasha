import { readFileSync } from "node:fs"
import type { McpServerConfig } from "akasha/agents/claude-code/launch-args/claude-launch-args.module.code.ts"
import { ownRepoRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { expandHome } from "akasha/seat-system/supervising/supervisor-claude-config/supervisor-claude-config.module.code.ts"
import { HOME_DIR } from "akasha/seat-system/supervising/supervisor-config/supervisor-config.module.code.ts"
import { z } from "zod"

const SETTINGS = "agent-settings"

const SETTINGS_SLUG = "mcp-servers"

const HARNESS_SETTINGS = "harness-settings"

const HELD = "json"

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

function declaredAt(): string {
  const page = listedAt(ownRepoRoot(), SETTINGS, SETTINGS_SLUG)[0]
  const at = page === undefined ? null : besideAt(page.path, HARNESS_SETTINGS, HELD)
  if (at === null) {
    throw new Error(
      `no \`${SETTINGS}\` is slugged \`${SETTINGS_SLUG}\`, so the servers a seat gets are unknown`
    )
  }
  return at
}

function declaration(): Declared {
  const at = `${ownRepoRoot()}/${declaredAt()}`
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
    const value = z.string().optional().parse(process.env[key])
    if (value !== undefined) args.push(`${key}=${value}`)
  }
  return args
}

function secretEnv(keys: readonly string[]): Record<string, string | undefined> {
  const env: Record<string, string | undefined> = {}
  for (const key of keys) env[key] = z.string().optional().parse(process.env[key])
  return env
}

function storageStatePathOf(server: string): string | null {
  const declared = declaration()[server]
  if (declared === undefined || declared.storageState === undefined) return null
  return resolved(declared.storageState, null)
}

export function playwrightStorageStatePath(): string {
  const path = storageStatePathOf(PLAYWRIGHT)
  if (path === null) {
    throw new Error(`${declaredAt()} states no storage state for \`${PLAYWRIGHT}\``)
  }
  return path
}

export function messagesMcpPath(): string {
  const args = getMcpServerRegistry().messages
  const spawned = args?.type === "stdio" ? args.args[1] : undefined
  if (spawned === undefined) {
    throw new Error(`${declaredAt()} states no script for \`messages\``)
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
