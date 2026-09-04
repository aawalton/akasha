import type { Finding } from "../finding.page-type.ts"

export const noCommentTheItemRulesSourceCarriedCameAcross = {
  id: "01a0615d-ca74-7f05-ba86-1d18631ce82a",
  pageTypeSlug: "finding",
  slug: "no-comment-the-item-rules-source-carried-came-across",
  domainSlug: "domain/temper",
  claim:
    "Akasha refuses a code comment carrying prose, so recreating temper's item rules dropped every comment the source held. Where a comment stated a fact the code does not, that fact now lives only in the module page, and where it named a row it is gone. The potion table lost the name beside each of its 73 item ids.",
  evidence:
    "`akasha write` answered `line N carries prose, which is none of the code comment forms` for every line of `potion-restore-metrics.generated.ts`, both its header block and the 73 trailing `// Essence of Health` labels. Stripping all comments let the bytes through, and the ids and values were checked identical in order against the source. The header stated three things the code does not: the crafted map descends from the alchemy catalog, the itemId map is a union of catalog rows and rows mined from ability text, and the table holds no bitwise arithmetic so the Lua build carries it whole. Those three are now invariants on `potion-restore-resolve.module.ts`. The 73 potion names are recoverable from the catalog by id and were not carried. The same treatment ran over all 89 landed modules of `temper-items-rules-core` and the 27 of the three router packages; 15 of the 656 akasha temper code files already carry comments, so the check is not reached by every path.",
} as const satisfies Finding
