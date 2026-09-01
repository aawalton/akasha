import type { Finding } from "../finding.page-type.ts"

export const thePageTypeRegistryReadsMarkdownAlone = {
  id: "01a05ce0-2436-7001-9201-bece3500f208",
  pageTypeSlug: "finding",
  slug: "the-page-type-registry-reads-markdown-alone",
  domainSlug: "workspace-package/pages-system",
  claim:
    "The page type registry ingests markdown page-type pages alone, so every page type now declared in TypeScript under akasha is absent from it, and relations-resolve refuses 2616 relations naming pages that all stand on disk.",
  evidence:
    "`pageTypePaths` at `page/property/registry.ts:84-86` filters by `PAGE_TYPE_KINDS`, defined at `page/page-types.ts:23-25` as page-type and rules-engine-rule-set, matched by `pageTypeOf` against a markdown filename. Probed at HEAD: the registry holds 375 types and `persona`, `person`, `seat` and `claude-account` are each absent from it. The persona type is declared at `akasha/persona-system/persona/persona.page-type.ts:35` and 42 persona pages stand as `.persona.ts`, while `pages/persona/` holds one uncommitted yaml. The refusal follows at `page/relation/relation.ts:146`, which keeps only types whose chain includes the relation's target; no registered type chains to persona, so the ordered set is empty and every want fails. 2369 of the 2616 name persona, spread evenly across all 42 of them — aelwyn 93, ione 92, amy 86, down to akasha 2 — which is the shape of an absent type rather than an absent page. Hand-verified targets all exist: `shaestrel` at `akasha/persona-system/persona/shaestrel/shaestrel.persona.ts:6`, `alan` at `akasha/person-system/person/people/alan.person.ts`, `folder-matches-a-shape` at `akasha/checks-system/code-check/folder-matches-a-shape/`. Not one of the 2616 names a page that is missing. The message at `relation.ts:117` prints the target verbatim and reads `no persona page carries that slug`, though no persona type was searched at all, so the failure text misdescribes what happened.",
} as const satisfies Finding
