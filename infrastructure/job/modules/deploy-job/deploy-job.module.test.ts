import { expect, test } from "bun:test"
import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"
import {
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

test("two runs at one commit are two jobs, so a kept job is never applied over", () => {
  const first = jobNameFor(SUBJECT, COMMIT, 1_793_200_000_000)
  const again = jobNameFor(SUBJECT, COMMIT, 1_793_200_001_000)
  expect(first).not.toBe(again)
  expect(first.startsWith(`deploy-${SUBJECT}-0123456789ab-`)).toBe(true)
})

test("a job's name stays within what the cluster admits for the longest subject", () => {
  expect(jobNameFor("alanwalton-requests-web", COMMIT).length).toBeLessThanOrEqual(63)
})

test("the command the job runs is asked of the index rather than spelled", () => {
  const said = scriptFor(ROOT, SUBJECT, COMMIT, null)
  expect(said).toContain("cli.module.code.ts")
  expect(said).toContain(`${SUBJECT} --ref ${COMMIT}`)
})

test("the deploy a job carries runs under no ceiling of the command's own", () => {
  expect(scriptFor(ROOT, SUBJECT, COMMIT, null)).toContain("--measured")
})

test("the commit the subject was last deployed at is fetched beside the one being made", () => {
  const said = scriptFor(ROOT, SUBJECT, COMMIT, WAS)
  expect(said).toContain(`git fetch -q --no-tags origin ${WAS} || true`)
  expect(said.indexOf(`origin ${WAS}`)).toBeLessThan(said.indexOf(`checkout -q --detach ${COMMIT}`))
})

test("what the job is handed is set before the deploy it runs", () => {
  const said = scriptFor(ROOT, SUBJECT, COMMIT, null, "HANDED='one' ")
  expect(said).toContain(`HANDED='one' bun `)
  expect(said.indexOf("HANDED='one'")).toBeLessThan(said.indexOf(`${SUBJECT} --ref ${COMMIT}`))
})

test("a deploy's job reads the history its disk keeps", () => {
  const said = jobYamlFor(ROOT, SUBJECT, COMMIT, null)
  expect(said).toContain("claimName: deploy-cache")
  expect(said).toContain("mountPath: /mirror")
})

test("a job carries the name it is known by", () => {
  const named = jobNameFor(SUBJECT, COMMIT, 1_793_200_000_000)
  expect(jobYamlFor(ROOT, SUBJECT, COMMIT, null, "", named)).toContain(`name: ${named}`)
})

test("a deploy's job is ended a quarter hour after it starts", () => {
  expect(jobYamlFor(ROOT, SUBJECT, COMMIT, null)).toContain("activeDeadlineSeconds: 900")
})

test("a deploy's job reserves the memory a deploy has been measured to reach", () => {
  expect(jobYamlFor(ROOT, SUBJECT, COMMIT, null)).toContain("memory: 16Gi")
})
