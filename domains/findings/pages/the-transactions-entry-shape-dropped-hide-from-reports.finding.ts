import type { Finding } from "../finding.page-type.ts"

export const theTransactionsEntryShapeDroppedHideFromReports = {
  id: "01a0675e-6da8-7001-b504-77a1c9e27440",
  pageTypeSlug: "finding",
  slug: "the-transactions-entry-shape-dropped-hide-from-reports",
  domainSlug: "domain/monarch",
  claim:
    "The migrated `transactions` entry shape declares no `hide-from-reports`, and the markdown-era writer wrote one. Monarch still reports the flag and monarch still parses it, so the mirror fetches a fact about every row and discards it. Whether the flag was meant to go or was lost in the rewrite is recorded nowhere.",
  evidence:
    'Measured 2026-09-03 at 384a5f16e9.\n\n`akasha/alan/harness/monarch/monarch-months/properties/transactions.page-property-entry.ts` declares eighteen fields and none is `hide-from-reports`. A census over all 11,018 lines of the 63 `*.monarch-month.transactions.jsonl` files finds nineteen distinct keys and no `hideFromReports` among them, so no migrated row carries it either.\n\nThe old writer did. Before this repair, `monarch/land-files.ts` built each line with `"hide-from-reports": t.hideFromReports || null`, beside `"needs-review"`, `"recurring"` and `"split"` — the other three booleans Monarch reports, all of which the new shape kept. This one alone was dropped.\n\nMonarch has not stopped reporting it. `monarch/client.ts:48` types `hideFromReports: boolean` as required, `:103` asks for it in the GraphQL selection, and `:192` parses it and refuses a row omitting it. The value is fetched on every sync and thrown away.\n\nThis repair wrote the new shape rather than the old, so the writer and the declaration now agree and the flag is gone from both. Restoring it wants a `boolean-property/hide-from-reports` beside the other three and one field added to the entry shape. The values would have to be fetched again: the backup\'s own lines carry the flag only where it was true.',
} as const satisfies Finding
