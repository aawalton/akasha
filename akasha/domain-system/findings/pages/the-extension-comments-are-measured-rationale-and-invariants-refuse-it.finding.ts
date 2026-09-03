import type { Finding } from "../finding.page-type.ts"

export const theExtensionCommentsAreMeasuredRationaleAndInvariantsRefuseIt = {
  id: "01a064a8-86d3-757f-b6d6-84d80c95d162",
  pageTypeSlug: "finding",
  slug: "the-extension-comments-are-measured-rationale-and-invariants-refuse-it",
  domainSlug: "workspace-package/editor-extension",
  claim:
    "The code editor extension's 651 comment lines carry measured rationale rather than explanation: 132 of its 138 logical comments record replayed traces and reverted experiments with their numbers. An invariant says what is true rather than why, and caps at 100 characters, so rewriting these as invariants loses the numbers.",
  evidence:
    "Counted over `editor-extension/src`: 77 files, 30 of them carrying comments, 560 blocks, 651 physical lines. Two independent instruments agree on all 30 files — a reimplementation of the check's own traversal, and a hand-rolled lexer. Merging adjacent line comments into paragraphs gives 138 logical comments: 132 rationale, 6 restatement, 0 machinery.\n\n124 of the 132 run past the 100-character cap on an invariant statement. Dividing by that cap puts a lower bound of 549 statements on them.\n\nWhat is lost is not phrasing. `observation-store.ts:44-48` records a write rate limit tried and reverted at blocked medians of 11438ms against 20486ms. `domain-tree/activate.ts:23-34` records a backoff replayed against a real trace, reading 3 times in 7 minutes and leaving a change unshown for 257s. `agent-tree/activate.ts:148-159` records 30 rows drawn where three polls had each read 148.\n\nThe call taken in Alan's absence: measured rationale becomes findings, and only the contract a comment implies becomes an invariant.",
} as const satisfies Finding
