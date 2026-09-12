import {
  InputError,
  OperationalError,
} from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  type CutFingerprint,
  recordCutFingerprint,
} from "akasha/alan/harness/mobile-cli/cut-fingerprint/cut-fingerprint.module.code.ts"
import {
  KEYCHAIN_PASSWORD_SSH_ENV,
  readNativeShellApsEnv,
  readNativeShellHealthkitEnv,
  readNativeShellKokoroTtsEnv,
  readNativeShellWidgetEnv,
  readRingCredentialFor,
} from "akasha/alan/harness/mobile-cli/foundation/foundation.module.code.ts"
import {
  commitAt,
  computeBuildInputTreeHash,
  fetchedSaid,
  fetchOrigin,
  originReaches,
  resolveRepoRoot,
} from "akasha/alan/harness/mobile-cli/git-tree-hash/git-tree-hash.module.code.ts"
import { parseAssignedBuildNumber } from "akasha/alan/harness/mobile-cli/mac-build-serialization/mac-build-serialization.module.code.ts"
import { MACBOOK } from "akasha/alan/harness/mobile-cli/macbook-target/macbook-target.module.code.ts"
import {
  type MobileApp,
  shellRepoRoot,
} from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import {
  rsyncToHost,
  runSshResult,
} from "akasha/alan/harness/mobile-cli/mobile-ssh/mobile-ssh.module.code.ts"
import {
  ALTOOL_MARKERS,
  testflightFailureError,
} from "akasha/alan/harness/mobile-cli/modules/altool/altool.module.code.ts"
import {
  createAscJwtSource,
  fetchInternalBuildState,
  fetchLatestBuild,
  fetchMaxBuildVersion,
  resolveAppId,
} from "akasha/alan/harness/mobile-cli/modules/asc-client/asc-client.module.code.ts"
import { buildInputSources } from "akasha/alan/harness/mobile-cli/modules/build-input-sources/build-input-sources.module.code.ts"
import { STAMP_GATE_OK } from "akasha/alan/harness/mobile-cli/modules/build-stamp-gate/build-stamp-gate.module.code.ts"
import { simRunSharedRepoPaths } from "akasha/alan/harness/mobile-cli/sim-run-tree/sim-run-tree.module.code.ts"
import { buildTestflightDeployScript } from "akasha/alan/harness/mobile-cli/testflight-deploy-script/testflight-deploy-script.module.code.ts"
import {
  describeProcessingFailure,
  POLL_INTERVAL_MS,
  POLL_TIMEOUT_MS,
  pollBuildUntilTerminal,
  pollUntilTesterVisible,
  VISIBILITY_TIMEOUT_MS,
  visibilityFailureFor,
} from "akasha/alan/harness/mobile-cli/testflight-poll/testflight-poll.module.code.ts"
import {
  buildWwwAt,
  type WwwBuildResult,
} from "akasha/alan/harness/mobile-cli/www-build/www-build.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

export type Say = (text: string) => void

const toStdout: Say = (text) => {
  process.stdout.write(text)
}

const FILING_TRIES = 4

const FILING_BACKOFF_MS = [2_000, 5_000, 15_000] as const

type Recorder = (appSlug: string, fp: CutFingerprint, done: string[]) => Promise<void>

export function stagedToMacSaid(host: string, stagingRel: string): string {
  return `the www bundle was rsynced onto ${host} at ~/${stagingRel}, replacing what was there`
}

export function macRanSaid(host: string, noUpload: boolean): string {
  const did = noUpload
    ? "archived and exported there, and nothing was sent to Apple"
    : "archived, exported and uploaded, so a TestFlight build number may already be spent"
  return `the deploy script ran on ${host}, which checked out, ${did}`
}

export function cutRecordCall(appSlug: string, fp: CutFingerprint): string {
  const said = [
    "akasha mobile cut record",
    `--app ${appSlug}`,
    `--build-number ${fp.buildNumber}`,
    `--main-sha ${fp.mainSha}`,
    ...(fp.shellSha === null ? [] : [`--shell-sha ${fp.shellSha}`]),
    ...(fp.buildInputTreeHash === null ? [] : [`--build-input-tree-hash ${fp.buildInputTreeHash}`]),
    `--cut-at ${fp.cutAt}`,
  ]
  return said.join(" ")
}

