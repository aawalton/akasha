import type { Namespace } from "../../namespaces/namespace.page-type.types.ts"

export const claudeAccount = {
  id: "01a07bcb-0b96-7437-a26f-deb498bea34d",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "claude-account",
  definition: "an Anthropic subscription put into service or brought back",
  parts: [
    "command/claude-account-add",
    "command/claude-account-re-enable",
    "command/claude-account-usage",
  ],
} as const satisfies Namespace
