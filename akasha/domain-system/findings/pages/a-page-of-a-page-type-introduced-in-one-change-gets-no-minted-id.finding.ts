import type { Finding } from "../finding.page-type.ts"

export const aPageOfAPageTypeIntroducedInOneChangeGetsNoMintedId = {
  id: "01a06271-8a44-7001-9e02-4b7c15d8a339",
  pageTypeSlug: "finding",
  slug: "a-page-of-a-page-type-introduced-in-one-change-gets-no-minted-id",
  domainSlug: "workspace-package/command-system",
  claim:
    "A page whose page type lands in the same change carries an id written by hand or lands not at all, while a page of a page type already landed needs none. The entry rows beside those same first pages were each given an id as the change landed, so the two halves of minting disagree about a shape introduced alongside what leans on that shape.",
  evidence:
    "Measured 2026-09-02. A change carrying `temper-recipe-list.page-type.ts` and 30 pages of that page type, none of the 30 stating `id`, was refused by typecheck once per page: `TS1360 ... Property 'id' is missing in type ... but required in type 'Page'`. Writing an id into all 30 bodies cleared the refusal and the change landed 65 paths past 37 checks.\n\nWith that page type then landed, one further page of the same page type carrying no `id` was handed to `akasha write --dry-run` and answered `36 checks passed over the 2 paths asked for`. So minting fills a page's id whenever the page type is already there, and the page type being new in the change is the whole difference between the two runs.\n\nIn the refused change, `recipes.page-property-entry.ts` was new in exactly the same way, and all 4,027 entry rows arriving without an id were each given one as the change landed, reported per file as having worked out `id` as that file landed. So an entry shape introduced alongside the rows leaning on that shape works where a page type introduced alongside its pages does not.\n\n`generated-properties` carries the departure `A property taking a generator and the first page leaning on that property land together`, which holds for the property and not for the page type.\n\nWhat was measured is the refusal and the clean run. Which guard inside minting answers differently for a page type new in the change was not read, so the cause is unnamed here.",
} as const satisfies Finding
