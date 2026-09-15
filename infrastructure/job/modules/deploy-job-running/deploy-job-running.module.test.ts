import { expect, test } from "bun:test"
import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"
import { jobNameFor } from "akasha/infrastructure/job/modules/deploy-job/deploy-job.module.code.ts"
import {
  applyArgv,
  endedBy,
  fateOf,
  logsArgv,
  type Recalling,
  type Running,
  ranInCluster,
  waitArgv,
} from "akasha/infrastructure/job/modules/deploy-job-running/deploy-job-running.module.code.ts"
import type { Ran } from "akasha/infrastructure/service/cluster/modules/workload-deploying/workload-deploying.module.code.ts"

const SUBJECT = "postgres-cnpg-image"

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

const WAS = "89abcdef0123456789abcdef0123456789abcdef"

const neverDeployed: Recalling = async () => null

const deployedAt: Recalling = async () => WAS

const NAME = jobNameFor(SUBJECT, COMMIT)

function ranOf(code: number, stdout = "", stderr = ""): Ran {
  return { argv: [], code, stdout, stderr }
}

test("a job is put up by reading the manifest off standard input", () => {
  expect(applyArgv()).toEqual(["apply", "-f", "-"])
})

test("the wait names the job and how long it is waited on", () => {
  const said = waitArgv(NAME, "condition=Complete", "30m")
  expect(said).toContain(`job/${NAME}`)
  expect(said).toContain("--timeout=30m")
})

test("a job that failed is seen on the round it failed rather than after the whole wait", () => {
  let asked = 0
  const running: Running = (argv) => {
    asked += 1
    return ranOf(argv.includes("--for=condition=Failed") ? 0 : 1)
  }
  expect(fateOf(running, NAME, 180)).toBe("failed")
  expect(asked).toBe(2)
})

test("a job still running past every round is answered as running", () => {
  const running: Running = () => ranOf(1)
  expect(fateOf(running, NAME, 3)).toBe("running")
})

test("every line the job said is read rather than the last few", () => {
  expect(logsArgv(NAME)).toContain("--tail=-1")
})

test("a job that ended has its lines carried back", () => {
  const held = endedBy("complete", ranOf(0, "one\ntwo\n"), NAME)
  expect(held).toEqual({ said: ["one", "two"] })
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

test("a commit origin does not carry is pushed there before the job goes up", async () => {
  const seen: string[][] = []
  const running: Running = (argv) => {
    seen.push([...argv])
    return ranOf(0)
  }
  let asked = 0
  const carrying = (): { carried: boolean } => {
    asked += 1
    return { carried: asked > 1 }
  }
  const held = await ranInCluster(
    ROOT,
    ROOT,
    SUBJECT,
    COMMIT,
    neverDeployed,
    running,
    carrying,
    () => ({
      failed: false,
      line: "push:   pushed",
      remote: "origin",
      branch: "main",
      reason: null,
    })
  )
  expect(held).toEqual({ said: [] })
  expect(seen[0]).toEqual(["apply", "-f", "-"])
})

test("a commit origin still does not carry after the push refuses the run", async () => {
  const never: Running = () => ranOf(0)
  const held = (await ranInCluster(
    ROOT,
    ROOT,
    SUBJECT,
    COMMIT,
    neverDeployed,
    never,
    () => ({ carried: false }),
    () => ({
      failed: false,
      line: "push:   pushed",
      remote: "origin",
      branch: "main",
      reason: null,
    })
  )) as { why: string }
  expect(held.why).toContain(COMMIT)
})

test("a commit origin carries is put up as a job", async () => {
  const seen: string[][] = []
  const running: Running = (argv) => {
    seen.push([...argv])
    return ranOf(0)
  }
  const held = await ranInCluster(ROOT, ROOT, SUBJECT, COMMIT, neverDeployed, running, () => ({
    carried: true,
  }))
  expect(held).toEqual({ said: [] })
  expect(seen[0]).toEqual(["apply", "-f", "-"])
})

test("the commit the subject was last deployed at reaches the job", async () => {
  const seen: string[][] = []
  let sent = ""
  const running: Running = (argv, text) => {
    seen.push([...argv])
    if (text !== null) sent = text
    return ranOf(0)
  }
  await ranInCluster(ROOT, ROOT, SUBJECT, COMMIT, deployedAt, running, () => ({ carried: true }))
  expect(seen[0]).toEqual(["apply", "-f", "-"])
  expect(sent).toContain(WAS)
})
