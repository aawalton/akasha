import type { Finding } from "../finding.page-type.ts"

export const fortyTwoRefusalDocumentsReachNoInstrument = {
  id: "01a05ce0-2436-7002-88de-550d54c6a71b",
  pageTypeSlug: "finding",
  slug: "forty-two-refusal-documents-reach-no-instrument",
  domainSlug: "domain/akasha-check",
  claim:
    "Forty-two of the 151 refusal documents are printed by no instrument anywhere in this repository, so they are words no agent will ever be shown, and refusals-bound is refusing that correctly rather than failing to look.",
  evidence:
    "The scan is repo-wide rather than scoped, contrary to what its own message says. `tools/audits/refusals-bound.ts:109` takes the akasha root, `:111` globs `pages/refusal/*.md` there, and `:119` walks `ownTypeScript(root)`, which at `tools/lib/own-typescript.ts:9-16` globs every `.ts` from the repository root and drops only node_modules and dist. Counting `refusalText(` across the whole tree gives 34 files under tools, 4 under page, and the declaration itself at `refusal/refusal.ts:36`, which `:123-125` rejects by its preceding `function `. That is 38, exactly the instrument count reported. The words `under tools/` come from the document body at `pages/refusal/refusal-document-unprinted.refusal.md:11` and describe nothing the scanner does. Nothing was moved out from under it either: `ls pages/refusal` is 151 and no `.refusal.md` stands anywhere else, none under akasha. 109 slugs are printed by a literal first argument and 42 are printed by nothing. Searching the entire tree for each of the 42, 37 appear in no source file at all, their only hits being the index caches under `.git/`. The orphans cluster: all ten `block-destructive-git-*`, six seat and subagent documents, five `required-reading-*`, four `file-*-read`. One narrowing does stand: the glob is `**/*.ts` and misses `.tsx`, though no `.tsx` file calls `refusalText(` today, so nothing is lost by it yet.",
} as const satisfies Finding
