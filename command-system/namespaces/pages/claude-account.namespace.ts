import type { Namespace } from "../namespace.page-type.ts"

export const claudeAccount = {
  id: "01a07bcb-0b96-7437-a26f-deb498bea34d",
  pageTypeSlug: "namespace",
  slug: "claude-account",
  definition: "an Anthropic subscription put into service or brought back",
  partSlugs: ["command/claude-account-add", "command/claude-account-re-enable"],
} as const satisfies Namespace
