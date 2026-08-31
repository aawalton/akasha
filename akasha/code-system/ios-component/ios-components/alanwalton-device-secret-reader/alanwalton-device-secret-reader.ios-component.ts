import type { IosComponent } from "../../ios-component.page-type.ts"

export const alanwaltonDeviceSecretReader = {
  id: "01a05835-69d8-7c13-a335-3861228c1176",
  pageTypeSlug: "ios-component",
  slug: "alanwalton-device-secret-reader",
  definition: "the read of the device secret out of the keychain",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Two keychain items for one device are refused rather than picked between.",
    },
  ],
} as const satisfies IosComponent
