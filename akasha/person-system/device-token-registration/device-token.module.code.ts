import { writePage } from "@shared/pages-query"

export const DEVICE_TOKEN_PAGE_TYPE_SLUG = "device-token"

const WRITER = "device-tokens"

export interface DeviceTokenRegistration {
  readonly userId: string
  readonly deviceToken: string
  readonly platform: string
  readonly bundleId: string
}

export async function registerDeviceToken(args: DeviceTokenRegistration): Promise<void> {
  const landed = await writePage(
    DEVICE_TOKEN_PAGE_TYPE_SLUG,
    args.deviceToken,
    {
      token: args.deviceToken,
      "user-id": args.userId,
      platform: args.platform,
      "bundle-id": args.bundleId,
      "last-seen-at": new Date().toISOString(),
    },
    WRITER
  )
  if (!landed.ok) throw new Error(`device-tokens registration failed: ${landed.why}`)
}
