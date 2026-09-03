import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { said } from "@akasha/utils-run/running"
import { buildInputSources } from "../build-input-sources/build-input-sources.module.code.ts"
import type { MobileApp } from "../mobile-app/mobile-app.module.code.ts"
import { computeBuildInputTreeHash } from "./git-tree-hash.module.code.ts"

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
  wwwStageScript: null,
  spaSourceRepoPath: null,
  webEnvSegments: null,
  ascCapabilities: [],
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
    "akasha/code-system/ios-app/shell-scripts/build-stamp.sh": "#!/usr/bin/env bash\n",
    "akasha/code-system/ios-component/ios-components/ring/Ring.swift": "struct Ring {}\n",
    "akasha/code-system/ios-program/ios-programs/example.ts": "export const example = 1\n",
    "agent/seat/somebody.seat.md": "outside the shell tree\n",
  })
}

function commitEdit(root: string, path: string, contents: string): undefined {
  writeFileSync(join(root, path), contents)
  said(["git", "add", "-A"], { cwd: root })
  said(["git", "commit", "-q", "-m", `edit ${path}`], { cwd: root })
  return undefined
}

function commitRemoval(root: string, path: string): undefined {
  said(["git", "rm", "-q", path], { cwd: root })
  said(["git", "commit", "-q", "-m", `remove ${path}`], { cwd: root })
  return undefined
}

function hashOf(codeRoot: string, shellRoot: string): string {
  return computeBuildInputTreeHash(
    buildInputSources(APP, { root: codeRoot, ref: "HEAD" }, { root: shellRoot, ref: "HEAD" })
  )
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

  test("a change to the seam scripts every shell shares changes the hash", () => {
    const { codeRoot, shellRoot, cleanup } = bothRepos()
    try {
      const before = hashOf(codeRoot, shellRoot)
      commitEdit(
        shellRoot,
        "akasha/code-system/ios-app/shell-scripts/build-stamp.sh",
        "#!/usr/bin/env bash\ntrue\n"
      )
      expect(hashOf(codeRoot, shellRoot)).not.toBe(before)
    } finally {
      cleanup()
    }
  })

  test("a change to the shared ring component changes the hash", () => {
    const { codeRoot, shellRoot, cleanup } = bothRepos()
    try {
      const before = hashOf(codeRoot, shellRoot)
      commitEdit(
        shellRoot,
        "akasha/code-system/ios-component/ios-components/ring/Ring.swift",
        "struct Ring { let width = 1 }\n"
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

  test("a build input that goes changes the hash rather than dropping out of it", () => {
    const { codeRoot, shellRoot, cleanup } = bothRepos()
    try {
      const before = hashOf(codeRoot, shellRoot)
      commitRemoval(shellRoot, "akasha/code-system/ios-app/shell-scripts/build-stamp.sh")
      expect(hashOf(codeRoot, shellRoot)).not.toBe(before)
    } finally {
      cleanup()
    }
  })
})
