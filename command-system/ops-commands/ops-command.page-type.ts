import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Definition } from "../../domains/properties/definition.text-property.ts"
import type { Invariants } from "../../domains/properties/invariants.record-property.ts"
import type { HelpEnvVars } from "../commands/properties/help-env-vars.record-property.ts"
import type { HelpExamples } from "../commands/properties/help-examples.text-property.ts"
import type { HelpExclusions } from "../commands/properties/help-exclusions.record-property.ts"
import type { HelpExits } from "../commands/properties/help-exits.record-property.ts"
import type { HelpFlags } from "../commands/properties/help-flags.record-property.ts"
import type { HelpPositionals } from "../commands/properties/help-positionals.record-property.ts"
import type { OpsEntryFile } from "./properties/ops-entry-file.text-property.ts"
import type { OpsHelp } from "./properties/ops-help.file-property.ts"
import type { OpsPath } from "./properties/ops-path.text-property.ts"

export type OpsCommand = Page & {
  definition: Definition
  opsPath: OpsPath
  opsEntryFile: OpsEntryFile
  opsHelp?: OpsHelp
  positionals?: HelpPositionals
  flags?: HelpFlags
  envVars?: HelpEnvVars
  exclusions?: HelpExclusions
  exits?: HelpExits
  examples?: readonly HelpExamples[]
  invariants?: Invariants
}

export const opsCommand = {
  id: "01a06904-523e-71be-a131-878c4944a2ef",
  pageTypeSlug: "page-type",
  slug: "ops-command",
  definition: "a command of the old ops CLI, with the help one call prints",
  pluralSlug: "ops-commands",
  extendsSlug: ["page-type/page"],
  partSlugs: ["file-property/ops-help", "text-property/ops-entry-file", "text-property/ops-path"],
  properties: [
    { pagePropertySlug: "definition", required: true, many: false },
    { pagePropertySlug: "ops-path", required: true, many: false },
    { pagePropertySlug: "ops-entry-file", required: true, many: false },
    { pagePropertySlug: "ops-help", required: false, many: false },
    { pagePropertySlug: "help-positionals", required: false, many: true, max: null },
    { pagePropertySlug: "help-flags", required: false, many: true, max: null },
    { pagePropertySlug: "help-env-vars", required: false, many: true, max: null },
    { pagePropertySlug: "help-exclusions", required: false, many: true, max: null },
    { pagePropertySlug: "help-exits", required: false, many: true, max: null },
    { pagePropertySlug: "help-examples", required: false, many: true, max: null },
    { pagePropertySlug: "invariants", required: false, many: true, max: null },
  ],
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The words after `ops` reach the command rather than name the page's slug.",
    },
    {
      invariantKind: "departure",
      statement: "An ops command's help prose is a file beside its page.",
    },
    {
      invariantKind: "absence",
      statement: "A page carrying no help prose adds nothing to what its command prints.",
    },
    {
      invariantKind: "departure",
      statement: "What the command takes is carried here in the same shape a command page uses.",
    },
    {
      invariantKind: "gap",
      statement: "The code an ops command runs is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "A page here carries the argument shape the entry file declares.",
    },
    {
      invariantKind: "departure",
      statement: "A page here goes when the command the page documents goes.",
    },
  ],
} as const satisfies PageType
