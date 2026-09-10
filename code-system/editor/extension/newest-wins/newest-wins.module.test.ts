import { expect, test } from "bun:test"
import { newestWins } from "./newest-wins.module.code.ts"

const tick = (): Promise<undefined> =>
  new Promise((go) => {
    setTimeout(() => go(undefined), 0)
  })

function stalled(): {
  readonly release: () => undefined
  readonly run: (ask: string) => Promise<undefined>
  readonly ran: readonly string[]
} {
  const ran: string[] = []
  let waiting: (() => undefined)[] = []
  return {
    ran,
    release: () => {
      const held = waiting
      waiting = []
      for (const one of held) one()
      return undefined
    },
    run: (ask: string) => {
      ran.push(ask)
      return new Promise<undefined>((go) => {
        waiting.push(() => {
          go(undefined)
          return undefined
        })
      })
    },
  }
}

test("one run is in flight at a time", async () => {
  const one = stalled()
  const ask = newestWins(one.run)
  void ask("first")
  void ask("second")
  expect(one.ran).toEqual(["first"])
  one.release()
  await tick()
  one.release()
  await tick()
})

test("an ask arriving mid-run is run once that run ends", async () => {
  const one = stalled()
  const ask = newestWins(one.run)
  void ask("first")
  void ask("second")
  one.release()
  await tick()
  expect(one.ran).toEqual(["first", "second"])
  one.release()
  await tick()
})

test("an ask arriving mid-run replaces the ask already waiting", async () => {
  const one = stalled()
  const ask = newestWins(one.run)
  void ask("first")
  void ask("second")
  void ask("third")
  one.release()
  await tick()
  expect(one.ran).toEqual(["first", "third"])
  one.release()
  await tick()
})

test("an ask arriving with nothing in flight runs at once", async () => {
  const ran: string[] = []
  const ask = newestWins(async (one: string) => {
    ran.push(one)
    return undefined
  })
  await ask("first")
  await ask("second")
  expect(ran).toEqual(["first", "second"])
})

test("a run that throws leaves the ask behind that run to run all the same", async () => {
  const ran: string[] = []
  let release: (() => undefined) | undefined
  const ask = newestWins(async (one: string) => {
    ran.push(one)
    if (one === "first") {
      await new Promise<undefined>((go) => {
        release = () => {
          go(undefined)
          return undefined
        }
      })
      throw new Error("the run failed")
    }
    return undefined
  })
  const first = ask("first")
  const second = ask("second")
  release?.()
  await expect(first).rejects.toThrow("the run failed")
  await second
  expect(ran).toEqual(["first", "second"])
})

test("a caller left waiting is answered with no throw from a run that is not its own", async () => {
  let release: (() => undefined) | undefined
  const ask = newestWins(async (one: string) => {
    if (one === "first") {
      await new Promise<undefined>((go) => {
        release = () => {
          go(undefined)
          return undefined
        }
      })
      throw new Error("the run failed")
    }
    return undefined
  })
  const first = ask("first")
  const second = ask("second")
  release?.()
  await expect(first).rejects.toThrow("the run failed")
  await expect(second).resolves.toBeUndefined()
})
