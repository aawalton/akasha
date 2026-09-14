import { expect, test } from "bun:test"
import { ROOT } from "akasha/infrastructure/container-image/dockerfiles/modules/dockerfile-services/dockerfile-services.module.code.ts"
import { jobNameFor } from "akasha/infrastructure/job/modules/deploy-job/deploy-job.module.code.ts"
import {
  applyArgv,
  endedBy,
  logsArgv,
  type Running,
  ranInCluster,
  waitArgv,
} from "akasha/infrastructure/job/modules/deploy-job-running/deploy-job-running.module.code.ts"
import type { Ran } from "akasha/infrastructure/services/clusters/modules/workload-deploying/workload-deploying.module.code.ts"

const SUBJECT = "postgres-cnpg-image"

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

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

test("every line the job said is read rather than the last few", () => {
  expect(logsArgv(NAME)).toContain("--tail=-1")
})

test("a job that ended has its lines carried back", () => {
  const held = endedBy(ranOf(0), ranOf(0), ranOf(0, "one\ntwo\n"), NAME)
  expect(held).toEqual({ said: ["one", "two"] })
})

test("a job that failed refuses the run, and the lines still come back", () => {
  const held = endedBy(ranOf(1), ranOf(0), ranOf(0, "why\n"), NAME) as { why: string }
  expect(held.why).toContain(NAME)
  expect(held.why).toContain("why")
})

test("a job left running past the wait refuses the run", () => {
  const held = endedBy(ranOf(1, "", "timed out"), ranOf(1), ranOf(0), NAME) as { why: string }
  expect(held.why).toContain("had not ended")
})

test("a commit origin does not carry refuses the run", () => {
  const never: Running = () => ranOf(0)
  const held = ranInCluster(ROOT, ROOT, SUBJECT, COMMIT, never, () => ({ carried: false })) as {
    why: string
  }
  expect(held.why).toContain(COMMIT)
})

test("a commit origin carries is put up as a job", () => {
  const seen: string[][] = []
  const running: Running = (argv) => {
    seen.push([...argv])
    return ranOf(0)
  }
  const held = ranInCluster(ROOT, ROOT, SUBJECT, COMMIT, running, () => ({ carried: true }))
  expect(held).toEqual({ said: [] })
  expect(seen[0]).toEqual(["apply", "-f", "-"])
})
