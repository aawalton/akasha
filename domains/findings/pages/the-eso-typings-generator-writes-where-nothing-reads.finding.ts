import type { Finding } from "../finding.page-type.ts"

export const theEsoTypingsGeneratorWritesWhereNothingReads = {
  id: "01a081a9-5ff3-7673-9322-73112d9446c5",
  pageTypeSlug: "finding",
  slug: "the-eso-typings-generator-writes-where-nothing-reads",
  domain: "workspace-package/temper-eso-typings",
  claim:
    "The ESO typings generator writes into a directory that is not there, while thirty packages read a separately paged package instead.",
  evidence:
    "temper-eso-generate-typings writes to temper/addons/types/eso/generated, which git neither tracks nor ignores and which is absent from disk. temper-eso-generate-chatter-names reads enums.d.ts from that same absent directory, so both commands are unrunnable here. Nothing else names the path. The addons instead depend on @akasha/temper-eso-types, whose declarations are pages, and thirty manifests require it. The two share no code, and nothing records whether one supersedes the other.",
} as const satisfies Finding
