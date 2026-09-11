import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { buildInputSources } from "akasha/alan/harness/mobile-cli/build-input-sources/build-input-sources.module.code.ts"
import {
  ABSENT_OBJECT,
  computeBuildInputTreeHash,
  objectIdAt,
} from "akasha/alan/harness/mobile-cli/git-tree-hash/git-tree-hash.module.code.ts"
import type { MobileApp } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { said } from "akasha/utils/run/running/running.module.code.ts"

const SCRATCH = "/var/tmp"

const APP: MobileApp = {
  slug: "example",
  pagePath: "akasha:pages/ios-app/example-ios.ios-app.md",
  displayName: "Example",
  bundleId: "com.example.app",
  widgetBundleId: null,
  developmentTeam: "TEAM123456",
  nativeShellRepoPath: "akasha:native-shell/example",
  simBuildScript: null,
  syncScript: null,
  wwwStageScript: null,
  spaSourceRepoPath: null,
  webEnvSegments: null,
  ascCapabilities: [],
  toolReached: [],
  appProfileName: "example app App Store",
  widgetProfileName: null,
  macBuildLockDir: "$HOME/.lock",
  macBuildNumberFile: "$HOME/.build-number",
  macWwwStagingRel: null,
  defaultDeviceUdid: null,
}

function makeRepo(layout: Record<string, string>): { root: string; cleanup: () => void } {
  const dir = mkdtempSync(join(SCRATCH, "build-input-hash-"))
  for (const [path, contents] of Object.entries(layout)) {
    const abs = join(dir, path)
    mkdirSync(resolve(abs, ".."), { recursive: true })
    writeFileSync(abs, contents)
  }
  said(["git", "init", "-q", "-b", "main"], { cwd: dir })
  said(["git", "config", "user.email", "test@local"], { cwd: dir })
  said(["git", "config", "user.name", "test"], { cwd: dir })
  said(["git", "config", "commit.gpgsign", "false"], { cwd: dir })
  said(["git", "add", "-A"], { cwd: dir })
  said(["git", "commit", "-q", "-m", "init"], { cwd: dir })
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
    "agent/seat/somebody.seat.md": "outside the shell tree\n",
  })
}

function commitEdit(root: string, path: string, contents: string): undefined {
  writeFileSync(join(root, path), contents)
  said(["git", "add", "-A"], { cwd: root })
  said(["git", "commit", "-q", "-m", `edit ${path}`], { cwd: root })
  return undefined
}

const SHARED: readonly string[] = []

function hashOf(codeRoot: string, shellRoot: string): string {
  const code = { root: codeRoot, ref: "HEAD" }
  const shell = { root: shellRoot, ref: "HEAD" }
  return computeBuildInputTreeHash(buildInputSources(APP, code, shell, SHARED))
}

function bothRepos(): { codeRoot: string; shellRoot: string; cleanup: () => void } {
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

describe("computeBuildInputTreeHash — build-input closure scope", () => {
  test("the same two trees hash alike twice, so nothing outside the closure leaks in", () => {
    const { codeRoot, shellRoot, cleanup } = bothRepos()
    try {
      expect(hashOf(codeRoot, shellRoot)).toBe(hashOf(codeRoot, shellRoot))
    } finally {
      cleanup()
    }
  })

  test("a change in the code closure changes the hash", () => {
    const { codeRoot, shellRoot, cleanup } = bothRepos()
    try {
      const before = hashOf(codeRoot, shellRoot)
      commitEdit(codeRoot, "packages/shared/pages/ui/skeleton.ts", "export const skeleton = 2\n")
      expect(hashOf(codeRoot, shellRoot)).not.toBe(before)
    } finally {
      cleanup()
    }
  })

  test("a change to the shell itself changes the hash, though the shell is another repo", () => {
    const { codeRoot, shellRoot, cleanup } = bothRepos()
    try {
      const before = hashOf(codeRoot, shellRoot)
      commitEdit(
        shellRoot,
        "native-shell/example/scripts/apply-ios-seam.sh",
        "#!/usr/bin/env bash\ntrue\n"
      )
      expect(hashOf(codeRoot, shellRoot)).not.toBe(before)
    } finally {
      cleanup()
    }
  })

  test("a file outside both closures does not change the hash, in either repo", () => {
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
})

describe("objectIdAt", () => {
  test("a path absent at the ref answers the literal string absent", () => {
    const { root, cleanup } = makeCodeRepo()
    try {
      expect(objectIdAt(root, "HEAD", "nothing/is/here.ts")).toBe(ABSENT_OBJECT)
    } finally {
      cleanup()
    }
  })

  test("a path present at the ref answers that path's object id instead", () => {
    const { root, cleanup } = makeCodeRepo()
    try {
      expect(objectIdAt(root, "HEAD", "bun.lock")).toMatch(/^[0-9a-f]{40}$/)
    } finally {
      cleanup()
    }
  })
})