export async function fileFingerprint(
  appSlug: string,
  fp: CutFingerprint,
  record: Recorder,
  sleep: (ms: number) => Promise<void> = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  say: Say = toStdout,
  done: string[] = []
): Promise<string | null> {
  let last = "nothing was tried"
  for (let attempt = 0; attempt < FILING_TRIES; attempt += 1) {
    try {
      await record(appSlug, fp, done)
      return null
    } catch (err) {
      last = err instanceof Error ? err.message : String(err)
      const wait = FILING_BACKOFF_MS[attempt]
      if (wait === undefined) break
      say(
        `! the cut fingerprint for build ${fp.buildNumber} did not file (${last}); trying again in ${
          wait / 1000
        }s\n`
      )
      await sleep(wait)
    }
  }
  return last
}

function elapsedSince(from: number): string {
  const seconds = Math.round((Date.now() - from) / 1000)
  if (seconds < 60) return `${seconds}s`
  return `${Math.floor(seconds / 60)}m${String(seconds % 60).padStart(2, "0")}s`
}

export async function runTestflightCut(
  done: string[],
  opts: {
    readonly app: MobileApp
    readonly configuration: string
    readonly buildNumber: number | undefined
    readonly sync: boolean
    readonly wait: boolean
    readonly noUpload: boolean
    readonly password: string
    readonly ref: string
    readonly say?: Say
  }
): Promise<undefined> {
  const { app, configuration, buildNumber, sync, wait, noUpload, password, ref } = opts
  const say = opts.say ?? toStdout
  const watched = opts.say === undefined
  const startedAt = Date.now()

  const codeRepoRoot = resolveRepoRoot(codeRoot())
  const shellRoot = resolveRepoRoot(shellRepoRoot(app))
  fetchOrigin(codeRepoRoot)
  done.push(fetchedSaid(codeRepoRoot))
  if (shellRoot !== codeRepoRoot) {
    fetchOrigin(shellRoot)
    done.push(fetchedSaid(shellRoot))
  }
  const pinned = (repoRoot: string, repoName: string): string => {
    const commit = commitAt(repoRoot, ref)
    if (commit === null) {
      throw new InputError(
        `--ref ${ref} names no commit in the ${repoName} repo at ${repoRoot}, so there is nothing to compile — name a branch, tag or sha that \`git rev-parse\` answers there`
      )
    }
    if (!originReaches(repoRoot, commit)) {
      throw new InputError(
        `--ref ${ref} is ${commit.slice(0, 12)} in the ${repoName} repo, which no origin ref reaches. The macbook builds by fetching origin into its own clone and checking that commit out there, so a commit only this workstation holds cannot be compiled — push it and re-run, or name a revision origin already carries`
      )
    }
    return commit
  }
  const mainSha = pinned(codeRepoRoot, "code")
  const cutCommit = pinned(shellRoot, "native shell")
  say(
    `Cut ships the shell at ${cutCommit.slice(0, 12)} over ${ref} at ${mainSha.slice(0, 12)}; binaries must carry the shell commit.\n`
  )

  const ascJwt = createAscJwtSource()

  let appId: string | undefined
  let ascFloor = 0
  try {
    appId = await resolveAppId(app.bundleId, await ascJwt())
    ascFloor = await fetchMaxBuildVersion(appId, await ascJwt())
  } catch (err) {
    if (wait) throw err
    say(
      `! could not read the App Store Connect build floor (${
        err instanceof Error ? err.message : String(err)
      }); relying on the durable mac counter\n`
    )
  }

  say(
    `${noUpload ? "Dry-run archive+export of" : "Cutting"} ${app.slug} (${app.bundleId}) ${configuration} TestFlight build (${
      buildNumber === undefined ? "auto-claimed number" : `build ${buildNumber}`
    }, asc floor ${ascFloor}, sync=${sync}${
      noUpload ? ", no-upload" : ""
    }) via ${MACBOOK.user}@${MACBOOK.host}…\n`
  )

  if (sync && app.wwwStageScript !== null) {
    const stagingRel = app.macWwwStagingRel
    if (stagingRel === null) {
      throw new OperationalError(
        `${app.slug} names a www stage script and no \`mac-www-staging-rel\`, so its page says nothing about where on the MacBook the build is staged`
      )
    }
    say(`Building www on the workstation at ${mainSha.slice(0, 12)} (${ref})…\n`)
    const wwwAt = Date.now()
    let built: WwwBuildResult
    try {
      built = await buildWwwAt(done, { app, ref: mainSha })
    } catch (err) {
      throw new OperationalError(
        `the workstation www build failed. It stopped before the MacBook, so no build number was spent there — but it had already written on this workstation, and what it wrote is named with this refusal (${
          err instanceof Error ? err.message : String(err)
        }). The stage script's own output is above — search the run for \`[stage-app]\` and read what follows it for the refusing gate and the modules it names.`
      )
    }
    say(
      `Staging www (main ${mainSha.slice(0, 12)}) → ${MACBOOK.user}@${MACBOOK.host}:~/${stagingRel}…\n`
    )
    await rsyncToHost(MACBOOK, built.wwwDir, stagingRel, { quiet: !watched })
    done.push(stagedToMacSaid(MACBOOK.host, stagingRel))
    say(`  www built and staged in ${elapsedSince(wwwAt)}\n`)
  }

  const script = buildTestflightDeployScript({
    app,
    configuration,
    sync,
    buildNumber,
    ascFloor,
    noUpload,
    nativeShellWidget: readNativeShellWidgetEnv(),
    nativeShellAps: readNativeShellApsEnv(),
    nativeShellHealthkit: readNativeShellHealthkitEnv(),
    nativeShellRingCredential: readRingCredentialFor(app),
    nativeShellKokoroTts: readNativeShellKokoroTtsEnv(),
    cutCommit,
  })
  const macAt = Date.now()
  const { stdout: out, code } = await runSshResult(MACBOOK, script, {
    stream: watched,
    quiet: !watched,
    sendEnv: { [KEYCHAIN_PASSWORD_SSH_ENV]: password },
  })
  done.push(macRanSaid(MACBOOK.host, noUpload))
  if (!watched) say(out.endsWith("\n") ? out : `${out}\n`)
  const macTook = elapsedSince(macAt)

  const successMarker = noUpload ? "MOBILE_DEPLOY_TESTFLIGHT_DRYRUN_OK" : ALTOOL_MARKERS.uploadOk
  const required = noUpload
    ? [STAMP_GATE_OK, ALTOOL_MARKERS.validateOk, successMarker]
    : [STAMP_GATE_OK, successMarker]
  const ok =
    code === 0 &&
    out.includes("** ARCHIVE SUCCEEDED **") &&
    required.every((marker) => out.includes(marker))
  if (!ok) {
    throw testflightFailureError(out)
  }
  say(`\n  macbook checkout to exported .ipa took ${macTook}\n`)

  if (noUpload) {
    const dryRunNumber = parseAssignedBuildNumber(out)
    say(
      `\n✓ ${configuration} archive + export + APP STORE VALIDATION passed (build ${
        dryRunNumber ?? "?"
      }, signed .ipa validated by Apple) — upload SKIPPED (--no-upload). No upload slot consumed.\n`
    )
    say(`  whole run: ${elapsedSince(startedAt)}\n`)
    return undefined
  }

  const assignedBuildNumber = parseAssignedBuildNumber(out)
  if (assignedBuildNumber === undefined) {
    throw new OperationalError(
      "TestFlight upload succeeded but the remote script emitted no MOBILE_DEPLOY_TESTFLIGHT_BUILD_NUMBER marker — cannot confirm the claimed build number"
    )
  }
  say(
    `\n✓ ${configuration} build ${assignedBuildNumber} uploaded to App Store Connect / TestFlight\n`
  )

  const fingerprint: CutFingerprint = {
    buildNumber: assignedBuildNumber,
    mainSha,
    shellSha: cutCommit,
    buildInputTreeHash: computeBuildInputTreeHash(
      buildInputSources(
        app,
        { root: codeRepoRoot, ref: mainSha },
        { root: shellRoot, ref: cutCommit },
        simRunSharedRepoPaths()
      )
    ),
    cutAt: new Date().toISOString(),
  }
  const filed = await fileFingerprint(
    app.slug,
    fingerprint,
    recordCutFingerprint,
    undefined,
    say,
    done
  )
  if (filed !== null) {
    say(
      `\n! the upload SUCCEEDED and build ${assignedBuildNumber} is at Apple. Only its fingerprint went unfiled.\n`
    )
    say(`  ${cutRecordCall(app.slug, fingerprint)}\n`)
    throw new OperationalError(
      `build ${assignedBuildNumber} uploaded, and its cut fingerprint was not filed after ${FILING_TRIES} tries, so \`akasha mobile cut status\` would answer against an older build without saying so: ${filed}. The upload is done — file the fingerprint with the \`akasha mobile cut record\` call printed above rather than cutting again.`
    )
  }
  say(`✓ recorded cut fingerprint (build ${assignedBuildNumber}, main ${cutCommit.slice(0, 12)})\n`)

  if (wait) {
    if (appId === undefined) {
      throw new OperationalError(
        "internal: App Store Connect app id unresolved for the --wait poll"
      )
    }
    const resolvedAppId = appId
    const targetVersion = String(assignedBuildNumber)
    say(
      `Polling App Store Connect for build ${targetVersion} every ${
        POLL_INTERVAL_MS / 1000
      }s, up to ${POLL_TIMEOUT_MS / 60_000} minutes…\n`
    )
    const outcome = await pollBuildUntilTerminal({
      fetchLatest: async () => fetchLatestBuild(resolvedAppId, await ascJwt()),
      isTarget: (build) => build.version === targetVersion,
      sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
      now: () => Date.now(),
      intervalMs: POLL_INTERVAL_MS,
      timeoutMs: POLL_TIMEOUT_MS,
      onTick: (message) => say(`  ${message}\n`),
    })
    if (outcome.kind === "failed") {
      throw new OperationalError(describeProcessingFailure(outcome.failure))
    }
    if (outcome.kind === "timeout") {
      throw new OperationalError(
        `Build still processing after ${POLL_TIMEOUT_MS / 60_000} minutes (last state: ${
          outcome.lastState ?? "not yet visible"
        }). The upload succeeded — check App Store Connect → TestFlight, or re-run \`akasha mobile testflight-status --wait\` to keep waiting.`
      )
    }
    say(
      `\n✓ build ${outcome.build.version} VALID — polling tester visibility every ${
        POLL_INTERVAL_MS / 1000
      }s, up to ${VISIBILITY_TIMEOUT_MS / 60_000} minutes…\n`
    )

    const validBuild = outcome.build
    const visibility = await pollUntilTesterVisible({
      fetchState: async () => fetchInternalBuildState(validBuild.id, await ascJwt()),
      sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
      now: () => Date.now(),
      intervalMs: POLL_INTERVAL_MS,
      timeoutMs: VISIBILITY_TIMEOUT_MS,
      onTick: (message) => say(`  ${message}\n`),
    })
    if (visibility.kind !== "visible") {
      const lastState = visibility.kind === "blocked" ? visibility.state : visibility.lastState
      throw new OperationalError(
        describeProcessingFailure(visibilityFailureFor(validBuild, lastState))
      )
    }
    say(
      `\n✓ build ${validBuild.version} VALID and tester-visible (${visibility.state}), ready to install\n`
    )
  }
  say(`  whole run: ${elapsedSince(startedAt)}\n`)
  return undefined
}
