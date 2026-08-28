import { expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { help } from "./mv.command.code.attachment.ts"

const SCRATCH = "/var/tmp"

const ENTRY = `${import.meta.dir}/mv.command.code.attachment.ts`

interface Ran {
  readonly code: number
  readonly said: string
}

function scratchRepo(): string {
  const at = mkdtempSync(`${SCRATCH}/mv-`)
  execFileSync("git", ["-C", at, "init", "-q"])
  return at
}

function akashaScratchRepo(): string {
  const at = scratchRepo()
  mkdirSync(`${at}/pages/repo`, { recursive: true })
  writeFileSync(`${at}/pages/repo/akasha-repo.repo.md`, "---\nslug: akasha-repo\n---\n")
  writeFileSync(`${at}/pages/repo/code-editor-repo.repo.md`, "---\nslug: code-editor-repo\n---\n")
  return at
}

function moving(env: Record<string, string>, cwd: string, args: readonly string[]): Ran {
  const ran = Bun.spawnSync({
    cmd: [process.execPath, ENTRY, ...args],
    cwd,
    env: { ...process.env, ...env },
    stdout: "pipe",
    stderr: "pipe",
  })
  return { code: ran.exitCode ?? -1, said: ran.stderr.toString() + ran.stdout.toString() }
}

function inOneRepo(body: (root: string, run: (args: readonly string[]) => Ran) => void): void {
  const root = scratchRepo()
  try {
    body(root, (args) => moving({ CODE_EDITOR_ROOT: root }, root, args))
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

test("the surface names both sides of a pair and the run that lands nothing", () => {
  const named = help.flags.map((one) => one.name)
  expect(named).toContain("--from")
  expect(named).toContain("--to")
  expect(named).toContain("--dry-run")
})

test("naming no pair is refused rather than treated as moving nothing", () => {
  inOneRepo((_root, run) => {
    const ran = run(["--dry-run"])
    expect(ran.code).toBe(1)
    expect(ran.said).toContain("name at least one pair")
  })
})

test("a --from with no --to is refused rather than half-read", () => {
  inOneRepo((root, run) => {
    writeFileSync(`${root}/a.md`, "# A\n")
    const ran = run(["--from", "a.md"])
    expect(ran.code).toBe(1)
    expect(ran.said).toContain("has no --to")
  })
})

test("a source that is not there is refused rather than treated as already-moved", () => {
  inOneRepo((_root, run) => {
    const ran = run(["--from", "gone.md", "--to", "here.md"])
    expect(ran.code).toBe(1)
    expect(ran.said).toContain("does not exist")
  })
})

test("a destination that already exists is refused, because a move never overwrites", () => {
  inOneRepo((root, run) => {
    writeFileSync(`${root}/a.md`, "# A\n")
    writeFileSync(`${root}/b.md`, "# B\n")
    const ran = run(["--from", "a.md", "--to", "b.md"])
    expect(ran.code).toBe(1)
    expect(ran.said).toContain("already exists")
  })
})

test("a chain is refused, because which body ends where would be decided by order", () => {
  inOneRepo((root, run) => {
    writeFileSync(`${root}/a.md`, "# A\n")
    writeFileSync(`${root}/b.md`, "# B\n")
    const ran = run(["--from", "a.md", "--to", "b.md", "--from", "b.md", "--to", "c.md"])
    expect(ran.code).toBe(1)
    expect(ran.said).toContain("both a destination and a source")
  })
})

test("a pair naming itself on both sides is refused, since it asks for no move", () => {
  inOneRepo((root, run) => {
    writeFileSync(`${root}/a.md`, "# A\n")
    const ran = run(["--from", "a.md", "--to", "a.md"])
    expect(ran.code).toBe(1)
    expect(ran.said).toContain("asks for no move")
  })
})

test("a file of a kind stating `binary: true` is carried, its bytes never read as text", () => {
  inOneRepo((root, run) => {
    writeFileSync(`${root}/a.png`, Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]))
    execFileSync("git", ["-C", root, "add", "-f", "--", "a.png"])
    const ran = run(["--from", "a.png", "--to", "b.png", "--dry-run"])
    expect(ran.said).toContain("a.png  carried to b.png")
    expect(ran.code).toBe(0)
  })
})

test("a NUL byte in a file of a kind stating no such thing is refused, not passed over", () => {
  inOneRepo((root, run) => {
    writeFileSync(`${root}/a.md`, `# A${String.fromCharCode(0)}\n`)
    execFileSync("git", ["-C", root, "add", "-f", "--", "a.md"])
    const ran = run(["--from", "a.md", "--to", "b.md", "--dry-run"])
    expect(ran.code).toBe(1)
    expect(ran.said).toContain("holds a NUL byte")
  })
})

test("sources standing in two repos are refused, one side of a move addressing one repo", () => {
  const source = akashaScratchRepo()
  const destination = scratchRepo()
  try {
    writeFileSync(`${source}/a.md`, "# A\n")
    writeFileSync(`${destination}/b.md`, "# B\n")
    const ran = moving({ AKASHA_ROOT: source, CODE_EDITOR_ROOT: destination }, source, [
      "--from",
      `${source}/a.md`,
      "--to",
      `${destination}/x.md`,
      "--from",
      `${destination}/b.md`,
      "--to",
      `${destination}/y.md`,
    ])
    expect(ran.code).toBe(1)
    expect(ran.said).toContain("a call lands in one repo")
  } finally {
    rmSync(destination, { recursive: true, force: true })
    rmSync(source, { recursive: true, force: true })
  }
})
