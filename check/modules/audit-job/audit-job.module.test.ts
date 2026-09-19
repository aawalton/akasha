import { expect, test } from "bun:test"
import {
  digestOf,
  jobNameFor,
  ranAfter,
  scriptFor,
  WAITED_ROUNDS,
} from "akasha/check/modules/audit-job/audit-job.module.code.ts"
import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"
import { jobYamlFor } from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"
import { COMMIT } from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.test-fixtures.ts"

const CHECKS = ["no-class", "lint-clean"]

test("the checks a job runs are named in one order however the caller named them", () => {
  const said = scriptFor(ROOT, [...CHECKS].reverse(), COMMIT)
  expect(said).toBe(scriptFor(ROOT, CHECKS, COMMIT))
  expect(said.indexOf("lint-clean")).toBeLessThan(said.indexOf("no-class"))
  expect(scriptFor(ROOT, ["no-class", "no-class"], COMMIT).split("--check").length - 1).toBe(1)
})

test("two rounds over one commit and one set of checks are one job", () => {
  expect(jobNameFor(COMMIT, CHECKS)).toBe(jobNameFor(COMMIT, [...CHECKS].reverse()))
  expect(digestOf(CHECKS)).not.toBe(digestOf(["no-class"]))
})

test("a job is named for the commit it answers for and the checks it runs", () => {
  const named = jobNameFor(COMMIT, CHECKS)
  expect(named).toContain("audit-")
  expect(named).toContain("0123456789ab")
  expect(named).not.toContain(COMMIT)
  expect(named.length).toBeLessThan(64)
})

test("a job runs the audit command over the checks it is named for", () => {
  const said = scriptFor(ROOT, CHECKS, COMMIT)
  expect(said).toContain("--check lint-clean")
  expect(said).toContain("--check no-class")
})

test("the command the job runs is asked of the index rather than spelled", () => {
  expect(scriptFor(ROOT, CHECKS, COMMIT)).toContain("cli.module.code.ts")
})

test("a round that found refusals ends the job well, a refusal being no failure", () => {
  const said = scriptFor(ROOT, CHECKS, COMMIT)
  expect(said.split("\n").at(-1)).toContain("|| true")
  expect(said).toContain("set -eu")
})

test("a round fetches the commit it answers for and no commit before it", () => {
  const said = scriptFor(ROOT, CHECKS, COMMIT)
  expect(said).toContain(`--depth 1 origin ${COMMIT}`)
  expect(said.split("git fetch").length - 1).toBe(1)
})

test("a round is waited on for as long as the pod running it is given", () => {
  expect(WAITED_ROUNDS).toBeGreaterThan(180)
})

test("a check the job left no verdict for is left out rather than answered clean", () => {
  expect(ranAfter(ROOT, ["no-such-check-is-filed"])).toEqual([])
})

test("what a round found is read from the verdicts rather than from what the job said", () => {
  const named = jobNameFor(COMMIT, CHECKS)
  expect(jobYamlFor(named, scriptFor(ROOT, CHECKS, COMMIT))).toContain(named)
  expect(ranAfter(ROOT, CHECKS).every((one) => one.ran)).toBe(true)
})
