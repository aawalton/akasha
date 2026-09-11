import { expect, test } from "bun:test"
import {
  ADD,
  actFor,
  addingAt,
  DEPLOYED_COMMIT,
  REFUSED_COMMIT,
  RESTATE,
  restatingAt,
  saidOfNoRecord,
  saidOfNoRefusal,
} from "akasha/commands/pages/deploy/commit-recording/deploy-commit-recording.module.code.ts"

const AT = "infrastructure/services/clusters/pages/one/one.service-cluster.ts"

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

const BEFORE = "4f2a91c"

test("a page stating no commit yet gains the key", () => {
  expect(actFor(null, AT, DEPLOYED_COMMIT, COMMIT).at).toBe(ADD)
})

test("a page already stating a commit has that key restated", () => {
  expect(actFor(BEFORE, AT, DEPLOYED_COMMIT, COMMIT).at).toBe(RESTATE)
})

test("the commit a page gains is written as text rather than as a bare word", () => {
  expect(addingAt(AT, DEPLOYED_COMMIT, COMMIT).given.value).toBe(`"${COMMIT}"`)
})

test("a restatement hands the commit unquoted, since the act quotes what it is handed", () => {
  expect(restatingAt(AT, DEPLOYED_COMMIT, COMMIT).given.to).toBe(COMMIT)
})

test("either act names the page and the key", () => {
  const acts = [addingAt(AT, DEPLOYED_COMMIT, COMMIT), restatingAt(AT, DEPLOYED_COMMIT, COMMIT)]
  for (const act of acts) {
    expect(act.given.at).toBe(AT)
    expect(act.given.key).toBe(DEPLOYED_COMMIT)
  }
})

test("a commit a deploy refused at is written under its own key", () => {
  expect(addingAt(AT, REFUSED_COMMIT, COMMIT).given.key).toBe(REFUSED_COMMIT)
})

test("a landing that refused is said back with the commit and what refused it", () => {
  const said = saidOfNoRecord("one", COMMIT, ["the index was busy"])
  expect(said).toContain(COMMIT)
  expect(said).toContain("the index was busy")
})

test("a refusal that was not written is said back as a commit that would be tried again", () => {
  const said = saidOfNoRefusal("one", COMMIT, ["the index was busy"])
  expect(said).toContain(COMMIT)
  expect(said).toContain("again")
})
