import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const google = {
  id: "01a08cd7-2c63-718b-88bf-b2c367f52826",
  type: "namespace",
  slug: "google",
  definition: "what Alan keeps with Google, reached under one consent",
  parts: ["command/google-login", "namespace/google-calendar", "namespace/google-drive"],
  name: "google",
} as const satisfies Namespace
