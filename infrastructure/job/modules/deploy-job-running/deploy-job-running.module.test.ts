import { expect, test } from "bun:test"
import { watching } from "akasha/command/modules/stopping/command-stopping.module.code.ts"
import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"
import { COMMIT } from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.test-fixtures.ts"
import {
  JUDGED,
  jobNameFor,
  jobsOf,
} from "akasha/infrastructure/job/modules/deploy-job/deploy-job.module.code.ts"
import {
  finishedAt,
  hearingFor,
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

test("a deploy's job waits beside every running job deploying the same subject", async () => {
  const beside: RegExp[] = []
  await ranInCluster(ROOT, ROOT, SUBJECT, COMMIT, neverDeployed, async (...given) => {
    beside.push(given[4])
    return { said: [] }
  })
  expect(beside).toEqual([jobsOf(SUBJECT)])
})

test("a subject's jobs are its own at any commit and never another subject's", () => {
  expect(jobsOf("alanwalton").test(jobNameFor("alanwalton", WAS))).toBe(true)
  expect(jobsOf("alanwalton").test(jobNameFor("alanwalton-web", COMMIT))).toBe(false)
})

test("a deploy's ceiling is set aside once its job starts and counted again once it is judged", async () => {
  const watch = watching(1, "akasha one")
  const hearing = hearingFor("akasha one")
  const at = Date.now()
  hearing.started()
  hearing.started()

  await Bun.sleep(1500)
  hearing.heard()
  watch.ended()

  expect(Date.now() - at).toBeGreaterThan(1000)
  expect(hearing.said).toBe(JUDGED)
})

test("a deploy's work finished where its job says it kept that subject's commit", () => {
  const finished = finishedAt(SUBJECT, COMMIT)
  expect(finished(["up\tone", `recorded\t${SUBJECT}\t${COMMIT}`])).toBe(true)
  expect(finished([`recorded\t${SUBJECT}\t${WAS}`])).toBe(false)
  expect(finished([`recorded\talanwalton-web\t${COMMIT}`])).toBe(false)
  expect(finished(["up\tone"])).toBe(false)
})

test("the job is answered by the line its subject and commit say its work finished", async () => {
  const handed: boolean[] = []
  await ranInCluster(ROOT, ROOT, SUBJECT, COMMIT, neverDeployed, async (...given) => {
    handed.push(given[6]([`recorded\t${SUBJECT}\t${COMMIT}`]))
    return { said: [] }
  })
  expect(handed).toEqual([true])
})

test("the commit the subject was last deployed at reaches the job", async () => {
  const held = putting()
  await ranInCluster(ROOT, ROOT, SUBJECT, COMMIT, deployedAt, held.putting)
  expect(held.put[0]?.yaml).toContain(WAS)
})
