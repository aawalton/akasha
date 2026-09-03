import type { Module } from "@akasha/code-system/module"
import type { PageType } from "@akasha/pages-system/page-type"
import type { ChangeKindSlug } from "./properties/change-kind-slug.relation-property.ts"
import type { HelpNotes } from "./properties/help-notes.text-property.ts"
import type { Taking } from "./properties/taking.record-property.ts"

export type Command = Module & {
  changeKindSlug: ChangeKindSlug
  taking?: Taking
  helpNotes?: readonly HelpNotes[]
}

export const command = {
  id: "01a04bdd-596d-7b81-9204-1a882f474a5f",
  pageTypeSlug: "page-type",
  slug: "command",
  definition: "a module reached by name from the command line",
  pluralSlug: "commands",
  partSlugs: [
    "command/audit",
    "command/deploy",
    "command/edit",
    "command/importing",
    "command/index",
    "command/ios-app",
    "command/lint",
    "command/lint-exception",
    "command/measure",
    "command/move",
    "command/patch",
    "command/read",
    "command/refactor",
    "command/remove",
    "command/seat",
    "command/service",
    "command/test",
    "command/track",
    "command/tracking",
    "command/work-tree",
    "command/write",
    "record-property/taking",
    "relation-property/change-kind-slug",
    "text-property/help-notes",
    "text-property/said",
    "text-property/takes",
  ],
  extendsSlug: "page-type/module",
  loadedBySlug: "module/calling",
  properties: [
    { pagePropertySlug: "change-kind-slug", required: true, many: false },
    { pagePropertySlug: "taking", required: false, many: true, max: null },
    { pagePropertySlug: "help-notes", required: false, many: true, max: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A command's page states what the command takes and what is worth knowing about the taking.",
    },
    {
      invariantKind: "departure",
      statement: "A command that refuses or throws changes nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path a command is named is read against the repository root rather than the calling folder.",
    },
    {
      invariantKind: "departure",
      statement: "A command cannot see a substitution the shell made in its arguments.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "Repeating Problem",
      act: "Write a command only where the problem repeats, and solve it in a repeatable way.",
      warrant:
        "Writing the command costs more than doing the job by hand; everything it saves is in later runs.",
      aids: [
        "A job anyone has done by hand twice repeats.",
        "A run that needs you to decide is not repeatable.",
      ],
    },
  ],
} as const satisfies PageType
