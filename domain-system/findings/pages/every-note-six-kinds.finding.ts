import type { Finding } from "../finding.page-type.ts"

export const everyNoteSixKinds = {
  id: "01a06555-9f3d-75bc-938c-b745abe49608",
  pageTypeSlug: "finding",
  slug: "every-note-six-kinds",
  domainSlug: "domain/all-about-alan",
  claim:
    'The Voice rule on `domains/all-about-alan.md` says "every note", and the folder it governs holds six kinds of file. The glob is `alan/books/all-about-alan/**`, under which stand `notes/` (217 files), `projects/` (137), `personas/` (27), `experiments/` (2), `journal/` (1) and `OVERVIEW.md`, whose own front matter calls itself "Third-person briefing for the interviewer, not a note for Future-Alan". Read narrowly the rule reaches `notes/`; read widely it makes `OVERVIEW.md` a standing breach.',
  evidence:
    "Raised by a review-instructions seat on `domains/all-about-alan.md`, which left the rule standing because the two readings ask for different acts and choosing between them rests on judgment. It named two shapes the repair could take: the rule names its unit more tightly, or the Design says which files are notes.\n\nThe file counts and the OVERVIEW.md front-matter quotation are the reviewer's, reported to me. I did not open the governed folder or count anything, and I did not read `personas/abby.md`, which it cites as a file where Alan's first person would be wrong.\n\nNot measured: whether anything has actually been written wrongly under the wide reading.",
} as const satisfies Finding
