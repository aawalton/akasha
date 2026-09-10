import type { ChangeMechanical } from "../../../change-mechanical.page-type.types.ts"

export const addFileOfAnyKind = {
  id: "01a081bf-3f33-77ca-96cc-29ff7017f563",
  pageTypeSlug: "change-mechanical",
  type: "change-mechanical",
  slug: "add-file-of-any-kind",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one body written at one path, through the change writing that kind of path",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under a page name is written by the change judging the pages named.",
    },
    {
      invariantKind: "departure",
      statement: "Every other TypeScript path is written by the change judging the imports named.",
    },
    {
      invariantKind: "departure",
      statement: "Every other path is written by the change judging the file alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page arrives with its `id` worked out here rather than at the landing.",
    },
    {
      invariantKind: "departure",
      statement: "A caller saying no `id` is taken to have said `auto`.",
    },
    {
      invariantKind: "departure",
      statement: "An `id` a caller states goes in rather than an `id` worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "A body already stating an `id` keeps that `id` under `auto`.",
    },
    {
      invariantKind: "departure",
      statement: "A body already stating an `id` refuses an `id` handed in beside that body.",
    },
    {
      invariantKind: "absence",
      statement: "A path naming no page takes no `id`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a path for its kind.",
    },
    {
      invariantKind: "departure",
      statement: "A path under a page type name is written by the change judging the plural slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path under a page property name is written by the change judging the keys carried.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
