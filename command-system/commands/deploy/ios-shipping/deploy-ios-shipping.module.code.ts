import { said } from "@akasha/git/git-running"
import { readKeychainPassword } from "@akasha/mobile-cli/foundation"
import { resolveRepoRoot } from "@akasha/mobile-cli/git-tree-hash"
import { acquireLocalCutLock, releaseLocalCutLock } from "@akasha/mobile-cli/local-cut-lock"
import { type MobileApp, resolveApp, shellRepoRoot } from "@akasha/mobile-cli/mobile-app"
import { runTestflightCut } from "@akasha/mobile-cli/testflight-cut"
import { codeRoot } from "@akasha/pages-system/code-root"
import type { Answer } from "../../../calling/calling.module.code.ts"
import { saidBy } from "../../../fault-saying/fault-saying.module.code.ts"

const INPUT = 1

const DATA = 2

const OPERATIONAL = 3

export const CONFIGURATION = "Release"

export const WHERE_HEAD_IS = "HEAD"

export const SHOWN_PATHS = 3

export const NO_UPLOAD_SAID =
  "upload\tskipped, so Apple validates the build and no tester is sent it"

export const UPLOAD_SAID =
  "upload\tcarried out, so every internal tester of this app is sent the build"

export function linesOf(said: readonly string[]): readonly string[] {
  return said
    .join("")
    .split("\n")
    .filter((one) => one.trim() !== "")
}

export function linesFor(
  slug: string,
  pagePath: string,
  noUpload: boolean,
  ref: string
): readonly string[] {
  return [
    `ios-app\t${slug}\t${pagePath}`,
    `build\t${CONFIGURATION}\tat ${ref}`,
    noUpload ? NO_UPLOAD_SAID : UPLOAD_SAID,
  ]
}

export function changedPaths(status: string): readonly string[] {
  return status
    .split("\n")
    .map((one) => one.slice(3).trim())
    .filter((one) => one !== "")
}

export function saidOfChanged(slug: string, changed: readonly string[]): string {
  const first = changed.slice(0, SHOWN_PATHS).join(", ")
  const rest = changed.length > SHOWN_PATHS ? `, and ${changed.length - SHOWN_PATHS} more` : ""
  const many = changed.length === 1 ? "file" : "files"
  return `the worktree holds ${changed.length} tracked ${many} differing from ${WHERE_HEAD_IS} (${first}${rest}), so the commit ${WHERE_HEAD_IS} is at is not what you are looking at, and building it would leave those changes out of the app without saying so. Name the commit to build: \`akasha deploy ${slug} --ref ${WHERE_HEAD_IS}\` builds what is committed, and committing first builds what you have.`
}

function trackedChanges(root: string): readonly string[] {
  return changedPaths(said(root, ["status", "--porcelain", "--untracked-files=no"]))
}

function rootsOf(app: MobileApp): readonly string[] {
  const code = resolveRepoRoot(codeRoot())
  const shell = resolveRepoRoot(shellRepoRoot(app))
  return shell === code ? [code] : [code, shell]
}

export async function shipIosApp(
  slug: string,
  pagePath: string,
  noUpload: boolean,
  named: string | null
): Promise<Answer> {
  const ref = named ?? WHERE_HEAD_IS
  const report = [...linesFor(slug, pagePath, noUpload, ref)]
  let app: MobileApp
  try {
    app = resolveApp(slug)
  } catch (err) {
    return { report, refusals: [saidBy(err)], code: DATA }
  }
  if (named === null) {
    let changed: readonly string[]
    try {
      changed = rootsOf(app).flatMap((root) => trackedChanges(root))
    } catch (err) {
      return { report, refusals: [saidBy(err)], code: OPERATIONAL }
    }
    if (changed.length > 0) {
      return { report, refusals: [saidOfChanged(slug, changed)], code: INPUT }
    }
  }
  let password: string
  try {
    password = readKeychainPassword()
  } catch (err) {
    return { report, refusals: [saidBy(err)], code: OPERATIONAL }
  }
  try {
    acquireLocalCutLock(Date.now(), process.pid)
  } catch (err) {
    return { report, refusals: [saidBy(err)], code: OPERATIONAL }
  }
  const spoken: string[] = []
  try {
    await runTestflightCut({
      app,
      configuration: CONFIGURATION,
      buildNumber: undefined,
      sync: true,
      wait: false,
      noUpload,
      password,
      ref,
      say: (text) => {
        spoken.push(text)
      },
    })
  } catch (err) {
    report.push(...linesOf(spoken))
    return { report, refusals: [saidBy(err)], code: OPERATIONAL }
  } finally {
    releaseLocalCutLock(process.pid)
  }
  report.push(...linesOf(spoken))
  report.push(
    noUpload
      ? `built\t${slug}\tarchived, exported, validated by Apple, and sent to nobody`
      : `built\t${slug}\tarchived, exported and uploaded to TestFlight`
  )
  return { report, refusals: [], code: 0 }
}
