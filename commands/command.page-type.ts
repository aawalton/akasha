import type { Module } from "@akasha/code/module"
import type { PageType } from "@akasha/pages/page-type"
import type { Entries } from "../checks/code-checks/properties/entries.file-property.ts"
import type { ChangeKind } from "./properties/change-kind.relation-property.ts"
import type { HelpNotes } from "./properties/help-notes.text-property.ts"
import type { Taking } from "./properties/taking.record-property.ts"
import type { Timeout } from "./properties/timeout.number-property.ts"

export type Command = Module & {
  changeKind: ChangeKind
  timeout?: Timeout
  taking?: Taking
  helpNotes?: readonly HelpNotes[]
  entries?: Entries
}

export const command = {
  id: "01a04bdd-596d-7b81-9204-1a882f474a5f",
  pageTypeSlug: "page-type",
  slug: "command",
  definition: "a module reached by name from the command line",
  pluralSlug: "commands",
  parts: [
    "command/agent-turn-colors",
    "command/audit",
    "command/calendar",
    "command/complexity",
    "command/drive",
    "command/icloud",
    "command/index",
    "command/ios-app",
    "command/push",
    "command/read",
    "command/restore",
    "record-property/taking",
    "relation-property/change-kind",
    "text-property/help-notes",
    "text-property/said",
    "text-property/takes",
    "namespace/imessage",
    "namespace/measure",
    "namespace/seat",
    "namespace/track",
    "namespace/email",
    "namespace/music",
    "namespace/inference",
    "namespace/mobile",
    "namespace/talos",
    "namespace/page",
    "namespace/browser",
    "namespace/sms",
    "namespace/claude-account",
    "namespace/domain",
    "namespace/model-gateway",
    "namespace/temper",
    "module/yaml-lines",
    "module/play-row",
    "module/change-costing",
    "module/apply-running",
    "namespace/change",
    "namespace/refresh",
    "number-property/timeout",
    "page-type/namespace",
    "page-type/refactor-command",
    "namespace/agent",
    "namespace/initiative",
    "namespace/alan",
    "namespace/infrastructure",
    "command/performance",
  ],
  extends: ["page-type/module"],
  loadedBy: "module/calling",
  properties: [
    { pagePropertySlug: "relation-property/change-kind", required: true, many: false },
    { pagePropertySlug: "record-property/taking", required: false, many: true, maxCount: null },
    { pagePropertySlug: "text-property/help-notes", required: false, many: true, maxCount: null },
    { pagePropertySlug: "number-property/timeout", required: false, many: false },
    {
      pagePropertySlug: "file-property/entries",
      required: false,
      many: false,
      uncommitted: true,
      default: "jsonl",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A command's page states the command's arguments and the notes worth knowing about the taking.",
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
      statement: "The arguments a command takes are carried here as data rather than as prose.",
    },
    {
      invariantKind: "gap",
      statement: "A command's code reads this page rather than declaring the shape again.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every property this page type declares is read by code.",
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
