import { OperationalError } from "@akasha/errors-core/exit-code"
import { quoted } from "@akasha/shell/quoting"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"
import { APPIUM_BASE, appiumReady } from "../appium-client/appium-client.module.code.ts"
import {
  appValueExports,
  MAC_PATH_PREFIX,
  SCRIPT_HEADER,
} from "../foundation/foundation.module.code.ts"
import { MACBOOK } from "../macbook-target/macbook-target.module.code.ts"
import type { MobileApp } from "../mobile-app/mobile-app.module.code.ts"
import { runSshCapture } from "../mobile-ssh/mobile-ssh.module.code.ts"

const APPIUM_START_ATTEMPTS = 40
const APPIUM_START_DELAY_MS = 1_500

export function buildStartAppiumScript(): string {
  return [
    SCRIPT_HEADER,
    "nohup appium --address 0.0.0.0 --port 4723 --relaxed-security " +
      ">/tmp/appium.log 2>&1 </dev/null &",
    "disown || true",
    'echo "APPIUM_STARTED"',
  ].join("\n")
}

export function buildResolveAndBootSimScript(preferredUdid?: string): string {
  const pref = preferredUdid !== undefined && preferredUdid !== "" ? preferredUdid : ""
  return [
    SCRIPT_HEADER,
    `PREF=${quoted(pref)}`,
    'SIM_UDID="$PREF"',
    'if [ -z "$SIM_UDID" ]; then',
    '  SIM_UDID="$(xcrun simctl list devices booted -j | python3 -c \'import sys,json; d=json.load(sys.stdin)["devices"]; ids=[x["udid"] for v in d.values() for x in v if x.get("state")=="Booted"]; print(ids[0] if ids else "")\')"',
    "fi",
    'if [ -z "$SIM_UDID" ]; then',
    '  SIM_UDID="$(xcrun simctl list devices available -j | python3 -c \'import sys,json; d=json.load(sys.stdin)["devices"]; ids=[x["udid"] for k,v in d.items() if "iOS" in k for x in v if "iPhone" in x.get("name","")]; print(ids[0] if ids else "")\')"',
    "fi",
    '[ -n "$SIM_UDID" ] || { echo "ERROR: no simulator udid resolved" >&2; exit 1; }',
    'xcrun simctl bootstatus "$SIM_UDID" -b >/dev/null 2>&1 || xcrun simctl boot "$SIM_UDID"',
    'echo "SIM_UDID=$SIM_UDID"',
  ].join("\n")
}

export function parseResolvedUdid(stdout: string): string {
  try {
    const [udid] = requireMatchPositional(
      /SIM_UDID=([0-9A-Fa-f-]{8,})/,
      z.tuple([z.string()]),
      stdout
    )
    return udid
  } catch {
    throw new OperationalError("could not resolve a simulator udid from the macbook")
  }
}

export function buildInstallScript(opts: {
  readonly app: MobileApp
  readonly buildSimSource: string
  readonly nativeShellDir: string
  readonly stampCommit: string
  readonly udid?: string
  readonly configuration?: string
  readonly stagedWwwDir?: string
}): string {
  const exports: string[] = [
    MAC_PATH_PREFIX,
    `export NATIVE_SHELL_DIR="${opts.nativeShellDir}"`,
    `export NATIVE_SHELL_STAMP_COMMIT=${quoted(opts.stampCommit)}`,
    ...appValueExports(opts.app),
  ]
  if (opts.udid !== undefined && opts.udid !== "") {
    exports.push(`export SIM_UDID=${quoted(opts.udid)}`)
  }
  if (opts.configuration !== undefined && opts.configuration !== "") {
    exports.push(`export CONFIGURATION=${quoted(opts.configuration)}`)
  }
  if (opts.stagedWwwDir !== undefined && opts.stagedWwwDir !== "") {
    exports.push(`export STAGED_WWW_DIR="${opts.stagedWwwDir}"`)
  }
  return `${exports.join("\n")}\n${opts.buildSimSource}`
}

export function parseInstalledUdid(stdout: string): string {
  try {
    const [udid] = requireMatchPositional(
      /BUILD_SIM_OK[^\n]*udid=([0-9A-Fa-f-]{8,})/,
      z.tuple([z.string()]),
      stdout
    )
    return udid
  } catch {
    throw new OperationalError(
      "build-sim.sh did not report BUILD_SIM_OK (the build or install failed)"
    )
  }
}

export async function ensureAppium(): Promise<string> {
  if (await appiumReady(APPIUM_BASE)) return APPIUM_BASE
  await runSshCapture(MACBOOK, buildStartAppiumScript())
  for (let attempt = 0; attempt < APPIUM_START_ATTEMPTS; attempt++) {
    await Bun.sleep(APPIUM_START_DELAY_MS)
    if (await appiumReady(APPIUM_BASE)) return APPIUM_BASE
  }
  throw new OperationalError(
    `Appium did not become ready within ${Math.round(
      (APPIUM_START_ATTEMPTS * APPIUM_START_DELAY_MS) / 1000
    )}s after start (see /tmp/appium.log on ${MACBOOK.host}).`
  )
}

export async function resolveAndBootSim(preferredUdid?: string): Promise<string> {
  const out = await runSshCapture(MACBOOK, buildResolveAndBootSimScript(preferredUdid))
  return parseResolvedUdid(out)
}

export async function stopAppium(): Promise<void> {
  await runSshCapture(
    MACBOOK,
    [SCRIPT_HEADER, "pkill -f 'appium --address' || true", 'echo "APPIUM_STOPPED"'].join("\n")
  )
}

export async function appiumIsUp(): Promise<boolean> {
  return appiumReady(APPIUM_BASE)
}
