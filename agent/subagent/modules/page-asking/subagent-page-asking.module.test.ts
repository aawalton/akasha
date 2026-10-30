import { expect, test } from "bun:test"
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  type Asking,
  askedBack,
  askingAt,
  logPathOf,
  seatNamedIn,
  WRITING,
} from "akasha/agent/subagent/modules/page-asking/subagent-page-asking.module.code.ts"
import { agentIdOf } from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import {
  ANOTHER,
  heldInHistory,
  inScratch,
  OWN,
  PERSONA_AT,
  pageWritten,
  SEAT_AT,
  SEAT_ID,
  underSeat,
} from "akasha/agent/subagent/modules/presence/subagent-presence.module.test-fixtures.ts"
import { pageFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"

function noting(asked: (readonly string[])[]): Asking {
  return (_root, _seatId, args) => {
    asked.push(args)
    return undefined
  }
}

async function seatedById(act: (root: string) => Promise<void>): Promise<undefined> {
  await underSeat(async (root) => {
    pageFiled(root, SEAT_ID, SEAT_AT)
    await act(root)
  })
}

test("a subagent whose page went is asked back under the kind history states", async () => {
  await seatedById(async (root) => {
    heldInHistory(root, OWN, agentIdOf(SEAT_ID, OWN), "Explore")
    const asked: (readonly string[])[] = []
    expect(askedBack(root, agentIdOf(SEAT_ID, OWN), noting(asked))).toBe(true)
    expect(asked.length).toBe(1)
    expect(asked[0]?.slice(0, 5)).toEqual([WRITING, "akasha", OWN, "", SEAT_ID])
    expect(Number(asked[0]?.[5])).toBeGreaterThan(0)
  })
})

test("a subagent whose page is there asks for nothing", async () => {
  await seatedById(async (root) => {
    await pageWritten(root)
    const asked: (readonly string[])[] = []
    expect(askedBack(root, agentIdOf(SEAT_ID, OWN), noting(asked))).toBe(false)
    expect(asked).toEqual([])
  })
})

test("a subagent history has no page for asks for nothing", async () => {
  await seatedById(async (root) => {
    const asked: (readonly string[])[] = []
    expect(askedBack(root, agentIdOf(SEAT_ID, OWN), noting(asked))).toBe(false)
    heldInHistory(root, OWN, agentIdOf(ANOTHER, OWN), "Explore")
    expect(askedBack(root, agentIdOf(SEAT_ID, OWN), noting(asked))).toBe(false)
    expect(asked).toEqual([])
  })
})

test("a seat, and a subagent of a seat the index has no page for, ask for nothing", async () => {
  await seatedById(async (root) => {
    heldInHistory(root, OWN, agentIdOf(SEAT_ID, OWN), "Explore")
    const asked: (readonly string[])[] = []
    expect(askedBack(root, SEAT_ID, noting(asked))).toBe(false)
    expect(askedBack(root, agentIdOf(ANOTHER, OWN), noting(asked))).toBe(false)
    expect(asked).toEqual([])
  })
})

test("an ask answers whether the program it started has ended", async () => {
  await underSeat(async (root) => {
    const running = askingAt(`${root}/nothing-here.code.ts`, root, SEAT_ID, [], root)
    const until = Date.now() + 5_000
    while (!running.ended() && Date.now() < until) await Bun.sleep(20)
    expect(running.ended()).toBe(true)
  })
})

function treeUnder(pid: number): readonly number[] {
  const under = new Map<number, number[]>()
  for (const name of readdirSync("/proc")) {
    if (!/^\d+$/.test(name)) continue
    let stat: string
    try {
      stat = readFileSync(`/proc/${name}/stat`, "utf8")
    } catch {
      continue
    }
    const parent = Number(stat.slice(stat.lastIndexOf(")") + 2).split(" ")[1])
    under.set(parent, [...(under.get(parent) ?? []), Number(name)])
  }
  const found: number[] = []
  const left = [pid]
  for (let one = left.shift(); one !== undefined; one = left.shift()) {
    found.push(one)
    left.push(...(under.get(one) ?? []))
  }
  return found
}

const ASKING_AT = join(import.meta.dir, "subagent-page-asking.module.code.ts")

test("a program asked for outlives the asker and every process under it being killed", async () => {
  await underSeat(async (root) => {
    const landed = join(root, "landed")
    const program = join(root, "landing.code.ts")
    writeFileSync(program, `await Bun.sleep(500)\nawait Bun.write(${JSON.stringify(landed)}, "")\n`)
    const asker = join(root, "asker.code.ts")
    writeFileSync(
      asker,
      `import { askingAt } from ${JSON.stringify(ASKING_AT)}\n` +
        `askingAt(${JSON.stringify(program)}, ${JSON.stringify(root)}, ${JSON.stringify(SEAT_ID)}, [], ${JSON.stringify(root)})\n` +
        `process.stdout.write("asked\\n")\nawait Bun.sleep(30_000)\n`
    )
    const child = Bun.spawn([process.execPath, asker], { stdout: "pipe", stderr: "ignore" })
    await child.stdout.getReader().read()
    for (const pid of treeUnder(child.pid)) {
      try {
        process.kill(pid, "SIGKILL")
      } catch {}
    }
    await child.exited
    const until = Date.now() + 10_000
    while (!existsSync(landed) && Date.now() < until) await Bun.sleep(50)
    expect(existsSync(landed)).toBe(true)
  })
}, 20_000)

test("an ask that cannot start the program says why in the seat's log", async () => {
  await underSeat(async (root) => {
    const at = join(root, "nothing-here.code.ts")
    const running = askingAt(
      at,
      join(root, "no-such-folder"),
      SEAT_ID,
      [WRITING, "akasha", OWN],
      root
    )
    expect(running.ended()).toBe(true)
    expect(readFileSync(logPathOf(SEAT_ID, root), "utf8")).toContain(
      `subagent-presence: ${WRITING} akasha ${OWN} — the program landing the page did not start`
    )
  })
})

test("a log sits in the seat's own folder named for the module landing a subagent's page", () => {
  expect(logPathOf(SEAT_ID, "/var/tmp/base")).toBe(`/var/tmp/base/${SEAT_ID}/subagent-presence.log`)
})

test("a seat is named by the page the index carries for its id", () => {
  inScratch((root) => {
    pageFiled(root, SEAT_ID, "akasha/agent/seat/pages/akasha.seat.ts")
    expect(seatNamedIn(root, SEAT_ID)).toBe("akasha")
  })
})

test("a seat the index carries no page for is named by nothing", () => {
  inScratch((root) => {
    pageFiled(root, ANOTHER, "akasha/agent/seat/pages/thea.seat.ts")
    expect(seatNamedIn(root, SEAT_ID)).toBe(null)
  })
})

test("a page that is no seat names no seat", () => {
  inScratch((root) => {
    pageFiled(root, SEAT_ID, PERSONA_AT)
    expect(seatNamedIn(root, SEAT_ID)).toBe(null)
  })
})
