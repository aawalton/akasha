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
  expect(said).toContain(`--depth 1 origin ${WAS}`)
  expect(said.indexOf(WAS)).toBeLessThan(said.indexOf(`origin ${COMMIT}`))
})

test("a job carries the name it is known by", () => {
  expect(jobYamlFor(ROOT, SUBJECT, COMMIT, null)).toContain(jobNameFor(SUBJECT, COMMIT))
})
