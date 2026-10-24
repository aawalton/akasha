import { afterAll, expect, test } from "bun:test"
import { committed, given } from "akasha/command/pages/deploy/deploy.command.test-fixtures.ts"
import { commitAt } from "akasha/command/pages/deploy/modules/commit-naming/deploy-commit-naming.module.code.ts"
import { DEPLOYED_COMMIT } from "akasha/command/pages/deploy/modules/commit-recording/deploy-commit-recording.module.code.ts"
import {
  saidOfUnchanged,
  unchangedSince,
} from "akasha/command/pages/deploy/modules/unchanged/deploy-unchanged.module.code.ts"
import { seededWorld } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-reading/web-app-reading.module.test-fixtures.ts"
import {
  ASK_AT,
  type Fetcher,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const WORLD = seededWorld()

afterAll(() => {
  WORLD.sweep()
})

const ROOT = committed(WORLD.root)

const AT = commitAt(ROOT, null) as string

const HERE = given(ROOT)

function keptAt(commit: string | null): Fetcher {
  return (url) => {
    if (!url.endsWith(ASK_AT)) return Promise.resolve(new Response(JSON.stringify({})))
    const rows = commit === null ? [] : [{ [DEPLOYED_COMMIT]: commit }]
    return Promise.resolve(new Response(JSON.stringify({ rows, n: rows.length })))
  }
}

test("a thing kept at the commit HEAD is at answers that it is up already", async () => {
  const said = await unchangedSince("one-web", false, HERE, keptAt(AT), false)
  expect(said).toEqual([`commit\t${AT}`, saidOfUnchanged("one-web", AT)])
})

test("a thing no deploy has finished for is put up", async () => {
  expect(await unchangedSince("one-web", false, HERE, keptAt(null), false)).toBe(null)
})

test("a call naming a commit or a flag of an ios app is put up", async () => {
  expect(await unchangedSince("one-web", true, HERE, keptAt(AT), false)).toBe(null)
})

test("the run in the cluster is put up", async () => {
  expect(await unchangedSince("one-web", false, HERE, keptAt(AT), true)).toBe(null)
})

test("a slug no page carries is left to the deploy to refuse", async () => {
  expect(await unchangedSince("no-such-app-here", false, HERE, keptAt(AT), false)).toBe(null)
})
