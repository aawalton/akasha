import {
  APPIUM_BASE,
  appiumReady,
} from "akasha/alan/harness/mobile-cli/modules/appium-client/appium-client.module.code.ts"
import { SCRIPT_HEADER } from "akasha/alan/harness/mobile-cli/modules/foundation/foundation.module.code.ts"
import { MACBOOK } from "akasha/alan/harness/mobile-cli/modules/macbook-target/macbook-target.module.code.ts"
import { runSshCapture } from "akasha/alan/harness/mobile-cli/modules/mobile-ssh/mobile-ssh.module.code.ts"
import { OperationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { quoted } from "akasha/code/shell/modules/quoting/quoting.module.code.ts"
import { requireMatchPositional } from "akasha/code/type/narrowing/modules/require-match-positional/require-match-positional.module.code.ts"
import { z } from "zod"

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

export function appiumStartedSaid(base: string): string {
  return `started the mac's Appium server at ${base}`
}

export function simBootedSaid(host: string): string {
  return `booted a simulator on ${host}, and nothing here shuts one down again`
}

export async function ensureAppium(done: string[] = []): Promise<string> {
  if (await appiumReady(APPIUM_BASE)) return APPIUM_BASE
  await runSshCapture(MACBOOK, buildStartAppiumScript())
  done.push(appiumStartedSaid(APPIUM_BASE))
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

export async function resolveAndBootSim(done: string[], preferredUdid?: string): Promise<string> {
  const out = await runSshCapture(MACBOOK, buildResolveAndBootSimScript(preferredUdid))
  done.push(simBootedSaid(MACBOOK.host))
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
