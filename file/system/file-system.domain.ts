import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const fileSystem = {
  id: "01a05c4c-9440-7c8e-bb95-ba621d52090a",
  type: "page-type/domain",
  slug: "file-system",
  definition: "how code uses a file on a machine",
  parts: [
    "module/anything-there",
    "module/atomic-write",
    "module/expand-tilde",
    "module/file-size",
    "module/missing",
    "module/read-stdin-or-file",
    "module/scratching",
    "module/text-on-disk",
    "module/text-there",
    "module/whole-writing",
    "test-fixture/kept-scratch",
  ],
} as const satisfies Domain
