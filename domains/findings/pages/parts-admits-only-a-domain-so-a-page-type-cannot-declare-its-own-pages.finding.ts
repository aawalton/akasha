import type { Finding } from "../finding.page-type.types.ts"

export const partsAdmitsOnlyADomainSoAPageTypeCannotDeclareItsOwnPages = {
  id: "01a08807-80b5-7353-b324-c89868fd4333",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "parts-admits-only-a-domain-so-a-page-type-cannot-declare-its-own-pages",
  domain: "relation-property/parts",
  claim:
    "`parts` targets `page-type/domain`, so a page type whose pages are not domains cannot name one of its own pages among its parts. Every folder shape that reads `parts` therefore refuses a folder holding such a page, and the only shape left to that page is `pages-of-the-type-above`, which asks for a folder named `pages` between the page type and the page.",
  evidence:
    '`domains/properties/parts.relation-property.ts` states `targetPageType: "page-type/domain"`. `domains/plain-language/parser-models/parser-model.page-type.ts` states `extends: ["page-type/page"]`, so a `parser-model` page is not a domain. `domains/plain-language/parser-models/compact-parser/` held one such page beside the page type\'s own folder, and `folder-matches-a-shape` refused the folder above it as `2 subfolders are no part `parser-model` declares: compact-parser, properties`.\n\nDeclaring the part is refused rather than merely wrong. `akasha change draft change-file` adding `"parser-model/compact-parser"` to that page type\'s `parts` answered: `parser-model/compact-parser` names a `parser-model`, and this property admits only `domain` and what extends it.\n\nBoth shapes that read `parts` reach the same end. `a-domain-with-its-parts.folder-shape.code.ts` and `a-page-type-with-its-parts.folder-shape.code.ts` each keep a subfolder only where `standing.declared(folder)` holds what `standing.holds(subfolder)` answers, and `standing.declared` is built in `folder-matches-a-shape.code-check.code.ts` from `parts` alone. `a-page-type-with-its-parts` skips a subfolder named `modules`, `pages`, `properties`, `scripts` or `workstation-services`, so `pages` is the one name that clears without a declaration.\n\nThe mend for `compact-parser` was `move-folder` to `domains/plain-language/parser-models/pages/compact-parser`, landed as `dcfcf9509595fafaedf9dacc1b7d89771eaddb78`. That move is the only mend available to any page of a page type beneath `page-type/page` rather than beneath `page-type/domain`, and the class is wider than one page: every such page sitting in a folder beside its page type is refused today and can be cleared only by moving, never by declaring.',
} as const satisfies Finding
