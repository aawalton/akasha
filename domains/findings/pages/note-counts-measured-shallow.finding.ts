import type { Finding } from "../finding.page-type.ts"

export const noteCountsMeasuredShallow = {
  id: "01a06555-9f3e-7ec9-a695-3105490d40cf",
  pageTypeSlug: "finding",
  slug: "note-counts-measured-shallow",
  domainSlug: "domain/all-about-alan",
  claim:
    "The third-person gap under `alan/books/all-about-alan/notes/` is wider than the filed figures say, and nothing shows it growing. Counted recursively there are 256 markdown files under `notes/`, 214 naming Alan in the third person. Two findings in this domain carry 217 and 186, which are the non-recursive counts of the same trees. A reviewer read the 217-to-256 difference as the corpus growing during its review; it is the two methods.",
  evidence:
    "Measured by me on 2026-08-07, prompted by the dispatched reviewer of `domains/all-about-alan.md` reporting 256 and 214 alongside a claim that `notes/` \"was 217 when I first measured and is 256 now\" and that \"the gap is not a fixed backlog being worked off; it is growing\".\n\nI ran both methods against the tree at one moment. `ls notes/*.md | wc -l` gives 217 and `rg -l '\\bAlan\\b' notes/*.md | wc -l` gives 186 — exactly the pair `every-note-six-kinds.md` and `voice-rule-state-unwritten.md` carry. `rg --files notes -g '*.md' | wc -l` gives 256 and the recursive third-person count gives 214. So both pairs describe one tree, and the growth reading has no support.\n\nNot proof: I cannot rule out that the tree genuinely held 217 recursive files when those findings were written and grew to 256 since. The exact coincidence between today's shallow count and the filed figure is what makes the method explanation the strong one.\n\n`every-note-six-kinds.md` also carries 137 for `projects/`, which IS the recursive count — so that finding mixes the two methods within one line.\n\nThis is not a staleness report against those findings. Their claims stand; the figures were narrow when taken rather than overtaken since.",
} as const satisfies Finding
