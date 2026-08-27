---
id: 7f546b6d-fa58-5c54-a273-cae0b00f6650
slug: code-repo-row-fetch
page-type-slug: finding
title: "The harness calls a code repository function that fetches rows rather than deciding"
domain-slug: domain/agent-harness
---

# Claim

The Design entry "The harness reaches the database directly for a row, and calls a code repository function only where that function decides rather than fetches" is false in its second half. `tools/lib/page-list-code.ts` stands under this domain and reaches `pages/cli/src/lib/list-fetch.ts` in the code repository, whose `getPages` and `collectPages` fetch rows and decide nothing. The line stood in Intent until it was moved to Design on 2026-08-13 in `3bf5581d2`.

# Evidence

Read off the `review-instructions` reading of `domains/agent-harness.md` finished 2026-08-21, read line by line, bottom to top. That reading reports running `governs.ts` for the placement of `tools/lib/page-list-code.ts` and reading `list-fetch.ts` for what `getPages` and `collectPages` do.

This is the second reading to hand the same line back, which is why it is filed rather than left in a report nobody reads twice.

Not measured here: I did not re-run `governs.ts`, did not open `list-fetch.ts`, and did not look for other callers into the code repository from this domain — so how wide the breach is, beyond the one call named, is unread. Whether the repair is to move the line back to Intent or to move the row reads off the code repository is not settled here, and it reverses a call Alan made himself.
