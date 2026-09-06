import type { Module } from "../code-system/modules/module.page-type.ts"
import type { PageType } from "../pages/types/page-type.page-type.ts"
import type { ReadersOweReading } from "./kinds/properties/readers-owe-reading.boolean-property.ts"
import type { RunsChecks } from "./kinds/properties/runs-checks.boolean-property.ts"
import type { WriterOwesReading } from "./kinds/properties/writer-owes-reading.boolean-property.ts"
import type { IsCommand } from "./properties/is-command.boolean-property.ts"

export type Change = Module & {
  isCommand: IsCommand
  runsChecks: RunsChecks
  readersOweReading: ReadersOweReading
  writerOwesReading: WriterOwesReading
}

export const change = {
  id: "01a05df1-e261-76a1-ad1e-0db3d857450e",
  pageTypeSlug: "page-type",
  slug: "change",
  definition: "a mechanical change whose bodies are answered rather than written",
  pluralSlug: "changes",
  extendsSlug: ["page-type/module"],
  partSlugs: [
    "page-type/change-partial",
    "page-type/change-command",
    "page-type/change-checked",
    "page-type/change-authored",
    "page-type/change-mechanical",
    "page-type/change-runner",
    "page-type/workflow-template",
    "page-type/change-kind",
    "workspace-package/workflow-language",
    "boolean-property/is-command",
    "page-type/change-guard",
    "module/change-shadow",
    "module/change-guarding",
    "module/page-claiming",
    "module/change-answer",
    "module/edits-keeping",
  ],
  properties: [
    { pagePropertySlug: "boolean-property/is-command", required: true, many: false },
    { pagePropertySlug: "boolean-property/runs-checks", required: true, many: false },
    { pagePropertySlug: "boolean-property/readers-owe-reading", required: true, many: false },
    { pagePropertySlug: "boolean-property/writer-owes-reading", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change that is expected to pass checks runs checks.",
    },
    {
      invariantKind: "departure",
      statement: "A change that is expected to pass checks is a command.",
    },
    {
      invariantKind: "departure",
      statement: "A change that is not expected to pass checks does not run checks.",
    },
    {
      invariantKind: "departure",
      statement: "A change that is not expected to pass checks is not a command.",
    },
  ],
} as const satisfies PageType
