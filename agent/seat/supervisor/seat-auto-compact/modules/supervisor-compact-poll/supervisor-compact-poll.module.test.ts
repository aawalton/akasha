import { expect, test } from "bun:test"
import { autoCompactPoll } from "akasha/agent/seat/supervisor/seat-auto-compact/modules/supervisor-compact-poll/supervisor-compact-poll.module.code.ts"

function pollOver(opts: {
  tokens: number | null
  ceiling?: number | null
  compacting?: boolean
  idle?: boolean
  sent?: boolean
  asks: string[]
}): ReturnType<typeof autoCompactPoll> {
  return autoCompactPoll({
    getAgentId: () => "agent-1",
    log: () => undefined,
    readTokens: () => opts.tokens,
    readCeiling: () => (opts.ceiling === undefined ? 350_000 : opts.ceiling),
    readCompacting: () => opts.compacting ?? false,
    readIdle: () => opts.idle ?? true,
    readSeatName: () => "thea",
    sendLine: (seatName, line) => {
      opts.asks.push(`${seatName}:${line}`)
      return Promise.resolve(opts.sent ?? true)
    },
  })
}

test("an idle seat past the ceiling is asked to compact on the beat", async () => {
  const asks: string[] = []
  await pollOver({ tokens: 400_000, asks }).run()
  expect(asks).toEqual(["thea:/compact"])
})

test("a seat under the ceiling is asked nothing", async () => {
  const asks: string[] = []
  await pollOver({ tokens: 100_000, asks }).run()
  expect(asks).toEqual([])
})

test("a seat whose conditions could not be read is asked nothing", async () => {
  const asks: string[] = []
  await pollOver({ tokens: 400_000, ceiling: null, asks }).run()
  expect(asks).toEqual([])
})

test("a ceiling the conditions raised leaves a seat that was over the old one alone", async () => {
  const asks: string[] = []
  await pollOver({ tokens: 400_000, ceiling: 900_000, asks }).run()
  expect(asks).toEqual([])
})

test("a busy seat past the ceiling is asked nothing", async () => {
  const asks: string[] = []
  await pollOver({ tokens: 400_000, idle: false, asks }).run()
  expect(asks).toEqual([])
})

test("a seat already compacting is asked nothing", async () => {
  const asks: string[] = []
  await pollOver({ tokens: 400_000, compacting: true, asks }).run()
  expect(asks).toEqual([])
})

test("a seat still past the ceiling is not asked a second time", async () => {
  const asks: string[] = []
  const poll = pollOver({ tokens: 400_000, asks })
  await poll.run()
  await poll.run()
  await poll.run()
  expect(asks).toEqual(["thea:/compact"])
})

test("an ask the pane refused is made again on the next beat", async () => {
  const asks: string[] = []
  const poll = pollOver({ tokens: 400_000, sent: false, asks })
  await poll.run()
  await poll.run()
  expect(asks).toEqual(["thea:/compact", "thea:/compact"])
})

test("a supervisor with no agent asks nothing", async () => {
  const asks: string[] = []
  const poll = autoCompactPoll({
    getAgentId: () => null,
    log: () => undefined,
    readTokens: () => 400_000,
    readCeiling: () => 350_000,
    readCompacting: () => false,
    readIdle: () => true,
    readSeatName: () => "thea",
    sendLine: (seatName, line) => {
      asks.push(`${seatName}:${line}`)
      return Promise.resolve(true)
    },
  })
  await poll.run()
  expect(asks).toEqual([])
})
