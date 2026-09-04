import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { seededWorld } from "@akasha/service-system/web-app-reading/testing"
import { said } from "@akasha/utils-run/running"
import { given } from "../deploy.command.test-fixtures.ts"
import { putUpWebApp } from "./deploy-web-putting-up.module.code.ts"

const WORLD = seededWorld()
const HOLD = "/var/tmp"
const ORIGIN_PREFIX = "akasha-deploy-origin-"
const OPERATIONAL = 3

afterAll(() => {
  WORLD.sweep()
})

const HERE = given(WORLD.root)

function committed(root: string, message: string): undefined {
  said([
    "git",
    "-C",
    root,
    "-c",
    "user.email=deploy@test",
    "-c",
    "user.name=deploy",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "-q",
    "-m",
    message,
  ])
}

test("a slug no web app page carries is refused as the data's fault", async () => {
  const answer = await putUpWebApp("no-such-web-app-here", HERE, false)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-web-app-here")
  expect(answer.report).toEqual([])
})

test("a web app leaving which workload is meant unsettled is refused", async () => {
  const answer = await putUpWebApp("two-web", HERE, false)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("unsettled")
})

test("a commit origin main does not carry is refused rather than pushed there", async () => {
  const world = seededWorld()
  const origin = mkdtempSync(join(HOLD, ORIGIN_PREFIX))
  try {
    committed(world.root, "what origin carries")
    said(["git", "-C", origin, "init", "-q", "--bare"])
    said(["git", "-C", world.root, "remote", "add", "origin", origin])
    said(["git", "-C", world.root, "push", "-q", "origin", "HEAD:refs/heads/main"])
    writeFileSync(join(world.root, "later.txt"), "later", "utf8")
    said(["git", "-C", world.root, "add", "-A"])
    committed(world.root, "what origin does not carry")
    const sha = said(["git", "-C", world.root, "rev-parse", "HEAD"]).trim()
    const answer = await putUpWebApp("one-web", given(world.root), true)
    expect(answer.code).toBe(OPERATIONAL)
    expect(answer.refusals[0]).toContain(sha)
    // MIGRATION ONLY, added 2026-09-03. This read
    // `expect(answer.refusals[0]).toContain(\`git push origin ${sha}:main\`)`, which held the
    // refusal to handing out the push akasha-migration constraint 16 forbids. Put it back and
    // delete these three when the migration is done.
    expect(answer.refusals[0]).not.toContain(`git push origin ${sha}:main`)
    expect(answer.refusals[0]).toContain("akasha migration forbids pushing to the remote")
    expect(answer.refusals[0]).toContain("nothing to work around")
  } finally {
    rmSync(origin, { recursive: true, force: true })
    world.sweep()
  }
})
