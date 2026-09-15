import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { supervisorRel } from "akasha/agent/seat/launching/modules/seat-entry-paths/seat-entry-paths.module.code.ts"
import {
  CEILING_MS,
  DEBOUNCE_MS,
  decideVersionDelivery,
  hashFileSet,
  NOTHING_DELIVERED,
  pollSupervisorFileVersion,
  reachedFrom,
  reachesNothing,
  reachesNothingLine,
  type VersionWatch,
} from "akasha/agent/seat/self-healing/modules/supervisor-file-version/supervisor-file-version.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const REACHED_WHEN_MEASURED = 681

test("the supervisor entry reaches its own tree through the graph", () => {
  const root = akashaRoot()
  const entry = supervisorRel(root)
  const reached = reachedFrom(join(root, entry), root)
  expect(reached).toContain(entry)
  expect(reached.length).toBeGreaterThan(REACHED_WHEN_MEASURED / 2)
  expect(reachesNothing(reached)).toBe(false)
})

test("an entry reaching no file but itself is noticed", () => {
  expect(reachesNothing(["entry.ts"])).toBe(true)
  expect(reachesNothing(["entry.ts", "one.ts"])).toBe(false)
})

test("an entry reaching none of its imports is said every poll", async () => {
  const entry = join(scratch.rootFor("supervisor-file-version-"), "entry.ts")
  writeFileSync(entry, 'import { gone } from "akasha/nowhere/nowhere.module.code.ts"\n')
  const said: string[] = []
  const delivered: string[] = []
  const say = (spoken: string): undefined => {
    said.push(spoken)
  }
  const deliver = (version: { liveVersion: string; deployedAt: number }): undefined => {
    delivered.push(version.liveVersion)
  }
  await pollSupervisorFileVersion(entry, deliver, 0, say)
  await pollSupervisorFileVersion(entry, deliver, DEBOUNCE_MS, say)
  const line = reachesNothingLine(entry)
  expect(delivered).toEqual([])
  expect(said).toEqual([line, line])
  expect(line).toContain(entry)
})

test("a file that cannot be read still changes the hash", async () => {
  const absent = await hashFileSet(["/nowhere/one"])
  const other = await hashFileSet(["/nowhere/two"])
  expect(absent).not.toBe(other)
})

test("the first version seen is delivered at once", () => {
  const held = decideVersionDelivery(NOTHING_DELIVERED, "v1", 0)
  expect(held.deliver).toBe(true)
  expect(held.next.delivered).toBe("v1")
})

test("the version already delivered is not delivered again", () => {
  const held = decideVersionDelivery(
    { delivered: "v1", steady: null, changedSinceMs: null },
    "v1",
    10
  )
  expect(held.deliver).toBe(false)
})

test("a fresh version waits for its debounce before it is delivered", () => {
  const first = decideVersionDelivery(
    { delivered: "v1", steady: null, changedSinceMs: null },
    "v2",
    0
  )
  expect(first.deliver).toBe(false)
  const held = decideVersionDelivery(first.next, "v2", DEBOUNCE_MS)
  expect(held.deliver).toBe(true)
  expect(held.next.delivered).toBe("v2")
})

test("a version that keeps changing is delivered once it is overdue", () => {
  let watch: VersionWatch = { delivered: "v1", steady: null, changedSinceMs: null }
  let at = 0
  let held = decideVersionDelivery(watch, "v2", at)
  expect(held.deliver).toBe(false)
  watch = held.next
  for (let n = 3; at < CEILING_MS; n++) {
    at += DEBOUNCE_MS - 1
    held = decideVersionDelivery(watch, `v${n}`, at)
    watch = held.next
    if (held.deliver) break
  }
  expect(held.deliver).toBe(true)
})
