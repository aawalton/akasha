export const DEVICE_TOKEN_PAGE_TYPE_SLUG = "device-token"

export interface DeviceTokenRegistration {
  readonly userId: string
  readonly deviceTokenRegistration: string
  readonly platform: string
  readonly bundleId: string
}

const NOTHING_LANDS = [
  "a device token is written nowhere.",
  "the page engine that took `user-id`, `platform` and `bundle-id` is gone, and the",
  "`device-token` page type akasha carries asks for `personSlug`, `iosAppSlug` and `token`.",
  "nothing here reads an account to a person or a bundle to an iOS app,",
  "so no page can be composed from what a caller hands over.",
].join(" ")

export async function registerDeviceToken(args: DeviceTokenRegistration): Promise<void> {
  throw new Error(`${NOTHING_LANDS} the bundle asked for was \`${args.bundleId}\``)
}
