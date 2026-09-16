import { expect, test } from "bun:test"
import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"
import {
  applyArgv,
  carriedAt,
  endedBy,
  fateOf,
  jobRan,
  logsArgv,
  waitArgv,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"
import {
  COMMIT,
  capturing,
  carried,
  pushed,
  ranOf,
  refusedPush,
  uncarried,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.test-fixtures.ts"

const NAME = "held-job-0123456789ab"

const YAML = "kind: Job\n"

test("a job is put up by reading the manifest off standard input", () => {
  expect(applyArgv()).toEqual(["apply", "-f", "-"])
})

test("the wait names the job, its namespace and how long it is waited on", () => {
  const said = waitArgv(NAME, "condition=Complete", "30m")
  expect(said).toContain(`job/${NAME}`)
  expect(said).toContain("--timeout=30m")
  expect(said).toContain("workers")
})

test("a job that failed is seen on the round it failed rather than after the whole wait", () => {
  const held = capturing((argv) => ranOf(argv.includes("--for=condition=Failed") ? 0 : 1))
  expect(fateOf(held.running, NAME, 180)).toBe("failed")
  expect(held.seen.length).toBe(2)
})

test("a job still running past every round is answered as running", () => {
  const held = capturing(() => ranOf(1))
  expect(fateOf(held.running, NAME, 3)).toBe("running")
  expect(held.seen.length).toBe(6)
})

test("every line the job said is read rather than the last few", () => {
  expect(logsArgv(NAME)).toContain("--tail=-1")
})

test("a job that ended has its lines carried back", () => {
  expect(endedBy("complete", ranOf(0, "one\ntwo\n"), NAME)).toEqual({ said: ["one", "two"] })
})

test("a job that failed refuses the run, and the lines still come back", () => {
  const held = endedBy("failed", ranOf(0, "why\n"), NAME) as { why: string }
  expect(held.why).toContain(NAME)
  expect(held.why).toContain("why")
})

test("a job left running past the wait refuses the run", () => {
  const held = endedBy("running", ranOf(0), NAME) as { why: string }
  expect(held.why).toContain("had not ended")
})

test("a commit origin carries is carried with no push", () => {
  let pushes = 0
  expect(
    carriedAt(ROOT, COMMIT, carried, (root) => {
      pushes += 1
      return pushed(root)
    })
  ).toBe(null)
  expect(pushes).toBe(0)
})

test("a commit origin does not carry is pushed there, and then carried", () => {
  let asked = 0
  expect(
    carriedAt(
      ROOT,
      COMMIT,
      () => {
        asked += 1
        return { carried: asked > 1 }
      },
      pushed
    )
  ).toBe(null)
  expect(asked).toBe(2)
})

test("a commit origin still does not carry after the push refuses the run", () => {
  const why = carriedAt(ROOT, COMMIT, uncarried, pushed)
  expect(why).toContain(COMMIT)
  expect(why).toContain("no job in the cluster can read it")
})

test("a push that failed refuses the run and says what the push said", () => {
  const why = carriedAt(ROOT, COMMIT, uncarried, refusedPush)
  expect(why).toContain(COMMIT)
  expect(why).toContain("refused")
})

test("a commit origin carries is applied and then waited on", async () => {
  const held = capturing()
  const said = await jobRan(ROOT, COMMIT, NAME, YAML, 1, held.running, carried, pushed)
  expect(said).toEqual({ said: [] })
  expect(held.seen[0]).toEqual(["apply", "-f", "-"])
  expect(held.sent()).toBe(YAML)
})

test("a job the cluster would not take refuses the run by name", async () => {
  const held = capturing((argv) => (argv[0] === "apply" ? ranOf(1, "", "nope") : ranOf(0)))
  const said = (await jobRan(ROOT, COMMIT, NAME, YAML, 1, held.running, carried, pushed)) as {
    why: string
  }
  expect(said.why).toContain(NAME)
  expect(said.why).toContain("nope")
})

test("a commit that reaches origin nowhere puts no job up", async () => {
  const held = capturing()
  await jobRan(ROOT, COMMIT, NAME, YAML, 1, held.running, uncarried, pushed)
  expect(held.seen).toEqual([])
})
