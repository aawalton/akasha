import type { Fetcher } from "@akasha/pages-system-service/calling"
import { deviceTokensFor, dropDeviceToken } from "@akasha/person-system/device-token"

export const ON_THE_WORKSTATION = "http://127.0.0.1:8787"

export interface DeviceToken {
  readonly deviceToken: string
  readonly bundleId: string
}

function originNamed(): boolean {
  const said = process.env.PAGES_SERVICE_ORIGIN ?? process.env.PAGE_STORE_ORIGIN
  return said !== undefined && said !== ""
}

export const onTheWorkstation: Fetcher = (url, init) => {
  if (originNamed()) return fetch(url, init)
  const at = new URL(url)
  return fetch(`${ON_THE_WORKSTATION}${at.pathname}${at.search}`, init)
}

export async function listDeviceTokens(userId: string): Promise<readonly DeviceToken[]> {
  const reached = await deviceTokensFor(userId, onTheWorkstation)
  if (!reached.ok) throw new Error(`listDeviceTokens: ${reached.why}`)
  return reached.tokens
}

export async function pruneDeviceToken(deviceToken: string): Promise<void> {
  await dropDeviceToken(deviceToken, onTheWorkstation)
}
