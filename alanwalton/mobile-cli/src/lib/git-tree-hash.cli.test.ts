import { describe, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"

import { buildInputSources } from "./build-inputs"
import type { MobileApp } from "./apps"
import { compareCutStatus } from "./cut-fingerprint"
import { computeBuildInputTreeHash } from "./git-tree-hash"

const SCRATCH = "/var/tmp"

const APP = {
  slug: "example",
  nativeShellRepoPath: "akasha:native-shell/example",
} as unknown as MobileApp

function makeRepo(layout: Record<string, string>): { root: string; cleanup: () => void } {
  const dir = mkdtempSync(join(SCRATCH, "build-input-hash-"))
  for (const [path, contents] of Object.entries(layout)) {
    const abs = join(dir, path)
    mkdirSync(resolve(abs, ".."), { recursive: true })
    writeFileSync(abs, contents)
  }
  execFileSync("git", ["init", "-q", "-b", "main"], { cwd: dir })
  execFileSync("git", ["config", "user.email", "test@local"], { cwd: dir })
  execFileSync("git", ["config", "user.name", "test"], { cwd: dir })
  execFileSync("git", ["add", "-A"], { cwd: dir })
  execFileSync("git", ["commit", "-q", "-m", "init"], { cwd: dir })
  return { root: dir, cleanup: () => rmSync(dir, { recursive: true, force: true }) }
}

function makeCodeRepo(): { root: string; cleanup: () => void } {
  return makeRepo({
    "package.json": '{"name":"root"}\n',
    "bun.lock": "lockfile-v1\n",
    "tsconfig.base.json": "{}\n",
    "bunfig.toml": "[install]\n",
    "packages/shared/pages/ui/skeleton.ts": "export const skeleton = 1\n",
    "packages/alanwalton/web/app-capacitor/root.tsx": "export const root = 1\n",
    "notes.md": "outside the build-input closure\n",
  })
}

function makeShellRepo(): { root: string; cleanup: () => void } {
  return makeRepo({
    "native-shell/example/package.json": '{"name":"@example/native-shell"}\n',
    "native-shell/example/scripts/apply-ios-seam.sh": "#!/usr/bin/env bash\n",
    "ios-seam/build-stamp.sh": "#!/usr/bin/env bash\n",
    "ios-widget/ring/Ring.swift": "struct Ring {}\n",
    "agent/seat/somebody.seat.md": "outside the shell tree\n",
  })
}

function commitEdit(root: string, path: string, contents: string): undefined {
  writeFileSync(join(root, path), contents)
  execFileSync("git", ["add", "-A"], { cwd: root })
  execFileSync("git", ["commit", "-q", "-m", `edit ${path}`], { cwd: root })
  return undefined
}

function commitRemoval(root: string, path: string): undefined {
  execFileSync("git", ["rm", "-q", path], { cwd: root })
  execFileSync("git", ["commit", "-q", "-m", `remove ${path}`], { cwd: root })
  return undefined
}

function hashOf(codeRoot: string, shellRoot: string): string {
  return computeBuildInputTreeHash(
    buildInputSources(
      APP,
      { root: codeRoot, ref: "HEAD" },
      { root: shellRoot, ref: "HEAD" }
    )
  )
}

function bothRepos(): {
  codeRoot: string
  shellRoot: string
  cleanup: () => void
} {
  const code = makeCodeRepo()
  const shell = makeShellRepo()
  return {
    codeRoot: code.root,
    shellRoot: shell.root,
    cleanup: () => {
      code.cleanup()
      shell.cleanup()
    },
  }
}

function owedAfter(before: string, after: string): boolean {
  const cut = {
    buildNumber: 104,
    mainSha: "cut-sha",
    shellSha: "shell-cut-sha",
    buildInputTreeHash: before,
    cutAt: "2026-07-11T14:00:00.000Z",
  }
  return compareCutStatus(cut, { mainSha: "main-sha", buildInputTreeHash: after }).owed
}

describe("computeBuildInputTreeHash — build-input closure scope", () => {
  test("a change in the code closure AFTER a recorded fingerprint flips cut-status to OWED", () => {
    const { codeRoot, shellRoot, cleanup } = bothRepos()
    try {
      const before = hashOf(codeRoot, shellRoot)
      expect(owedAfter(before, before)).toBe(false)
      commitEdit(codeRoot, "packages/shared/pages/ui/skeleton.ts", "export const skeleton = 2\n")
      const after = hashOf(codeRoot, shellRoot)
      expect(after).not.toBe(before)
      expect(owedAfter(before, after)).toBe(true)
    } finally {
      cleanup()
    }
  })

  test("a change to the shell itself flips cut-status to OWED, though it is in another repo", () => {
    const { codeRoot, shellRoot, cleanup } = bothRepos()
    try {
      const before = hashOf(codeRoot, shellRoot)
      commitEdit(shellRoot, "native-shell/example/scripts/apply-ios-seam.sh", "#!/usr/bin/env bash\ntrue\n")
      const after = hashOf(codeRoot, shellRoot)
      expect(after).not.toBe(before)
      expect(owedAfter(before, after)).toBe(true)
    } finally {
      cleanup()
    }
  })

  test("a change to the seam both shells source flips cut-status to OWED", () => {
    const { codeRoot, shellRoot, cleanup } = bothRepos()
    try {
      const before = hashOf(codeRoot, shellRoot)
      commitEdit(shellRoot, "ios-seam/build-stamp.sh", "#!/usr/bin/env bash\ntrue\n")
      expect(hashOf(codeRoot, shellRoot)).not.toBe(before)
    } finally {
      cleanup()
    }
  })

  test("a change to the shared ring widget flips cut-status to OWED", () => {
    const { codeRoot, shellRoot, cleanup } = bothRepos()
    try {
      const before = hashOf(codeRoot, shellRoot)
      commitEdit(shellRoot, "ios-widget/ring/Ring.swift", "struct Ring { let width = 1 }\n")
      expect(hashOf(codeRoot, shellRoot)).not.toBe(before)
    } finally {
      cleanup()
    }
  })

  test("a file OUTSIDE both closures does NOT flip the hash, in either repo", () => {
    const { codeRoot, shellRoot, cleanup } = bothRepos()
    try {
      const before = hashOf(codeRoot, shellRoot)
      commitEdit(codeRoot, "notes.md", "still outside the closure — reworded\n")
      commitEdit(shellRoot, "agent/seat/somebody.seat.md", "still outside the shell tree\n")
      expect(hashOf(codeRoot, shellRoot)).toBe(before)
    } finally {
      cleanup()
    }
  })

  test("a build input that GOES changes the hash, rather than dropping out of it", () => {
    const { codeRoot, shellRoot, cleanup } = bothRepos()
    try {
      const before = hashOf(codeRoot, shellRoot)
      commitRemoval(shellRoot, "ios-seam/build-stamp.sh")
      expect(hashOf(codeRoot, shellRoot)).not.toBe(before)
    } finally {
      cleanup()
    }
  })
})
