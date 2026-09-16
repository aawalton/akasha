import { expect, test } from "bun:test"
import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"
import {
  COMMIT,
  capturing,
  carried,
  pushed,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.test-fixtures.ts"
import { jobNameFor } from "akasha/infrastructure/job/modules/deploy-job/deploy-job.module.code.ts"
import {
  type Recalling,
  ranInCluster,
} from "akasha/infrastructure/job/modules/deploy-job-running/deploy-job-running.module.code.ts"

const SUBJECT = "postgres-cnpg-image"

const WAS = "89abcdef0123456789abcdef0123456789abcdef"

const neverDeployed: Recalling = async () => null

const deployedAt: Recalling = async () => WAS

test("a job is put up from the manifest composed for that subject and commit", async () => {
  const held = capturing()
  const said = await ranInCluster(
    ROOT,
    ROOT,
    SUBJECT,
    COMMIT,
    neverDeployed,
    held.running,
    carried,
    pushed
  )
  expect(said).toEqual({ said: [] })
  expect(held.seen[0]).toEqual(["apply", "-f", "-"])
  expect(held.sent()).toContain(jobNameFor(SUBJECT, COMMIT))
})

test("the commit the subject was last deployed at reaches the job", async () => {
  const held = capturing()
  await ranInCluster(ROOT, ROOT, SUBJECT, COMMIT, deployedAt, held.running, carried, pushed)
  expect(held.seen[0]).toEqual(["apply", "-f", "-"])
  expect(held.sent()).toContain(WAS)
})
