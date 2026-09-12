import {
  readKeychainPassword,
  readRingCredentialFor,
} from "akasha/alan/harness/mobile-cli/foundation/foundation.module.code.ts"
import { resolveRepoRoot } from "akasha/alan/harness/mobile-cli/git-tree-hash/git-tree-hash.module.code.ts"
import {
  acquireLocalCutLock,
  releaseLocalCutLock,
} from "akasha/alan/harness/mobile-cli/local-cut-lock/local-cut-lock.module.code.ts"
import {
  type MobileApp,
  resolveApp,
  shellRepoRoot,
} from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { runTestflightCut } from "akasha/alan/harness/mobile-cli/testflight-cut/testflight-cut.module.code.ts"
import {
  DATA,
  OK,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { pushBranch } from "akasha/git/pushing/git-pushing.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

export const CONFIGURATION = "Release"

export const NO_UPLOAD_SAID =
  "upload\tskipped, so Apple validates the build and no tester is sent it"

export const UPLOAD_SAID =
  "upload\tcarried out, so every internal tester of this app is sent the build"

export function linesOf(chunks: readonly string[]): readonly string[] {
  return chunks
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

export function saidOfUnpushed(root: string, ref: string): string {
  return `the branch ${root} is on could not be pushed, and the macbook builds by fetching origin into its own clone, so ${ref} cannot be compiled until that push lands`
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
  ref: string
): Promise<Answer> {
  const report = [...linesFor(slug, pagePath, noUpload, ref)]
  let app: MobileApp
  try {
    app = resolveApp(slug)
  } catch (err) {
    return { report, refusals: [saidBy(err)], code: DATA }
  }
  try {
    readRingCredentialFor(app)
  } catch (err) {
    return { report, refusals: [saidBy(err)], code: OPERATIONAL }
  }
  let roots: readonly string[]
  try {
    roots = rootsOf(app)
  } catch (err) {
    return { report, refusals: [saidBy(err)], code: OPERATIONAL }
  }
  for (const root of roots) {
    const pushed = pushBranch(root)
    report.push(pushed.line)
    if (pushed.failed) {
      return { report, refusals: [saidOfUnpushed(root, ref)], code: OPERATIONAL }
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
  return { report, refusals: [], code: OK }
}
