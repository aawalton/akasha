import { describe, expect, test } from "bun:test"
import {
  browserReapPoll,
  browserServersUnder,
  jiffiesIn,
  nextWatch,
  servesABrowser,
  untouchedFor,
} from "akasha/agent/seat/supervisor/seat-agent-mcp/modules/browser-reaping/browser-reaping.module.code.ts"

const SERVER = "node /home/one/.npm/_npx/aa/node_modules/.bin/playwright-mcp --headless"
const WRAPPED = "npm exec @playwright/mcp@0.0.76 --headless"
const OTHER = "bun run supervisor.ts"
const STAT = "42 (play wright) S 7 42 7 0 -1 4194304 900 0 0 0 31 11 0 0 20 0 9 0 5"
const WAIT_MS = 600_000

function reaperOver(opts: {
  now: () => number
  jiffies: () => number | null
  servers: () => readonly number[]
  browsers: () => readonly number[]
}): {
  poll: ReturnType<typeof browserReapPoll>
  killed: number[]
  said: string[]
} {
  const killed: number[] = []
  const said: string[] = []
  const poll = browserReapPoll({
    getClaudePid: () => 4242,
    log: (line) => {
      said.push(line)
    },
    now: opts.now,
    findServers: opts.servers,
    findBrowsers: opts.browsers,
    readJiffies: opts.jiffies,
    kill: (pid) => {
      killed.push(pid)
    },
  })
  return { poll, killed, said }
}

describe("servesABrowser", () => {
  test("reads the server process itself", () => {
    expect(servesABrowser(SERVER)).toBe(true)
  })

  test("leaves the wrapper that spawned it alone", () => {
    expect(servesABrowser(WRAPPED)).toBe(false)
  })

  test("leaves a process serving nothing alone", () => {
    expect(servesABrowser(OTHER)).toBe(false)
  })
})

describe("jiffiesIn", () => {
  test("adds the user and system counts", () => {
    expect(jiffiesIn(STAT)).toBe(42)
  })

  test("reads past a name holding a space and a bracket", () => {
    expect(jiffiesIn("42 (odd ) name) S 7 42 7 0 -1 4 9 0 0 0 31 11 0 0 20 0 9")).toBe(42)
  })

  test("reads nothing off a line naming no process", () => {
    expect(jiffiesIn("42 S 7")).toBeNull()
  })

  test("reads nothing off a line that ends early", () => {
    expect(jiffiesIn("42 (one) S 7")).toBeNull()
  })
})

describe("nextWatch", () => {
  test("begins a watch where there is none", () => {
    expect(nextWatch(undefined, 5, 100)).toEqual({ jiffies: 5, since: 100 })
  })

  test("keeps the watch while the count holds", () => {
    const first = nextWatch(undefined, 5, 100)
    expect(nextWatch(first, 5, 900)).toBe(first)
  })

  test("begins the watch again where the count moved", () => {
    const first = nextWatch(undefined, 5, 100)
    expect(nextWatch(first, 6, 900)).toEqual({ jiffies: 6, since: 900 })
  })
})

describe("untouchedFor", () => {
  test("measures from where the watch began", () => {
    expect(untouchedFor(nextWatch(undefined, 5, 100), 400)).toBe(300)
  })
})

describe("browserServersUnder", () => {
  test("finds nothing under a pid proc holds no folder for", () => {
    expect(browserServersUnder(0)).toEqual([])
  })
})

describe("browserReapPoll", () => {
  test("names itself for the heartbeat", () => {
    const held = reaperOver({
      now: () => 0,
      jiffies: () => 1,
      servers: () => [7],
      browsers: () => [],
    })
    expect(held.poll.name).toBe("browser-reaping")
  })

  test("lets a browser go where no call reached the server for the whole wait", async () => {
    let clock = 0
    const held = reaperOver({
      now: () => clock,
      jiffies: () => 1,
      servers: () => [7],
      browsers: () => [11, 12],
    })
    await held.poll.run()
    expect(held.killed).toEqual([])
    clock = WAIT_MS
    await held.poll.run()
    expect(held.killed).toEqual([11, 12])
    expect(held.said).toHaveLength(1)
    expect(held.said[0]).toContain("2 browser processes")
  })

  test("holds the browser where a call reached the server", async () => {
    let clock = 0
    let count = 1
    const held = reaperOver({
      now: () => clock,
      jiffies: () => count,
      servers: () => [7],
      browsers: () => [11],
    })
    await held.poll.run()
    clock = WAIT_MS - 1
    count = 2
    await held.poll.run()
    clock = WAIT_MS
    await held.poll.run()
    expect(held.killed).toEqual([])
  })

  test("leaves a server holding no browser alone", async () => {
    let clock = 0
    const held = reaperOver({
      now: () => clock,
      jiffies: () => 1,
      servers: () => [7],
      browsers: () => [],
    })
    await held.poll.run()
    clock = WAIT_MS * 3
    await held.poll.run()
    expect(held.killed).toEqual([])
    expect(held.said).toEqual([])
  })

  test("lets a browser go once rather than at every beat", async () => {
    let clock = 0
    const held = reaperOver({
      now: () => clock,
      jiffies: () => 1,
      servers: () => [7],
      browsers: () => [11],
    })
    await held.poll.run()
    clock = WAIT_MS
    await held.poll.run()
    clock = WAIT_MS + 30_000
    await held.poll.run()
    expect(held.killed).toEqual([11])
    expect(held.said).toHaveLength(1)
  })

  test("begins the wait again for a server that went and came back", async () => {
    let clock = 0
    let servers: readonly number[] = [7]
    const held = reaperOver({
      now: () => clock,
      jiffies: () => 1,
      servers: () => servers,
      browsers: () => [11],
    })
    await held.poll.run()
    clock = 60_000
    servers = []
    await held.poll.run()
    clock = WAIT_MS
    servers = [7]
    await held.poll.run()
    expect(held.killed).toEqual([])
  })
})
