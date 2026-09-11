import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const git = {
  id: "01a08d48-a685-748b-99de-86ee4ec68c5a",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "git",
  definition: "this checkout, reached where git's own command is refused an agent",
  parts: ["command/git-push", "command/git-restore"],
} as const satisfies Namespace
