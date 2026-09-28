import { expect, test } from "bun:test"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { whenInitialized } from "akasha/agent/message/modules/agent-tools/agent-message-agent-tools.module.code.ts"
import { z } from "zod"

const CHANNEL = "notifications/claude/channel"

const NOTICE = "The turn is at game-master."

const SETTLE_MS = 20

const Channelled = z.object({
  method: z.literal(CHANNEL),
  params: z.object({ content: z.string() }),
})

function seatServer(): McpServer {
  return new McpServer(
    { name: "messages", version: "0.1.0" },
    { capabilities: { experimental: { "claude/channel": {} } } }
  )
}

function offer(server: McpServer): Promise<void> {
  return server.server.notification({ method: CHANNEL, params: { content: NOTICE } })
}

function piped(): readonly [InMemoryTransport, InMemoryTransport] {
  const [session, seat] = InMemoryTransport.createLinkedPair()
  const sent = seat.send.bind(seat)
  seat.send = (message, options) =>
    new Promise<void>((done, failed) => {
      setTimeout(() => {
        sent(message, options).then(done, failed)
      }, 0)
    })
  return [session, seat]
}

async function heardBySession(session: InMemoryTransport): Promise<readonly string[]> {
  const client = new Client({ name: "session", version: "0.1.0" })
  await client.connect(session)
  const heard: string[] = []
  client.setNotificationHandler(Channelled, (said) => {
    heard.push(said.params.content)
  })
  await Bun.sleep(SETTLE_MS)
  await client.close()
  return heard
}

test("a message offered as the seat's server connects is dropped by a session not yet initialized", async () => {
  const server = seatServer()
  const [session, seat] = piped()
  await server.connect(seat)
  await offer(server)
  expect(await heardBySession(session)).toEqual([])
})

test("a message waiting as a seat boots is offered once the session is initialized, and reaches it", async () => {
  const server = seatServer()
  const offered: string[] = []
  whenInitialized(server, async () => {
    offered.push(NOTICE)
    await offer(server)
  })
  const [session, seat] = piped()
  await server.connect(seat)
  expect(offered).toEqual([])
  expect(await heardBySession(session)).toEqual([NOTICE])
  expect(offered).toEqual([NOTICE])
})
