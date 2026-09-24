import { readFileSync } from "node:fs"
import type { McpServerConfig } from "akasha/agent/claude-code/modules/claude-launch-args/claude-launch-args.module.code.ts"
import { HOME_DIR } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import { expandHome } from "akasha/agent/seat/supervisor/seat-claude-code-setup/modules/supervisor-claude-config/supervisor-claude-config.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { z } from "zod"

const SETTINGS = "agent-settings"

const SETTINGS_SLUG = "mcp-servers"

const HARNESS_SETTINGS = "harness-settings"

const HELD = "json"

const INSTRUCTIONS_TOKEN = "$INSTRUCTIONS"

const DeclaredServer = z.object({
  type: z.literal("stdio"),
  command: z.string(),
  args: z.array(z.string()),
  forwardEnv: z.array(z.string()).optional(),
  secretEnv: z.array(z.string()).optional(),
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

function resolved(value: string): string {
  const withRoot = value.startsWith(INSTRUCTIONS_TOKEN)
    ? `${ownRepoRoot()}${value.slice(INSTRUCTIONS_TOKEN.length)}`
    : value
  return expandHome(withRoot, HOME_DIR)
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

export function getMcpServerRegistry(): Record<string, McpServerConfig> {
  const registry: Record<string, McpServerConfig> = {}
  for (const [name, declared] of Object.entries(declaration())) {
    const args = [
      ...(declared.forwardEnv === undefined ? [] : forwardedEnvArgs(declared.forwardEnv)),
      ...declared.args.map((one) => resolved(one)),
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
