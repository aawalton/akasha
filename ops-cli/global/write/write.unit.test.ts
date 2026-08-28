import { expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"

const SCRATCH = "/var/tmp"

const ENTRY = `${import.meta.dir}/write.command.code.attachment.ts`

interface Ran {
  readonly code: number
  readonly said: string
}

function scratchRepo(): string {
  const at = mkdtempSync(`${SCRATCH}/write-remove-`)
  const git = (...args: string[]) => execFileSync("git", ["-C", at, ...args])
  git("init", "-q", "-b", "main")
  git("config", "user.email", "a@b.c")
  git("config", "user.name", "t")
  return at
}

function committed(root: string, rel: string, body: string): void {
  writeFileSync(`${root}/${rel}`, body)
  execFileSync("git", ["-C", root, "add", "--", rel])
  execFileSync("git", ["-C", root, "commit", "-qm", `hold ${rel}`])
}

// A REMOVAL-ONLY CALL READS NO PAYLOAD, and stdin that is neither a terminal nor empty is refused
// rather than dropped, so these runs are given one carrying nothing.
function writing(root: string, args: readonly string[]): Ran {
  const ran = Bun.spawnSync({
    cmd: [process.execPath, ENTRY, ...args],
    cwd: root,
    env: { ...process.env, CODE_EDITOR_ROOT: root },
    stdin: "ignore",
    stdout: "pipe",
    stderr: "pipe",
  })
  return { code: ran.exitCode ?? -1, said: ran.stderr.toString() + ran.stdout.toString() }
}

function inOneRepo(body: (root: string, run: (args: readonly string[]) => Ran) => void): void {
  const root = scratchRepo()
  try {
    body(root, (args) => writing(root, args))
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

test("a removal of a path standing in the worktree is taken", () => {
  inOneRepo((root, run) => {
    committed(root, "was.txt", "body\n")
    const ran = run(["--remove", "was.txt", "--dry-run"])
    expect(ran.code).toBe(0)
    expect(ran.said).toContain("1 removed")
  })
})

// THE PATCH THIS BUILDS IS AGAINST HEAD, where a path deleted from the worktree and never committed
// plainly stands, so the commit taking it away is the one thing that lands that deletion. Refusing
// it leaves the only route that lands it outside the one write path.
test("a removal of a path the worktree has lost while HEAD still holds it is taken", () => {
  inOneRepo((root, run) => {
    committed(root, "was.txt", "body\n")
    rmSync(`${root}/was.txt`)
    const ran = run(["--remove", "was.txt", "--dry-run"])
    expect(ran.code).toBe(0)
    expect(ran.said).toContain("1 removed")
  })
})

test("a removal of a path neither the worktree nor git holds is refused", () => {
  inOneRepo((root, run) => {
    committed(root, "was.txt", "body\n")
    const ran = run(["--remove", "never.txt", "--dry-run"])
    expect(ran.code).toBe(1)
    expect(ran.said).toContain("would take nothing away")
  })
})

// `ls-tree HEAD` EXITS NON-ZERO WHERE NO COMMIT STANDS, which is the true answer that HEAD holds
// nothing rather than a fault. Read as `held`, it would stop the refusal above from firing at all.
test("a repository holding no commit still refuses a path it never held", () => {
  inOneRepo((_root, run) => {
    const ran = run(["--remove", "never.txt", "--dry-run"])
    expect(ran.code).toBe(1)
    expect(ran.said).toContain("would take nothing away")
  })
})
