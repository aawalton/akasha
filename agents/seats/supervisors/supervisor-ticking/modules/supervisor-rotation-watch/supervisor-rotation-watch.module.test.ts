import { expect, test } from "bun:test"
import { watchSeatRotation } from "akasha/agents/seats/supervisors/supervisor-ticking/modules/supervisor-rotation-watch/supervisor-rotation-watch.module.code.ts"

const MID_REFRESH =
  "it is not there, so which pages are `seat` could not be answered — an index that is missing is not an index naming none"

function waited(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function nothing(): Promise<void> {
  return Promise.resolve()
}

test("an index part way through a refresh is said once while the rotation is asked again", async () => {
  const said: string[] = []
  let asked = 0
  const stop = watchSeatRotation(
    () => {
      asked += 1
      throw new Error(MID_REFRESH)
    },
    nothing,
    {
      pollMs: 1,
      say: (text) => {
        said.push(text)
      },
    }
  )

  await waited(40)
  stop()
  expect(asked).toBeGreaterThan(3)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("part way through a refresh")
})

test("a wait that runs past its ceiling says the rotation goes unread", async () => {
  const said: string[] = []
  let clock = 0
  const stop = watchSeatRotation(
    () => {
      throw new Error(MID_REFRESH)
    },
    nothing,
    {
      pollMs: 1,
      waitingAtMostMs: 50,
      now: () => clock,
      say: (text) => {
        said.push(text)
      },
    }
  )

  await waited(20)
  clock = 50
  await waited(20)
  stop()
  expect(said.some((one) => one.includes("goes unread"))).toBe(true)
})

test("a throw that is no refresh is said every time it is thrown", async () => {
  const said: string[] = []
  const stop = watchSeatRotation(
    () => {
      throw new Error("the wire is broken")
    },
    nothing,
    {
      pollMs: 1,
      say: (text, err) => {
        said.push(`${text} ${String(err)}`)
      },
    }
  )

  await waited(30)
  stop()
  expect(said.length).toBeGreaterThan(3)
  expect(said[0]).toContain("the wire is broken")
})

test("a rotation that arrives is handed on", async () => {
  const got: string[] = []
  let rotated: string | null = "a-session"
  const stop = watchSeatRotation(
    () => {
      const said = rotated
      rotated = null
      return said
    },
    (sessionId) => {
      got.push(sessionId)
      return Promise.resolve()
    },
    { pollMs: 1 }
  )

  await waited(20)
  stop()
  expect(got).toEqual(["a-session"])
})

test("a stopped watch asks nothing more", async () => {
  let asked = 0
  const stop = watchSeatRotation(
    () => {
      asked += 1
      return null
    },
    nothing,
    { pollMs: 1 }
  )

  await waited(20)
  stop()
  const asking = asked
  await waited(20)
  expect(asked).toBe(asking)
})
