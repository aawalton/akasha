import { expect, test } from "bun:test"
import { ROOT } from "akasha/infrastructure/container-image/dockerfiles/modules/dockerfile-services/dockerfile-services.module.code.ts"
import {
  IN_CLUSTER,
  jobFor,
  jobNameFor,
  jobYamlFor,
  scriptFor,
} from "akasha/infrastructure/job/modules/deploy-job/deploy-job.module.code.ts"

const SUBJECT = "postgres-cnpg-image"

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

const WAS = "89abcdef0123456789abcdef0123456789abcdef"

test("a job is named for the subject deployed and the commit it is made at", () => {
  const named = jobNameFor(SUBJECT, COMMIT)
  expect(named).toContain(SUBJECT)
  expect(named).toContain("0123456789ab")
  expect(named).not.toContain(COMMIT)
})

test("the script takes the repository from the git service inside the cluster", () => {
  expect(scriptFor(ROOT, SUBJECT, COMMIT, null)).toContain(
    "git-transport.git.svc.cluster.local:3000"
  )
})

test("the script fetches the commit it is made at rather than the whole history", () => {
  const said = scriptFor(ROOT, SUBJECT, COMMIT, null)
  expect(said).toContain(`--depth 1 origin ${COMMIT}`)
  expect(said).toContain("git checkout -q FETCH_HEAD")
})

test("a subject never deployed leaves the script fetching one commit", () => {
  expect(scriptFor(ROOT, SUBJECT, COMMIT, null).split("git fetch").length - 1).toBe(1)
})

test("the script fetches the commit the subject was last deployed at as well", () => {
  const said = scriptFor(ROOT, SUBJECT, COMMIT, WAS)
  expect(said).toContain(`--depth 1 origin ${WAS}`)
  expect(said).toContain(`--depth 1 origin ${COMMIT}`)
  expect(said.indexOf(WAS)).toBeLessThan(said.indexOf(`origin ${COMMIT}`))
})

test("a commit origin no longer carries leaves the rest of the script running", () => {
  expect(scriptFor(ROOT, SUBJECT, COMMIT, WAS)).toContain(`origin ${WAS} || true`)
})

test("a subject last deployed at the commit being made fetches one commit", () => {
  expect(scriptFor(ROOT, SUBJECT, COMMIT, COMMIT).split("git fetch").length - 1).toBe(1)
})

test("the command the job runs is asked of the index rather than spelled", () => {
  const said = scriptFor(ROOT, SUBJECT, COMMIT, null)
  expect(said).toContain("cli.module.code.ts")
  expect(said).toContain(`${SUBJECT} --ref ${COMMIT}`)
})

test("a job builds the index by running a file rather than by calling a command", () => {
  const said = scriptFor(ROOT, SUBJECT, COMMIT, null)
  expect(said).toContain("index-building.module.code.ts")
  expect(said).not.toContain("index refresh")
})

test("a job carries the name it is known by", () => {
  const held = jobFor(ROOT, SUBJECT, COMMIT, null)
  expect(held.kind).toBe("Job")
  expect(held.metadata?.name).toBe(jobNameFor(SUBJECT, COMMIT))
})

test("a job that failed is not run again by the cluster", () => {
  expect(jobYamlFor(ROOT, SUBJECT, COMMIT, null)).toContain("backoffLimit: 0")
})

test("the memory a landing starts on is read from the pod", () => {
  expect(jobYamlFor(ROOT, SUBJECT, COMMIT, null)).toContain("LANDING_MIN_FREE_MEMORY_GB")
})

test("a job states that the run it carries is the one in the cluster", () => {
  expect(jobYamlFor(ROOT, SUBJECT, COMMIT, null)).toContain(IN_CLUSTER)
})

test("a job holds every privilege the node gives a container", () => {
  expect(jobYamlFor(ROOT, SUBJECT, COMMIT, null)).toContain("privileged: true")
})
