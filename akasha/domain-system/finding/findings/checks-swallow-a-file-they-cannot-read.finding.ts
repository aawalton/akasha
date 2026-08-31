import type { Finding } from "../finding.page-type.ts"

export const checksSwallowAFileTheyCannotRead = {
  id: "01a0500d-4ccc-775e-a747-1466fd9ee9ed",
  pageTypeSlug: "finding",
  slug: "checks-swallow-a-file-they-cannot-read",
  domainSlug: "domain/checks-system",
  claim:
    "A `.ts` file whose bytes are not valid UTF-8 is judged clean rather than refused. A body that stands and will not open now refuses the check reading it, so absent and unreadable are told apart; the decode is not. `overEachText` answers `[]` without ever calling the judging function, so eleven checks report clean on a file they never read. The door's own `bytesAt` still folds all three into one null.",
  evidence:
    "`onDisk` in `change-walking.module.code.ts` now answers null only for a path standing at nothing and lets anything else throw, and `judgingBy` turns that throw into a refusal naming the check. What is left is `bodyOf`, answering null for bytes that will not decode, and `textIn`, folding that null in with an absent body. `overEachText` sees the null and answers `[]` without calling the judging function, so the check reports clean and nothing records that it read nothing. Eleven checks read through `overEachText` or `judgingEachFile`: file-length, id-is-a-uuid-version-7, imports-inside, no-class, no-code-comments, no-enum-or-namespace, no-method-signature, no-raw-nul-bytes, no-re-export, no-tmp, require-import-extension. Three more call `textIn` and write `if (text === null) continue`. `no-refused-syntax` states the same hole as a gap of its own, that a file whose bytes are not valid UTF-8 is passed over rather than refused. The `no-swallowed-read` rule sees none of it, a decode having been taken out of what counts as a read once the bytes have already arrived. Outside the checks, `bytesAt` in `asking.module.code.ts` answers one null for absent and unreadable and momentarily unavailable alike, and is the last site that rule refuses. Splitting that null wants the door in view: six of its seven callers already fail closed with exit codes of their own, and a throw would collapse them into the unclassified one, costing `read` its report while its reading record still claims the bodies reached the agent.",
} as const satisfies Finding
