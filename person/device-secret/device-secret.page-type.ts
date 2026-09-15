import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const deviceSecret = {
  id: "01a05b39-f50b-77c0-826c-a526838d12ac",
  type: "page-type/page-type",
  slug: "device-secret",
  definition: "the credential one device presents in place of a session",
  extends: ["page-type/page"],
  parts: [
    "instant-property/device-secret-revoked-at",
    "text-property/device-secret-device-id",
    "text-property/device-secret-hash",
    "text-property/device-secret-user-id",
  ],
  properties: [
    { pageProperty: "text-property/device-secret-user-id", required: true, many: false },
    { pageProperty: "text-property/device-secret-device-id", required: true, many: false },
    { pageProperty: "text-property/device-secret-hash", required: true, many: false },
    { pageProperty: "instant-property/device-secret-revoked-at", required: false, many: false },
  ],
  mortal: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A device secret represents the account the device secret was minted for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A device secret opens everything that account opens and nothing more.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One hash sits on one device secret.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A revoked device secret opens nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A device secret is reached by the person with the device secret and the device the secret names.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The secret a device presents exists nowhere here.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A device secret last presented is said nowhere.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
