import type { Domain } from "../../../domains/domain.page-type.ts"
import type { PageType } from "../../../pages/types/page-type.page-type.ts"

export type ChangeTargetType = Domain

export const changeTargetType = {
  id: "01a07c73-47c8-7571-af7f-96259b306e66",
  pageTypeSlug: "page-type",
  slug: "change-target-type",
  definition: "the sort of thing a change acts on",
  pluralSlug: "change-target-types",
  parts: [
    "change-target-type/file",
    "change-target-type/folder",
    "change-target-type/file-content",
    "change-target-type/page-type",
    "change-target-type/page-property",
    "change-target-type/prose",
  ],
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change states the target type from the thing that change acts on.",
    },
    {
      invariantKind: "departure",
      statement: "Which act a change makes and which thing a change acts on are two answers.",
    },
  ],
} as const satisfies PageType
