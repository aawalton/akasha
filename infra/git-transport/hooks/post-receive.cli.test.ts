import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { spawnSync } from "node:child_process"
import { chmodSync, cpSync, mkdtempSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { sleepSync } from "bun"

const HOOK_SRC = join(import.meta.dir, "post-receive")

type Repo = {
  readonly bare: string
  readonly work: string
  readonly mirror: string
}

type Ctx = {
  root: string
  alpha: Repo
  beta: Repo
}

let ctx: Ctx

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

function refsOf(repo: string): readonly string[] {
  return shOk(`git -C ${repo} for-each-ref --format='%(refname) %(objectname)'`, repo)
    .split("\n")
    .filter((line) => line !== "")
}

function declareMirror(repo: Repo, destination: string): undefined {
  shOk(`git config -f ${repo.bare}/config mirror.url ${destination}`, repo.bare)
}

function declareMode(repo: Repo, mode: string): undefined {
  shOk(`git config -f ${repo.bare}/config mirror.mode ${mode}`, repo.bare)
}

const SETTLE_MS = 10_000

function stateOf(repo: Repo): string {
  try {
    return readFileSync(join(repo.bare, "mirror.state"), "utf8")
  } catch {
    return ""
  }
}

function afterMirror<T>(repo: Repo, act: () => T): T {
  rmSync(join(repo.bare, "mirror.state"), { force: true })
  const held = act()
  settled(repo)
  return held
}

function settled(repo: Repo): string {
  const until = Date.now() + SETTLE_MS
  for (;;) {
    const held = stateOf(repo)
    if (held !== "") return held
    if (Date.now() >= until) {
      throw new Error(`the mirror of ${repo.bare} recorded nothing within ${SETTLE_MS}ms`)
    }
    sleepSync(25)
  }
}

function pushMain(repo: Repo): Result {
  return sh("git push origin HEAD:refs/heads/main", repo.work)
}

function makeRepo(root: string, name: string): Repo {
  const bare = join(root, `${name}.git`)
  const work = join(root, `${name}-work`)
  const mirror = join(root, `${name}-mirror.git`)
  shOk(`git init --bare --initial-branch=main ${bare}`, root)
  shOk(`git init --bare --initial-branch=main ${mirror}`, root)
  cpSync(HOOK_SRC, join(bare, "hooks", "post-receive"))
  chmodSync(join(bare, "hooks", "post-receive"), 0o755)
  shOk(`git clone ${bare} ${work}`, root)
  shOk(`git commit --allow-empty -m seed-${name}`, work)
  return { bare, work, mirror }
}

beforeEach(() => {
  const root = mkdtempSync("/var/tmp/post-receive-test-")
  ctx = { root, alpha: makeRepo(root, "alpha"), beta: makeRepo(root, "beta") }
})

afterEach(() => {
  rmSync(ctx.root, { recursive: true, force: true })
})

describe("post-receive mirror destination", () => {
  test("mirrors to the destination the firing repo declares", () => {
    declareMirror(ctx.alpha, ctx.alpha.mirror)
    const res = afterMirror(ctx.alpha, () => pushMain(ctx.alpha))

    const tip = shOk("git rev-parse HEAD", ctx.alpha.work).trim()
    expect(refsOf(ctx.alpha.mirror)).toEqual([`refs/heads/main ${tip}`])
    expect(res.stderr).toContain(ctx.alpha.mirror)
  })

  test("a push reaches its own repo's destination and no other", () => {
    declareMirror(ctx.alpha, ctx.alpha.mirror)
    declareMirror(ctx.beta, ctx.beta.mirror)

    afterMirror(ctx.alpha, () => pushMain(ctx.alpha))

    expect(refsOf(ctx.alpha.mirror)).toHaveLength(1)
    expect(refsOf(ctx.beta.mirror)).toEqual([])
  })

  test("two repos mirroring at once each land only in their own destination", () => {
    declareMirror(ctx.alpha, ctx.alpha.mirror)
    declareMirror(ctx.beta, ctx.beta.mirror)

    afterMirror(ctx.alpha, () => pushMain(ctx.alpha))
    afterMirror(ctx.beta, () => pushMain(ctx.beta))

    const alphaTip = shOk("git rev-parse HEAD", ctx.alpha.work).trim()
    const betaTip = shOk("git rev-parse HEAD", ctx.beta.work).trim()
    expect(alphaTip).not.toBe(betaTip)
    expect(refsOf(ctx.alpha.mirror)).toEqual([`refs/heads/main ${alphaTip}`])
    expect(refsOf(ctx.beta.mirror)).toEqual([`refs/heads/main ${betaTip}`])
  })

  test("a repo that declares no destination refuses to guess one", () => {
    declareMirror(ctx.beta, ctx.beta.mirror)

    const res = pushMain(ctx.alpha)

    expect(res.stderr).toContain("declares no mirror.url")
    expect(refsOf(ctx.alpha.mirror)).toEqual([])
    expect(refsOf(ctx.beta.mirror)).toEqual([])
  })

  test("a declared destination that cannot be reached fails loudly", () => {
    declareMirror(ctx.alpha, join(ctx.root, "absent.git"))

    const res = afterMirror(ctx.alpha, () => pushMain(ctx.alpha))

    expect(res.code).toBe(0)
    expect(settled(ctx.alpha)).toContain("fail")
    expect(settled(ctx.alpha)).toContain("absent.git")
    expect(refsOf(ctx.alpha.mirror)).toEqual([])
  })

  test("mirrors tags as well as branches", () => {
    declareMirror(ctx.alpha, ctx.alpha.mirror)
    shOk("git tag v1", ctx.alpha.work)
    afterMirror(ctx.alpha, () => pushMain(ctx.alpha))
    afterMirror(ctx.alpha, () => shOk("git push origin v1", ctx.alpha.work))

    expect(refsOf(ctx.alpha.mirror).some((ref) => ref.startsWith("refs/tags/v1"))).toBe(true)
  })

  test("prunes a branch at its own destination when the source drops it", () => {
    declareMirror(ctx.alpha, ctx.alpha.mirror)
    declareMirror(ctx.beta, ctx.beta.mirror)
    afterMirror(ctx.alpha, () => pushMain(ctx.alpha))
    afterMirror(ctx.alpha, () => shOk("git push origin HEAD:refs/heads/scratch", ctx.alpha.work))
    expect(refsOf(ctx.alpha.mirror)).toHaveLength(2)

    afterMirror(ctx.alpha, () => shOk("git push origin --delete scratch", ctx.alpha.work))

    expect(refsOf(ctx.alpha.mirror).map((ref) => ref.split(" ")[0])).toEqual(["refs/heads/main"])
    expect(refsOf(ctx.beta.mirror)).toEqual([])
  })
})

describe("post-receive mirror mode", () => {
  test("a snapshot mirrors the tree onto a lineage that starts here", () => {
    declareMirror(ctx.alpha, ctx.alpha.mirror)
    declareMode(ctx.alpha, "snapshot")
    shOk("git commit --allow-empty -m second", ctx.alpha.work)
    shOk("git commit --allow-empty -m third", ctx.alpha.work)

    afterMirror(ctx.alpha, () => pushMain(ctx.alpha))

    const behind = shOk("git -C . rev-list --count refs/heads/main", ctx.alpha.mirror).trim()
    expect(behind).toBe("1")
    const source = shOk("git rev-parse HEAD^{tree}", ctx.alpha.work).trim()
    const mirrored = shOk("git rev-parse refs/heads/main^{tree}", ctx.alpha.mirror).trim()
    expect(mirrored).toBe(source)
  })

  test("a second snapshot stands on the first rather than starting again", () => {
    declareMirror(ctx.alpha, ctx.alpha.mirror)
    declareMode(ctx.alpha, "snapshot")
    shOk("echo one > held.txt && git add held.txt && git commit -m held", ctx.alpha.work)
    afterMirror(ctx.alpha, () => pushMain(ctx.alpha))

    shOk("echo two > held.txt && git commit -am held-again", ctx.alpha.work)
    afterMirror(ctx.alpha, () => pushMain(ctx.alpha))

    expect(shOk("git -C . rev-list --count refs/heads/main", ctx.alpha.mirror).trim()).toBe("2")
    expect(shOk("git show refs/heads/main:held.txt", ctx.alpha.mirror).trim()).toBe("two")
  })

  test("a mode that is neither history nor snapshot is refused rather than guessed", () => {
    declareMirror(ctx.alpha, ctx.alpha.mirror)
    declareMode(ctx.alpha, "whatever")

    const res = pushMain(ctx.alpha)

    expect(res.stderr).toContain("neither history nor snapshot")
    expect(refsOf(ctx.alpha.mirror)).toEqual([])
  })
})

describe("post-receive hand-off", () => {
  test("the push returns while the mirror is still running", () => {
    declareMirror(ctx.alpha, "https://10.255.255.1/unroutable.git")

    const res = pushMain(ctx.alpha)

    expect(res.code).toBe(0)
    expect(stateOf(ctx.alpha)).toBe("")
  })
})
