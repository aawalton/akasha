import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type DeviceSecretDeviceId = string

export const deviceSecretDeviceId = {
  id: "01a05b39-f50c-7066-918d-6a9ab1940531",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "device-secret-device-id",
  propertySlug: "device-id",
  definition: "the device a secret was minted onto",
  maxLength: 36,
  nameFormat: "name-format/upper-uuid",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An iOS device states this value as the identifier that device has for its vendor.",
    },
    {
      invariantKind: "departure",
      statement: "A device uninstalling the app states a new device id.",
    },
  ],
} as const satisfies TextProperty
