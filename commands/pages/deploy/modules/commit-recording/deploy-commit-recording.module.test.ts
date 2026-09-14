import { expect, test } from "bun:test"
import {
  commitKeptIn,
  commitRecordedIn,
  DEPLOYED_COMMIT,
  REFUSED_COMMIT,
  recordedCommit,
  saidOfNoRecord,
  saidOfNoRefusal,
} from "akasha/commands/pages/deploy/modules/commit-recording/deploy-commit-recording.module.code.ts"
import type {
  Fetcher,
  Sleeper,
} from "akasha/pages/service/modules/page-calling/page-calling.module.code.ts"

const AT = "infrastructure/services/clusters/pages/one/one.service-cluster.ts"

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

const AUTHORED = /^[^<>]+ <[^<>@\s]+@[^<>\s]+>$/

const neverNaps: Sleeper = () => Promise.resolve()

function answering(
  body: unknown,
  status: number = 200
): { readonly fetcher: Fetcher; readonly sent: () => string } {
  let sent = ""
  return {
    fetcher: (_url, init) => {
      sent = String(init.body)
      return Promise.resolve(new Response(JSON.stringify(body), { status }))
    },
    sent: () => sent,
  }
}

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

test("the commit is kept by a write handed to the pages rather than by writing the tree", async () => {
  const held = answering({ commit: null, wrote: [AT], took: [] })
  const wrong = await recordedCommit(".", "one", AT, COMMIT, held.fetcher, neverNaps)
  expect(wrong).toEqual([])
  const body = JSON.parse(held.sent())
  expect(body.kept).toEqual([{ path: AT, values: { [DEPLOYED_COMMIT]: COMMIT } }])
  expect(body.writer).toMatch(AUTHORED)
  expect(body.message).toContain(DEPLOYED_COMMIT)
})

test("a write the pages refuse is answered as what went wrong rather than thrown", async () => {
  const held = answering({ refused: "the pages would not write" }, 400)
  const wrong = await recordedCommit(".", "one", AT, COMMIT, held.fetcher, neverNaps)
  expect(wrong[0]).toContain("the pages would not write")
  expect(wrong[0]).toContain(COMMIT)
})
