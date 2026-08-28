import { afterAll, beforeEach, describe, expect, test } from "bun:test"
import { spawnSync } from "node:child_process"
import { chmodSync, cpSync, mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"

const HOOK_SRC = join(import.meta.dir, "pre-receive-main-append-only")

type Ctx = { root: string; bare: string; work: string }

let ctx: Ctx

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

type Result = { readonly stdout: string; readonly stderr: string; readonly code: number }

function sh(cmd: string, cwd: string): Result {
  const res = spawnSync("sh", ["-c", cmd], {
    cwd,
    encoding: "utf8",
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: "Test",
      GIT_AUTHOR_EMAIL: "test@example.com",
      GIT_COMMITTER_NAME: "Test",
      GIT_COMMITTER_EMAIL: "test@example.com",
    },
  })
  return { stdout: res.stdout ?? "", stderr: res.stderr ?? "", code: res.status ?? 1 }
}

function shOk(cmd: string, cwd: string): string {
  const res = sh(cmd, cwd)
  if (res.code !== 0) {
    throw new Error(`cmd failed (${res.code}): ${cmd}\nstderr: ${res.stderr}`)
  }
  return res.stdout
}

function pushMain(refspec: string, flags = ""): Result {
  return sh(`git push ${flags} origin ${refspec}`, ctx.work)
}

function seedMain(): undefined {
  const res = pushMain("HEAD:refs/heads/main")
  if (res.code !== 0) {
    throw new Error(`seed push rejected: ${res.stderr}`)
  }
}

beforeEach(() => {
  const root = mkdtempSync("/var/tmp/append-only-test-")
  made.push(root)
  const bare = join(root, "origin.git")
  const work = join(root, "work")
  shOk(`git init --bare --initial-branch=main ${bare}`, root)
  cpSync(HOOK_SRC, join(bare, "hooks", "pre-receive"))
  chmodSync(join(bare, "hooks", "pre-receive"), 0o755)
  shOk(`git clone ${bare} ${work}`, root)
  shOk("git commit --allow-empty -m seed", work)
  ctx = { root, bare, work }
})

describe("append-only push policy", () => {
  test("accepts the creation of main, which is what a restore pushes", () => {
    expect(pushMain("HEAD:refs/heads/main").code).toBe(0)
    expect(shOk("git rev-parse main", ctx.bare).trim()).toBe(
      shOk("git rev-parse HEAD", ctx.work).trim()
    )
  })

  test("accepts a fast-forward advance of main", () => {
    seedMain()
    shOk("git commit --allow-empty -m next", ctx.work)

    expect(pushMain("HEAD:refs/heads/main").code).toBe(0)
    expect(shOk("git rev-parse main", ctx.bare).trim()).toBe(
      shOk("git rev-parse HEAD", ctx.work).trim()
    )
  })

  test("rejects a rewind of main to an earlier commit", () => {
    seedMain()
    shOk("git commit --allow-empty -m next", ctx.work)
    seedMain()
    const tip = shOk("git rev-parse main", ctx.bare).trim()

    const res = pushMain("HEAD~1:refs/heads/main", "-f")

    expect(res.code).not.toBe(0)
    expect(`${res.stdout}\n${res.stderr}`).toContain("must fast-forward")
    expect(shOk("git rev-parse main", ctx.bare).trim()).toBe(tip)
  })

  test("rejects a rewrite of main onto a divergent history", () => {
    seedMain()
    const tip = shOk("git rev-parse main", ctx.bare).trim()
    shOk("git reset --hard HEAD~0", ctx.work)
    shOk("git commit --allow-empty --amend -m rewritten", ctx.work)

    const res = pushMain("HEAD:refs/heads/main", "-f")

    expect(res.code).not.toBe(0)
    expect(`${res.stdout}\n${res.stderr}`).toContain("must fast-forward")
    expect(shOk("git rev-parse main", ctx.bare).trim()).toBe(tip)
  })

  test("rejects deletion of main, and it is the hook that refuses", () => {
    seedMain()
    shOk(`git config -f ${ctx.bare}/config receive.denyDeleteCurrent ignore`, ctx.bare)

    const res = pushMain(":refs/heads/main")

    expect(res.code).not.toBe(0)
    expect(`${res.stdout}\n${res.stderr}`).toContain("[pre-receive] REJECTED")
    expect(sh("git rev-parse main", ctx.bare).code).toBe(0)
  })

  test("leaves refs other than main unconstrained", () => {
    seedMain()
    expect(pushMain("HEAD:refs/heads/scratch").code).toBe(0)
    shOk("git commit --allow-empty --amend -m rewritten", ctx.work)
    expect(pushMain("HEAD:refs/heads/scratch", "-f").code).toBe(0)
    expect(pushMain(":refs/heads/scratch").code).toBe(0)
  })

  test("imposes no branch-naming rule, unlike the code repo's policy", () => {
    expect(pushMain("HEAD:refs/heads/anything-at-all").code).toBe(0)
  })
})
