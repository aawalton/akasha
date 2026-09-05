import type { TextProperty } from "@akasha/pages-system/text-property"

export type DeviceId = string

export const deviceSecretDeviceId = {
  id: "01a05b39-f50c-7066-918d-6a9ab1940531",
  pageTypeSlug: "text-property",
  slug: "device-secret-device-id",
  propertySlug: "device-id",
  definition: "the device a secret was minted onto",
  max: 36,
  nameFormatSlug: "name-format/upper-uuid",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An iOS device states this value as the identifier it holds for its vendor.",
    },
    {
      invariantKind: "departure",
      statement: "A device uninstalling the app states a new one.",
    },
  ],
} as const satisfies TextProperty
