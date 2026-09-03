import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Definition } from "../../domain-system/domains/properties/definition.text-property.ts"
import type { Invariants } from "../../domain-system/domains/properties/invariants.record-property.ts"
import type { OpsEntryFile } from "./properties/ops-entry-file.text-property.ts"
import type { OpsHelp } from "./properties/ops-help.file-property.ts"
import type { OpsPath } from "./properties/ops-path.text-property.ts"

export type OpsCommand = Page & {
  definition: Definition
  opsPath: OpsPath
  opsEntryFile: OpsEntryFile
  opsHelp?: OpsHelp
  invariants?: Invariants
}

export const opsCommand = {
  id: "01a06904-523e-71be-a131-878c4944a2ef",
  pageTypeSlug: "page-type",
  slug: "ops-command",
  definition: "a command of the old ops CLI, with the help one call prints",
  pluralSlug: "ops-commands",
  extendsSlug: "page-type/page",
  partSlugs: ["file-property/ops-help", "text-property/ops-entry-file", "text-property/ops-path"],
  properties: [
    { pagePropertySlug: "definition", required: true, many: false },
    { pagePropertySlug: "ops-path", required: true, many: false },
    { pagePropertySlug: "ops-entry-file", required: true, many: false },
    { pagePropertySlug: "ops-help", required: false, many: false },
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
      invariantKind: "gap",
      statement: "The code each of these commands runs is in akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A page here goes when the command it documents goes.",
    },
  ],
} as const satisfies PageType
