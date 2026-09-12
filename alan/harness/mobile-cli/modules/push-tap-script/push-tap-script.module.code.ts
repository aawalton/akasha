const DEEP_LINK_PATH_KEY = "path"

export const PUSH_TAP_APNS_AT = "/var/tmp/ops-sim-push-tap.apns"

export interface ApnsPayload {
  readonly "Simulator Target Bundle": string
  readonly aps: {
    readonly alert: { readonly title: string; readonly body: string }
    readonly sound: string
  }
  readonly [DEEP_LINK_PATH_KEY]: string
}

export function buildApnsPayload(opts: {
  readonly bundleId: string
  readonly route: string
  readonly title?: string
  readonly body?: string
}): ApnsPayload {
  return {
    "Simulator Target Bundle": opts.bundleId,
    aps: {
      alert: { title: opts.title ?? "Tap probe", body: opts.body ?? opts.route },
      sound: "default",
    },
    [DEEP_LINK_PATH_KEY]: opts.route,
  }
}

function encodeApnsPayload(payload: ApnsPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64")
}

export function buildPushTapScript(opts: {
  readonly udid: string
  readonly bundleId: string
  readonly payload: ApnsPayload
  readonly cold: boolean
}): string {
  const encoded = encodeApnsPayload(opts.payload)
  const lines = ["set -e", `printf '%s' ${encoded} | base64 -d > ${PUSH_TAP_APNS_AT}`]
  if (opts.cold) {
    lines.push(`xcrun simctl terminate ${opts.udid} ${opts.bundleId} 2>&1 || true`)
    lines.push("sleep 2")
    lines.push(
      `if xcrun simctl spawn ${opts.udid} launchctl list 2>/dev/null | grep -q 'UIKitApplication:${opts.bundleId}'; then echo 'PRECONDITION: app still running'; exit 3; fi`
    )
    lines.push("echo 'PRECONDITION: app not running'")
  }
  lines.push(`xcrun simctl push ${opts.udid} ${opts.bundleId} ${PUSH_TAP_APNS_AT}`)
  return lines.join("\n")
}
