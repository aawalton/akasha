import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Domain } from "../domain/domain.page-type.ts"

export type Task = Domain

export const task = {
  id: "01a05332-0f1b-78e8-b7bb-84640e5f85a2",
  pageTypeSlug: "page-type",
  slug: "task",
  definition: "a piece of work an agent can finish",
  pluralSlug: "tasks",
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A task is finishable, so an agent doing one can tell when it is done and stop.",
    },
    {
      invariantKind: "departure",
      statement:
        "A task is a domain, so it stands in the domain tree and is named by a parent among its parts.",
    },
    {
      invariantKind: "absence",
      statement:
        "A task names no required reading. Every task named this page type and nothing else, so the reading is this type's concern rather than each task's.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "A task carries its definition and nothing of how the work is done, so a migrated task's sequence stands only in the old system.",
    },
    {
      invariantKind: "gap",
      statement: "A task states the sequence of steps that finishes it.",
    },
  ],
} as const satisfies PageType
