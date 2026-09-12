import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const theEsoDeclarationGeneratorWritesWhereNothingReads = {
  id: "01a081a9-5ff3-7673-9322-73112d9446c5",
  type: "finding",
  slug: "the-eso-declaration-generator-writes-where-nothing-reads",
  domain: "domain/temper-eso-declaration",
  claim:
    "The ESO declaration generator writes into a directory that is not there, while thirty packages read a separately paged package instead.",
  evidence:
    "`akasha temper eso generate declaration` writes to temper/addons/types/eso/generated, which git neither tracks nor ignores and which is absent from disk. `akasha temper eso generate chatter-name` reads enums.d.ts from that same absent directory, so both commands are unrunnable here. Nothing else names the path. The addons instead depend on @akasha/temper-eso-types, whose declarations are pages, and thirty manifests require it. The two share no code, and nothing records whether one supersedes the other.",
} as const satisfies Finding
