import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { execSync } from "node:child_process"
import { chmodSync, cpSync, mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const HOOK_SRC = join(import.meta.dir, "pre-receive")

type Ctx = {
  root: string
  bare: string
  work: string
}

let ctx: Ctx

function isExecError(err: unknown): err is { stdout?: Buffer; stderr?: Buffer; status?: number } {
  return typeof err === "object" && err !== null
}

function sh(cmd: string, cwd: string): { stdout: string; stderr: string; code: number } {
  try {
    const stdout = execSync(cmd, {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
      env: {
        ...process.env,
        GIT_AUTHOR_NAME: "Test",
        GIT_AUTHOR_EMAIL: "test@example.com",
        GIT_COMMITTER_NAME: "Test",
        GIT_COMMITTER_EMAIL: "test@example.com",
      },
    }).toString()
    return { stdout, stderr: "", code: 0 }
  } catch (err) {
    if (!isExecError(err)) {
      return { stdout: "", stderr: "", code: 1 }
    }
    return {
      stdout: err.stdout?.toString() ?? "",
      stderr: err.stderr?.toString() ?? "",
      code: err.status ?? 1,
    }
  }
}

function shOk(cmd: string, cwd: string): string {
  const res = sh(cmd, cwd)
  if (res.code !== 0) {
    throw new Error(`cmd failed (${res.code}): ${cmd}\nstderr: ${res.stderr}`)
  }
  return res.stdout
}

function headSha(repo: string, ref: string): string {
  return shOk(`git rev-parse ${ref}`, repo).trim()
}

function pushWithTheHookDisabled(spec: string): undefined {
  chmodSync(join(ctx.bare, "hooks", "pre-receive"), 0o644)
  shOk(`git push origin ${spec}`, ctx.work)
  chmodSync(join(ctx.bare, "hooks", "pre-receive"), 0o755)
}

beforeEach(() => {
  const root = mkdtempSync(join(tmpdir(), "pre-receive-test-"))
  const bare = join(root, "origin.git")
  const work = join(root, "work")

  shOk(`git init --bare --initial-branch=main ${bare}`, root)

  cpSync(HOOK_SRC, join(bare, "hooks", "pre-receive"))
  chmodSync(join(bare, "hooks", "pre-receive"), 0o755)

  shOk(`git clone ${bare} ${work}`, root)
  shOk("git commit --allow-empty -m init", work)

  chmodSync(join(bare, "hooks", "pre-receive"), 0o644)
  shOk("git push origin main", work)
  chmodSync(join(bare, "hooks", "pre-receive"), 0o755)

  ctx = { root, bare, work }
})

afterEach(() => {
  rmSync(ctx.root, { recursive: true, force: true })
})

describe("pre-receive main protection", () => {
  test("rejects direct push to main from a branch it does not admit", () => {
    shOk("git commit --allow-empty -m direct", ctx.work)
    const res = sh("git push origin main", ctx.work)
    expect(res.code).not.toBe(0)
    expect(res.stderr).toContain("not reachable from any")
  })

  test("accepts fast-forward push to main when tip is on an existing change-NNNN branch", () => {
    shOk("git checkout -b change-1234", ctx.work)
    shOk("git commit --allow-empty -m feat", ctx.work)
    shOk("git push origin change-1234", ctx.work)

    const res = sh("git push origin change-1234:main", ctx.work)
    expect(res.code).toBe(0)

    expect(headSha(ctx.bare, "main")).toBe(headSha(ctx.bare, "change-1234"))
  })

  test("accepts fast-forward push to main when tip is on a merge-NNNN fold", () => {
    shOk("git checkout -b merge-1500", ctx.work)
    shOk("git commit --allow-empty -m fold", ctx.work)
    shOk("git push origin merge-1500", ctx.work)

    const res = sh("git push origin merge-1500:main", ctx.work)
    expect(res.code).toBe(0)

    expect(headSha(ctx.bare, "main")).toBe(headSha(ctx.bare, "merge-1500"))
  })

  test("accepts atomic push of a change branch and main together", () => {
    shOk("git checkout -b change-2000", ctx.work)
    shOk("git commit --allow-empty -m feat", ctx.work)

    const res = sh("git push --atomic origin change-2000 change-2000:main", ctx.work)
    expect(res.code).toBe(0)

    expect(headSha(ctx.bare, "main")).toBe(headSha(ctx.bare, "change-2000"))
  })

  test("still lands a project-NNNN branch, which several in flight still need", () => {
    shOk("git checkout -b project-1234", ctx.work)
    shOk("git commit --allow-empty -m feat", ctx.work)
    shOk("git push origin project-1234", ctx.work)

    const res = sh("git push origin project-1234:main", ctx.work)
    expect(res.code).toBe(0)
  })

  test("rejects non-fast-forward push to main", () => {
    shOk("git checkout -b change-3333", ctx.work)
    shOk("git commit --allow-empty -m work", ctx.work)
    shOk("git push origin change-3333", ctx.work)
    shOk("git push origin change-3333:main", ctx.work)

    shOk("git reset --hard HEAD~1", ctx.work)
    shOk("git commit --allow-empty -m rewrite", ctx.work)
    shOk("git push -f origin change-3333", ctx.work)

    const res = sh("git push origin change-3333:main", ctx.work)
    expect(res.code).not.toBe(0)
    const combined = `${res.stdout}\n${res.stderr}`
    expect(combined).toMatch(/fast-forward|rejected|REJECTED/)
  })

  test("rejects deletion of main", () => {
    const res = sh("git push origin :main", ctx.work)
    expect(res.code).not.toBe(0)
    const combined = `${res.stdout}\n${res.stderr}`
    expect(combined).toMatch(/deletion|refusing|denyDeleteCurrent|REJECTED/)
  })

  test("does not interfere with change-NNNN branch pushes", () => {
    shOk("git checkout -b change-4444", ctx.work)
    shOk("git commit --allow-empty -m feat", ctx.work)
    const res = sh("git push origin change-4444", ctx.work)
    expect(res.code).toBe(0)
  })

  test("rejects push whose tip exists on an unadmitted branch only", () => {
    shOk("git checkout -b hotfix-foo", ctx.work)
    shOk("git commit --allow-empty -m hotfix", ctx.work)
    pushWithTheHookDisabled("hotfix-foo")

    const res = sh("git push origin hotfix-foo:main", ctx.work)
    expect(res.code).not.toBe(0)
    expect(res.stderr).toContain("not reachable from any")
  })

  test("a commit on merge-queue/staging alone cannot carry main, though it starts `merge-`", () => {
    shOk("git checkout -b merge-queue/staging", ctx.work)
    shOk("git commit --allow-empty -m staging", ctx.work)
    pushWithTheHookDisabled("merge-queue/staging")

    const res = sh("git push origin merge-queue/staging:main", ctx.work)
    expect(res.code).not.toBe(0)
    expect(res.stderr).toContain("not reachable from any")
  })
})

describe("pre-receive branch naming", () => {
  test("rejects creation of a branch matching no admitted pattern", () => {
    shOk("git checkout -b feature-foo", ctx.work)
    shOk("git commit --allow-empty -m feat", ctx.work)
    const res = sh("git push origin feature-foo", ctx.work)
    expect(res.code).not.toBe(0)
    expect(res.stderr).toContain("does not match")
    expect(res.stderr).toContain("ops branch start")
  })

  test("allows change-NNNN branch creation", () => {
    shOk("git checkout -b change-5555", ctx.work)
    shOk("git commit --allow-empty -m feat", ctx.work)
    const res = sh("git push origin change-5555", ctx.work)
    expect(res.code).toBe(0)
  })

  test("allows merge-NNNN branch creation", () => {
    shOk("git checkout -b merge-5556", ctx.work)
    shOk("git commit --allow-empty -m fold", ctx.work)
    const res = sh("git push origin merge-5556", ctx.work)
    expect(res.code).toBe(0)
  })

  test("allows project-NNNN branch creation, which nothing mints but several still stand on", () => {
    shOk("git checkout -b project-5557", ctx.work)
    shOk("git commit --allow-empty -m feat", ctx.work)
    const res = sh("git push origin project-5557", ctx.work)
    expect(res.code).toBe(0)
  })

  test("rejects change- with a non-numeric suffix", () => {
    shOk("git checkout -b change-abc", ctx.work)
    shOk("git commit --allow-empty -m feat", ctx.work)
    const res = sh("git push origin change-abc", ctx.work)
    expect(res.code).not.toBe(0)
    expect(res.stderr).toContain("does not match")
  })

  test("rejects change- with no suffix", () => {
    shOk("git checkout -b change-", ctx.work)
    shOk("git commit --allow-empty -m feat", ctx.work)
    const res = sh("git push origin change-", ctx.work)
    expect(res.code).not.toBe(0)
    expect(res.stderr).toContain("does not match")
  })

  test("rejects merge- with a non-numeric suffix", () => {
    shOk("git checkout -b merge-abc", ctx.work)
    shOk("git commit --allow-empty -m fold", ctx.work)
    const res = sh("git push origin merge-abc", ctx.work)
    expect(res.code).not.toBe(0)
    expect(res.stderr).toContain("does not match")
  })

  test("no longer admits merge-queue/staging, which the queue's removal took with it", () => {
    shOk("git checkout -b merge-queue/staging", ctx.work)
    shOk("git commit --allow-empty -m staging", ctx.work)
    const res = sh("git push origin merge-queue/staging", ctx.work)
    expect(res.code).not.toBe(0)
    expect(res.stderr).toContain("does not match")
  })

  test("rejects a merge-queue branch outside the staging namespace", () => {
    shOk("git checkout -b merge-queue/other", ctx.work)
    shOk("git commit --allow-empty -m other", ctx.work)
    const res = sh("git push origin merge-queue/other", ctx.work)
    expect(res.code).not.toBe(0)
  })

  test("allows deletion of an unadmitted branch", () => {
    shOk("git checkout -b cleanup-old", ctx.work)
    shOk("git commit --allow-empty -m old", ctx.work)
    pushWithTheHookDisabled("cleanup-old")

    const res = sh("git push origin :cleanup-old", ctx.work)
    expect(res.code).toBe(0)
  })

  test("allows update (force-push) of an existing unadmitted branch", () => {
    shOk("git checkout -b legacy-branch", ctx.work)
    shOk("git commit --allow-empty -m old", ctx.work)
    pushWithTheHookDisabled("legacy-branch")

    shOk("git commit --allow-empty -m new", ctx.work)
    const res = sh("git push -f origin legacy-branch", ctx.work)
    expect(res.code).toBe(0)
  })
})
