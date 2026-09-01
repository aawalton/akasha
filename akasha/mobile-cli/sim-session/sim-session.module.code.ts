import { readFileSync, rmSync, writeFileSync } from "node:fs"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { expandTilde } from "@akasha/utils-fs/expand-tilde"
import { z } from "zod"

export const SIM_SESSION_PATH = "~/.mobile-sim-session.json"

export const WEBVIEW_BUNDLE_ID = "process-App"

const sessionStateSchema = z
  .object({
    sessionId: z.string().min(1),
    udid: z.string().min(1),
    appiumBase: z.string().min(1),
    webviewContext: z.string().nullable(),
    route: z.string().nullable(),
    startedAtMs: z.number().finite(),
  })
  .strict()

export type SimSessionState = z.infer<typeof sessionStateSchema>

export function formatSessionState(state: SimSessionState): string {
  return `${JSON.stringify(state, null, 2)}\n`
}

export function parseSessionState(raw: string): SimSessionState | null {
  try {
    const result = sessionStateSchema.safeParse(JSON.parse(raw))
    return result.success ? result.data : null
  } catch {
    return null
  }
}

export function saveSessionState(state: SimSessionState): undefined {
  writeFileSync(expandTilde(SIM_SESSION_PATH), formatSessionState(state), { mode: 0o600 })
}

export function loadSessionState(): SimSessionState | null {
  try {
    return parseSessionState(readFileSync(expandTilde(SIM_SESSION_PATH), "utf8"))
  } catch {
    return null
  }
}

export function requireSessionState(): SimSessionState {
  const state = loadSessionState()
  if (state === null) {
    throw new OperationalError(
      `no active sim session (${SIM_SESSION_PATH} absent). ` +
        "A session is recorded there only once the simulator is booted and the app is opened on a route."
    )
  }
  return state
}

export function clearSessionState(): undefined {
  rmSync(expandTilde(SIM_SESSION_PATH), { force: true })
}

export const WDA_LOCAL_PORT_ENV = "MOBILE_SIM_WDA_LOCAL_PORT"

export const DEFAULT_WDA_LOCAL_PORT = 8205

export function resolveWdaLocalPort(raw: string | undefined): number {
  if (raw === undefined || raw.trim() === "") return DEFAULT_WDA_LOCAL_PORT
  const parsed = z.coerce.number().int().min(1).max(65535).safeParse(raw.trim())
  if (!parsed.success) {
    throw new OperationalError(`${WDA_LOCAL_PORT_ENV}="${raw}" is not a valid TCP port (1–65535).`)
  }
  return parsed.data
}

export function buildBannerTapCapabilities(
  udid: string,
  wdaLocalPort: number,
  bundleId: string
): Record<string, unknown> {
  const { "appium:bundleId": appBound, ...rest } = buildSimCapabilities(
    udid,
    wdaLocalPort,
    bundleId
  )
  return rest
}

export function buildSimCapabilities(
  udid: string,
  wdaLocalPort: number,
  bundleId: string
): Record<string, unknown> {
  return {
    platformName: "iOS",
    "appium:automationName": "XCUITest",
    "appium:udid": udid,
    "appium:wdaLocalPort": wdaLocalPort,
    "appium:bundleId": bundleId,
    "appium:isHeadless": true,
    "appium:additionalWebviewBundleIds": [WEBVIEW_BUNDLE_ID],
    "appium:nativeWebTap": true,
    "appium:noReset": true,
    "appium:skipLogCapture": true,
  }
}
