import { expect, test } from "bun:test"
import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"
import { COMMIT } from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.test-fixtures.ts"
import { jobNameFor } from "akasha/infrastructure/job/modules/deploy-job/deploy-job.module.code.ts"
import {
  type Putting,
  type Recalling,
  ranInCluster,
} from "akasha/infrastructure/job/modules/deploy-job-running/deploy-job-running.module.code.ts"

const SUBJECT = "postgres-cnpg-image"

const WAS = "89abcdef0123456789abcdef0123456789abcdef"

const neverDeployed: Recalling = async () => null

const deployedAt: Recalling = async () => WAS

type Put = { readonly commit: string; readonly name: string; readonly yaml: string }

function putting(): { readonly put: Put[]; readonly putting: Putting } {
  const put: Put[] = []
  return {
    put,
    putting: async (_root, commit, name, yaml) => {
      put.push({ commit, name, yaml })
      return { said: [] }
    },
  }
}

test("a job is put up from the manifest composed for that subject and commit", async () => {
  const held = putting()
  const said = await ranInCluster(ROOT, ROOT, SUBJECT, COMMIT, neverDeployed, held.putting)
  expect(said).toEqual({ said: [] })
  const name = jobNameFor(SUBJECT, COMMIT)
  expect(held.put.map((one) => [one.commit, one.name])).toEqual([[COMMIT, name]])
  expect(held.put[0]?.yaml).toContain(name)
})

test("the commit the subject was last deployed at reaches the job", async () => {
  const held = putting()
  await ranInCluster(ROOT, ROOT, SUBJECT, COMMIT, deployedAt, held.putting)
  expect(held.put[0]?.yaml).toContain(WAS)
})
