import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const modelAccount = {
  id: "01a07bcb-0b96-7437-a26f-deb498bea34d",
  type: "page-type/namespace",
  slug: "model-account",
  definition: "an Anthropic subscription put into service, shut out or brought back",
  parts: [
    "command/model-account-add",
    "command/model-account-disable",
    "command/model-account-re-enable",
    "command/model-account-login",
  ],
  name: "model-account",
  createdAt: "2026-09-07T12:14:59.478Z",
  updatedAt: "2026-09-30T06:51:51.000Z",
} as const satisfies Namespace
