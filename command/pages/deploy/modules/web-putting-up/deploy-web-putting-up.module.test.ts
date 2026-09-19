import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  DATA,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import { given } from "akasha/command/pages/deploy/deploy.command.test-fixtures.ts"
import { putUpWebApp } from "akasha/command/pages/deploy/modules/web-putting-up/deploy-web-putting-up.module.code.ts"
import { seededWorld } from "akasha/infrastructure/service/cluster/modules/web-app-reading/web-app-reading.module.test-fixtures.ts"

const WORLD = seededWorld()
const HOLD = "/var/tmp"
const ORIGIN_PREFIX = "akasha-deploy-origin-"
const OTHER_PREFIX = "akasha-deploy-other-"
const NO_SHA = "0123456789abcdef0123456789abcdef01234567"

afterAll(() => {
  WORLD.sweep()
})

const HERE = given(WORLD.root)

function tracked(root: string): undefined {
  said(["git", "-C", root, "init", "-q"])
  said(["git", "-C", root, "add", "-A"])
}

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

function tracking(root: string, origin: string): undefined {
  said(["git", "-C", root, "branch", "-M", "main"])
  said(["git", "-C", root, "remote", "add", "origin", origin])
  said(["git", "-C", root, "push", "-q", "origin", "HEAD:refs/heads/main"])
  said(["git", "-C", root, "fetch", "-q", "origin"])
  said(["git", "-C", root, "branch", "--set-upstream-to=origin/main"])
}

function ahead(root: string, name: string, message: string): string {
  writeFileSync(join(root, name), name, "utf8")
  said(["git", "-C", root, "add", "-A"])
  committed(root, message)
  return said(["git", "-C", root, "rev-parse", "HEAD"]).trim()
}

test("a slug no web app page carries is refused as the data's fault", async () => {
  const answer = await putUpWebApp("no-such-web-app-here", NO_SHA, HERE, WORLD.root)
  expect(answer.code).toBe(DATA)
  expect(answer.refusals[0]).toContain("no-such-web-app-here")
  expect(answer.report).toEqual([])
})

test("a web app leaving which workload is meant unsettled is refused", async () => {
  const answer = await putUpWebApp("two-web", NO_SHA, HERE, WORLD.root)
  expect(answer.code).toBe(DATA)
  expect(answer.refusals[0]).toContain("unsettled")
})

test("a commit origin main does not carry is pushed there rather than refused", async () => {
  const world = seededWorld()
  const origin = mkdtempSync(join(HOLD, ORIGIN_PREFIX))
  try {
    tracked(world.root)
    committed(world.root, "what origin carries")
    said(["git", "-C", origin, "init", "-q", "--bare", "-b", "main"])
    tracking(world.root, origin)
    const sha = ahead(world.root, "later.txt", "what origin does not carry")
    await putUpWebApp("one-web", sha, given(world.root), world.root)
    expect(said(["git", "-C", origin, "rev-parse", "refs/heads/main"]).trim()).toBe(sha)
  } finally {
    rmSync(origin, { recursive: true, force: true })
    world.sweep()
  }
})

test("a push the remote refuses refuses the call rather than building on", async () => {
  const world = seededWorld()
  const origin = mkdtempSync(join(HOLD, ORIGIN_PREFIX))
  const other = mkdtempSync(join(HOLD, OTHER_PREFIX))
  try {
    tracked(world.root)
    committed(world.root, "what origin carries")
    said(["git", "-C", origin, "init", "-q", "--bare", "-b", "main"])
    tracking(world.root, origin)
    const theirs = join(other, "clone")
    said(["git", "clone", "-q", origin, theirs])
    ahead(theirs, "theirs.txt", "what someone else carried")
    said(["git", "-C", theirs, "push", "-q", "origin", "HEAD:refs/heads/main"])
    const sha = ahead(world.root, "later.txt", "what origin does not carry")
    const answer = await putUpWebApp("one-web", sha, given(world.root), world.root)
    expect(answer.code).toBe(OPERATIONAL)
    expect(answer.refusals[0]).toContain(sha)
    expect(answer.refusals.join(" ")).not.toContain("migration")
  } finally {
    rmSync(other, { recursive: true, force: true })
    rmSync(origin, { recursive: true, force: true })
    world.sweep()
  }
})
