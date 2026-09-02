import type { Finding } from "../finding.page-type.ts"

export const theGuildBankStateTestDoesNotHoldLoadingAgainstError = {
  id: "01a0643c-2ced-7255-b22a-ecb9afc6c05e",
  pageTypeSlug: "finding",
  slug: "the-guild-bank-state-test-does-not-hold-loading-against-error",
  domainSlug: "domain/temper",
  claim:
    "Swapping the first two branches of `resolveGuildBankListState`, so a failed read beats a read in flight, leaves all six of its tests passing. No case in the suite sets `isLoading` and `isError` together, so the precedence between them is unproven. The suite is not blind to the module: a second mutation two lines further down killed two of the six.",
  evidence:
    'Measured 2026-09-02, on copies taken outside the repository so no hook could revert the mutation between the write and the run.\n\nThe module reads `if (args.isLoading) return "loading"` then `if (args.isError) return "load-failed"`. Reversing those two lines: 6 pass, 0 fail. Reading the six cases confirms why — every one of them sets exactly one of the two flags true, and four set neither.\n\nControl for the instrument, because a false negative and a true negative print the same string. Flipping `args.hasSnapshot ? "data-unreadable" : "no-inventory-data"` in the very next branch: 4 pass, 2 fail, naming the case about a snapshot that would not reassemble. So the runner reaches this file and these assertions do fail when the code moves under them.\n\nThe surviving mutation is a real gap rather than a dead one. A read that is both in flight and carrying a stale error is reachable — a refetch after a failure is exactly that state — and the two answers differ in what the reader sees: a spinner or a failure notice. The test that would close it sets both flags and asserts one answer.\n\nThis is filed rather than fixed because the suite was ported rather than written, and adding a case decides a question the original code only answered by line order. Which of the two should win is a product question.',
} as const satisfies Finding
