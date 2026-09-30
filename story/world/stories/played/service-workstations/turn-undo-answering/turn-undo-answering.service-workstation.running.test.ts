import { expect, mock, test } from "bun:test"

const STARTED: (readonly unknown[])[] = []
let THROWS = false

const SETTLE_MS = 20

const answering = await import(
  "akasha/story/world/stories/played/modules/turn-undo-answering/turn-undo-answering.module.code.ts"
)

mock.module(
  "akasha/story/world/stories/played/modules/turn-undo-answering/turn-undo-answering.module.code.ts",
  () => ({
    ...answering,
    watchTurnUndos: (...given: readonly unknown[]) => {
      STARTED.push(given)
      if (THROWS) throw new Error("no watch")
      return () => undefined
    },
  })
)

const running = await import(
  "akasha/story/world/stories/played/service-workstations/turn-undo-answering/turn-undo-answering.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run starts the undo answering module's watch and does not end", async () => {
  STARTED.length = 0
  THROWS = false
  const ran = running.runService().then(
    () => "ended",
    () => "ended"
  )
  const first = await Promise.race([ran, Bun.sleep(SETTLE_MS).then(() => "running")])
  expect(STARTED).toEqual([[]])
  expect(first).toBe("running")
})

test("a watch that cannot start ends the run, so systemd is left with a service that failed", async () => {
  THROWS = true
  await expect(running.runService()).rejects.toThrow()
})
