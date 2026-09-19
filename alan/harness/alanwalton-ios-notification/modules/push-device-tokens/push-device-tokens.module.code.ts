import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  ALERT,
  deviceTokensFor,
  dropDeviceToken,
  LIVE_ACTIVITY,
} from "akasha/person/modules/device-token-registration/device-token-registration.module.code.ts"

const ON_THE_WORKSTATION = "http://127.0.0.1:8787"

export interface DeviceToken {
  readonly deviceToken: string
  readonly bundleId: string
}

const LIVE_ACTIVITY_TOPIC_SUFFIX = ".push-type.liveactivity"

export function liveActivityTopic(bundleId: string): string {
  return `${bundleId}${LIVE_ACTIVITY_TOPIC_SUFFIX}`
}

function originNamed(): boolean {
  const said = optionalEnv("PAGES_SERVICE_ORIGIN") ?? optionalEnv("PAGE_STORE_ORIGIN")
  return said !== undefined
}

export const onTheWorkstation: Fetcher = (url, init) => {
  if (originNamed()) return fetch(url, init)
  const at = new URL(url)
  return fetch(`${ON_THE_WORKSTATION}${at.pathname}${at.search}`, init)
}

async function tokensTaking(userId: string, pushType: string): Promise<readonly DeviceToken[]> {
  const reached = await deviceTokensFor(userId, onTheWorkstation)
  if (!reached.ok) throw new Error(`listDeviceTokens: ${reached.why}`)
  return reached.tokens.filter((one) => one.pushType === pushType)
}

export function listDeviceTokens(userId: string): Promise<readonly DeviceToken[]> {
  return tokensTaking(userId, ALERT)
}

export function listActivityTokens(userId: string): Promise<readonly DeviceToken[]> {
  return tokensTaking(userId, LIVE_ACTIVITY)
}

export async function pruneDeviceToken(deviceToken: string): Promise<void> {
  await dropDeviceToken(deviceToken, onTheWorkstation)
}
