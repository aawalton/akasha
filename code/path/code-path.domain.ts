import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const codePath = {
  id: "01a09b2a-d60f-7700-b4b4-7b97bc6ba190",
  type: "page-type/domain",
  slug: "code-path",
  definition: "how code finds a file or a folder",
  parts: [
    "module/code-path-between",
    "module/code-runtime-path",
    "module/folder-spelling",
    "module/module-directory",
    "module/path-runs",
    "test-fixture/script-paths",
  ],
  createdAt: "2026-09-13T14:27:50.927Z",
  updatedAt: "2026-09-25T14:08:13.000Z",
} as const satisfies Domain
