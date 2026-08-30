import type { Finding } from "../finding.page-type.ts"

export const checksSwallowAFileTheyCannotRead = {
  id: "01a0500d-4ccc-775e-a747-1466fd9ee9ed",
  pageTypeSlug: "finding",
  slug: "checks-swallow-a-file-they-cannot-read",
  domainSlug: "domain/checks-system",
  claim:
    "A file a check cannot read is judged clean rather than refused. One null stands for a file that is absent, one that could not be read, and one present but not valid UTF-8, so fourteen of the twenty-eight checks pass over it in silence. No check can refuse the second and third until something tells them apart from the first.",
  evidence:
    'Run rather than reasoned. `overEachText` handed a Body whose path ends `.ts` and whose bytes are not valid UTF-8 never calls the judging function at all and answers `[]`, so the check reports clean and nothing records that it read nothing. Two conflations feed it, both in `checking.module.code.ts`: `onDisk` (223) catches every `readFileSync` error, so `leaving.at` answers null for a deleted file, a permission error and an I/O failure alike; `bodyOf` (234) answers null for bytes that will not decode; `textIn` (242) folds both nulls into one. Eleven of twenty-eight checks read through `overEachText` or `judgingEachFile` — file-length, id-is-a-uuid-version-7, imports-inside, no-class, no-code-comments, no-enum-or-namespace, no-method-signature, no-raw-nul-bytes, no-re-export, no-tmp, require-import-extension. Three more call `textIn` at four sites, each writing `if (text === null) continue`: no-second-spelling 28 and 60, no-rule-in-two-files 19, no-import-cycle 60. `overEachFile` (170) skips on null bytes the same way. The rule was already named by the system being ablated: the `population-read-swallow` scanner inside `cluster-check-syntax-bundle` reads "every population-declaring check either records a member it could not read or ends the run". Its detector keys on `examinePopulation`, which akasha does not use, so a literal port would answer zero by recognising nothing, and an honest one would refuse today. Splitting the null comes first, and `checking.module.code.ts` is imported by every check, so it lands across the system at once.',
} as const satisfies Finding
