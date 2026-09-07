import type { Module } from "../code-system/modules/module.page-type.ts"
import type { ChangeKindSlug } from "../command-system/commands/properties/change-kind-slug.relation-property.ts"
import type { PageType } from "../pages/types/page-type.page-type.ts"
import type { ReadersOweReading } from "./kinds/properties/readers-owe-reading.boolean-property.ts"
import type { RunsChecks } from "./kinds/properties/runs-checks.boolean-property.ts"
import type { WriterOwesReading } from "./kinds/properties/writer-owes-reading.boolean-property.ts"
import type { ChangeModeSlug } from "./properties/change-mode-slug.relation-property.ts"
import type { ChangeTargetSubtypeSlug } from "./properties/change-target-subtype-slug.relation-property.ts"
import type { ChangeTargetTypeSlug } from "./properties/change-target-type-slug.relation-property.ts"

export type Change = Module & {
  changeKindSlug?: ChangeKindSlug
  changeModeSlug: ChangeModeSlug
  changeTargetTypeSlug?: ChangeTargetTypeSlug
  changeTargetSubtypeSlug?: ChangeTargetSubtypeSlug
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
    "domain/change-agent",
    "page-type/change-checked",
    "page-type/change-authored",
    "page-type/change-restated",
    "page-type/change-mechanical",
    "page-type/change-runner",
    "page-type/workflow-template",
    "page-type/change-kind",
    "workspace-package/workflow-language",
    "page-type/change-guard",
    "module/change-shadow",
    "module/change-guarding",
    "module/page-claiming",
    "module/page-knowing",
    "module/page-literal",
    "module/change-answer",
    "module/edits-keeping",
    "page-type/change-mode",
    "relation-property/change-mode-slug",
    "page-type/change-target-type",
    "page-type/change-target-subtype",
    "relation-property/change-target-type-slug",
    "relation-property/change-target-subtype-slug",
  ],
  properties: [
    { pagePropertySlug: "relation-property/change-kind-slug", required: false, many: false },
    { pagePropertySlug: "relation-property/change-mode-slug", required: true, many: false },
    {
      pagePropertySlug: "relation-property/change-target-type-slug",
      required: false,
      many: false,
    },
    {
      pagePropertySlug: "relation-property/change-target-subtype-slug",
      required: false,
      many: false,
    },
    { pagePropertySlug: "boolean-property/runs-checks", required: true, many: false },
    { pagePropertySlug: "boolean-property/readers-owe-reading", required: true, many: false },
    { pagePropertySlug: "boolean-property/writer-owes-reading", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A change the command line reaches reads the arguments handed in rather than trusting the arguments.",
    },
    {
      invariantKind: "departure",
      statement:
        "An argument such a change was handed no value for is refused by the key naming that argument.",
    },
    {
      invariantKind: "departure",
      statement: "A change that is expected to pass checks runs checks.",
    },
    {
      invariantKind: "departure",
      statement: "A change that is not expected to pass checks does not run checks.",
    },
  ],
} as const satisfies PageType
