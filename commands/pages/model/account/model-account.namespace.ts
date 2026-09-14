import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const modelAccount = {
  id: "01a07bcb-0b96-7437-a26f-deb498bea34d",
  type: "namespace",
  slug: "model-account",
  definition: "an Anthropic subscription put into service or brought back",
  parts: ["command/model-account-add", "command/model-account-re-enable"],
  name: "model-account",
} as const satisfies Namespace
