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
  ],
  name: "model-account",
} as const satisfies Namespace
