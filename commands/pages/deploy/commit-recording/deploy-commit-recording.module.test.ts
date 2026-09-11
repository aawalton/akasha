import { expect, test } from "bun:test"
import {
  commitKeptIn,
  commitRecordedIn,
  DEPLOYED_COMMIT,
  REFUSED_COMMIT,
  saidOfNoRecord,
  saidOfNoRefusal,
} from "akasha/commands/pages/deploy/commit-recording/deploy-commit-recording.module.code.ts"

const AT = "infrastructure/services/clusters/pages/one/one.service-cluster.ts"

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

test("the commit put up and the commit refused are kept under two keys", () => {
  expect(DEPLOYED_COMMIT).not.toBe(REFUSED_COMMIT)
})

test("a page keeping nothing beside it is read as no commit", () => {
  expect(commitKeptIn(".", AT, DEPLOYED_COMMIT)).toBeNull()
})

test("the commit a deploy recorded is the one kept under the deployed key", () => {
  expect(commitRecordedIn(".", AT)).toBe(commitKeptIn(".", AT, DEPLOYED_COMMIT))
})

test("a write that failed is said back with the commit and what went wrong", () => {
  const said = saidOfNoRecord("one", COMMIT, ["the folder was read-only"])
  expect(said).toContain(COMMIT)
  expect(said).toContain("the folder was read-only")
})

test("a refusal that was not kept is said back as a commit that would be tried again", () => {
  const said = saidOfNoRefusal("one", COMMIT, ["the folder was read-only"])
  expect(said).toContain(COMMIT)
  expect(said).toContain("again")
})
