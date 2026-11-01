import { expect, mock, test } from "bun:test"

const SEEN: string[] = []
const HANDED: (readonly string[])[] = []
let EXITED = 0

const capping = await import("akasha/git/modules/capping/git-capping.module.code.ts")
const holdingModule = await import("akasha/git/modules/holding/holding.module.code.ts")

mock.module("akasha/git/modules/capping/git-capping.module.code.ts", () => ({
  ...capping,
  ranGit: (_root: string, args: readonly string[], taking: { readonly ceilingMs?: number }) => {
    SEEN.push(`git ${String(taking.ceilingMs)}`)
    HANDED.push(args)
    return { code: EXITED, stdout: new Uint8Array(), stderr: new TextEncoder().encode("why") }
  },
}))

mock.module("akasha/git/modules/holding/holding.module.code.ts", () => ({
  ...holdingModule,
  holding: <T>(_root: string, act: () => T): T => {
    SEEN.push("held")
    const done = act()
    SEEN.push("let go")
    return done
  },
}))

const running = await import(
  "akasha/git/service-workstations/checkout-maintaining/checkout-maintaining.service-workstation.running.code.ts"
)

function reset(code: number): undefined {
  SEEN.length = 0
  HANDED.length = 0
  EXITED = code
}

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("git runs only while the lock a landing takes is held", async () => {
  reset(0)
  await running.runService()
  expect(SEEN[0]).toBe("held")
  expect(SEEN[1]?.startsWith("git")).toBe(true)
  expect(SEEN[2]).toBe("let go")
})

test("a run packs loose objects alone, in a bounded batch", async () => {
  reset(0)
  await running.runService()
  const said = HANDED[0]?.join(" ") ?? ""
  expect(said).toContain("maintenance run --task=loose-objects")
  expect(said).toMatch(/maintenance\.loose-objects\.batchSize=[1-9][0-9]*/)
  expect(said).not.toContain("gc")
})

test("git is ended well inside the time a waiting landing waits", async () => {
  reset(0)
  await running.runService()
  const bound = Number(SEEN[1]?.split(" ")[1])
  expect(bound).toBeGreaterThan(0)
  expect(bound).toBeLessThan(holdingModule.WAITED_AT_MOST)
})

test("a run whose git failed fails the service and says why", () => {
  reset(1)
  expect(() => running.runService()).toThrow("why")
})
