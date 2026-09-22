import "akasha/agent/message/modules/messages-console-stdout-guard/messages-console-stdout-guard.module.code.ts"

import { readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { getAgentId } from "akasha/agent/message/modules/messages-agent-id/messages-agent-id.module.code.ts"
import { startChannelListener } from "akasha/agent/message/modules/messages-agent-tools/messages-agent-tools.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

function loadSecrets(): undefined {
  try {
    const content = readFileSync(join(homedir(), ".secrets.env"), "utf-8")
    for (const line of content.split("\n")) {
      const trimmed = line.trim()
      if (trimmed === "" || trimmed.startsWith("#")) continue
      const eq = trimmed.indexOf("=")
      if (eq === -1) continue
      const rawKey = trimmed.slice(0, eq).trim()
      const key = rawKey.startsWith("export ") ? rawKey.slice(7).trim() : rawKey
      const val = trimmed.slice(eq + 1).replace(/^["']|["']$/g, "")
      if (!(key in process.env)) process.env[key] = val
    }
  } catch {}
}

loadSecrets()

const server = new McpServer(
  {
    name: "messages",
    version: "0.1.0",
  },
  {
    capabilities: {
      experimental: {
        "claude/channel": {},
        "claude/channel/permission": {},
      },
    },
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)

let cleanupListener: (() => void) | undefined
getAgentId()
  .then(async (agentId) => {
    cleanupListener = await startChannelListener(server, agentId)
  })
  .catch((err) => {
    console.error("[messages] Channel listener startup failed:", err)
  })

const ENDING_CODE = { SIGTERM: 143, SIGINT: 130 } as const

const STUCK_MS = 2_000

let ending = false

const endOn = async (signal: keyof typeof ENDING_CODE): Promise<undefined> => {
  if (ending) return
  ending = true
  setTimeout(() => process.exit(ENDING_CODE[signal]), STUCK_MS)
  try {
    cleanupListener?.()
  } catch (err) {
    console.error(`[messages] clearing the channel listener threw on ${signal}:`, err)
  }
  try {
    await server.close()
  } catch (err) {
    console.error(`[messages] closing the transport threw on ${signal}:`, err)
  }
  process.exit(ENDING_CODE[signal])
}

for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => void endOn(signal))
}
