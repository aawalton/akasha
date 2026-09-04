import type { Module } from "@akasha/code-system/module"
import type { PageType } from "@akasha/pages-system/page-type"
import type { ChangeKindSlug } from "./properties/change-kind-slug.relation-property.ts"
import type { HelpEnvVars } from "./properties/help-env-vars.record-property.ts"
import type { HelpExamples } from "./properties/help-examples.text-property.ts"
import type { HelpExclusions } from "./properties/help-exclusions.record-property.ts"
import type { HelpExits } from "./properties/help-exits.record-property.ts"
import type { HelpFlags } from "./properties/help-flags.record-property.ts"
import type { HelpNotes } from "./properties/help-notes.text-property.ts"
import type { HelpPositionals } from "./properties/help-positionals.record-property.ts"
import type { Taking } from "./properties/taking.record-property.ts"

export type Command = Module & {
  changeKindSlug: ChangeKindSlug
  taking?: Taking
  helpNotes?: readonly HelpNotes[]
  positionals?: HelpPositionals
  flags?: HelpFlags
  envVars?: HelpEnvVars
  exclusions?: HelpExclusions
  exits?: HelpExits
  examples?: readonly HelpExamples[]
}

export const command = {
  id: "01a04bdd-596d-7b81-9204-1a882f474a5f",
  pageTypeSlug: "page-type",
  slug: "command",
  definition: "a module reached by name from the command line",
  pluralSlug: "commands",
  partSlugs: [
    "boolean-property/help-arg-path",
    "boolean-property/help-arg-repeat",
    "boolean-property/help-arg-required",
    "boolean-property/help-arg-stdin",
    "boolean-property/help-arg-variadic",
    "command/agent-forest",
    "command/agent-turn-colors",
    "command/audit",
    "command/calendar",
    "command/claude-usage",
    "command/complexity",
    "command/compose-notices",
    "command/deploy",
    "command/dev-server",
    "command/domain-tree",
    "command/drive",
    "command/edit",
    "command/elaine",
    "command/food",
    "command/icloud",
    "command/importing",
    "command/index",
    "command/ios-app",
    "command/lint",
    "command/lint-exception",
    "command/loki",
    "command/measure",
    "command/model-gateway",
    "command/move",
    "command/page-tree",
    "command/patch",
    "command/push",
    "command/read",
    "command/refactor",
    "command/remove",
    "command/replace",
    "command/seat",
    "command/seat-transcripts",
    "command/service",
    "command/test",
    "command/track",
    "command/tracking",
    "command/typecheck",
    "command/wan",
    "command/work-tree",
    "command/write",
    "command/zimage",
    "number-property/help-exit-code",
    "record-property/help-env-vars",
    "record-property/help-exclusions",
    "record-property/help-exits",
    "record-property/help-flags",
    "record-property/help-positionals",
    "record-property/taking",
    "relation-property/change-kind-slug",
    "text-property/help-arg-alias-of-flag",
    "text-property/help-arg-aliases",
    "text-property/help-arg-choices",
    "text-property/help-arg-default",
    "text-property/help-arg-label",
    "text-property/help-arg-name",
    "text-property/help-arg-note",
    "text-property/help-arg-shape",
    "text-property/help-examples",
    "text-property/help-exclusion-names",
    "text-property/help-exit-meaning",
    "text-property/help-notes",
    "text-property/said",
    "text-property/takes",
  ],
  extendsSlug: ["page-type/module"],
  loadedBySlug: "module/calling",
  properties: [
    { pagePropertySlug: "change-kind-slug", required: true, many: false },
    { pagePropertySlug: "taking", required: false, many: true, max: null },
    { pagePropertySlug: "help-notes", required: false, many: true, max: null },
    { pagePropertySlug: "help-positionals", required: false, many: true, max: null },
    { pagePropertySlug: "help-flags", required: false, many: true, max: null },
    { pagePropertySlug: "help-env-vars", required: false, many: true, max: null },
    { pagePropertySlug: "help-exclusions", required: false, many: true, max: null },
    { pagePropertySlug: "help-exits", required: false, many: true, max: null },
    { pagePropertySlug: "help-examples", required: false, many: true, max: null },
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
    {
      invariantKind: "departure",
      statement: "What a command takes is carried here as data rather than as prose.",
    },
    {
      invariantKind: "departure",
      statement:
        "The `taking` list says how an argument is spelled and the help properties say the shape.",
    },
    {
      invariantKind: "gap",
      statement: "A command's code reads this page rather than declaring the shape again.",
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
