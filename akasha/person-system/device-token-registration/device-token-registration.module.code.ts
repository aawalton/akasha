export const DEVICE_TOKEN_PAGE_TYPE_SLUG = "device-token"

export interface DeviceTokenRegistration {
  readonly userId: string
  readonly deviceTokenRegistration: string
  readonly platform: string
  readonly bundleId: string
}

const NOTHING_LANDS = [
  "a device token is written nowhere.",
  "the notifier reads its tokens under `user-id`, `token` and `bundle-id` from the markdown",
  "pages, and the `device-token` page type akasha carries asks for `personSlug`, `iosAppSlug`",
  "and `token`. a token landed in akasha is read by nothing that sends, and a token landed in",
  "the markdown from this pod dies at the next pod start, so it is lost either way.",
  "what is owed first is the notifier reading akasha.",
].join(" ")

export async function registerDeviceToken(args: DeviceTokenRegistration): Promise<void> {
  throw new Error(`${NOTHING_LANDS} the bundle asked for was \`${args.bundleId}\``)
}
