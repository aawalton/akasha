import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const alan = {
  id: "01a082fd-068b-7435-8084-4831d4e3370a",
  type: "page-type/namespace",
  slug: "alan",
  definition: "what Alan's phone sends and what he is learning",
  parts: ["command/alan-elaine", "command/alan-learn-next"],
  name: "alan",
  createdAt: "2026-09-08T21:46:55.499Z",
  updatedAt: "2026-09-25T14:42:46.000Z",
} as const satisfies Namespace
