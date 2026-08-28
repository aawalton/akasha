---
page-type-slug: finding
title: "A page too big to read cannot be repaired"
domain-slug: command/read
---

# Claim

A page past the size one `ops read` answer holds cannot be repaired by any agent that obeys the read gate. The read refuses the body and records nothing, so `read-before-write` then refuses every write to that path, and the two together make the file unwritable rather than merely awkward. The remedy the refusal names — split the file — is an editorial decision about the work, so a one-character repair to such a page cannot be made at all until somebody first decides how the writing should be divided.

# Evidence

Measured 2026-08-28, while clearing `links-resolve`.

Twelve `all-about-alan` notes carried a link to `#threads-to-pull-on-later`, a section dropped as a category in an earlier consolidation. Nine of them, across eight files, were repaired in one commit at `e7599db44bc2beffab15820b54a09a70507ee272`. The other three were refused at the read:

    creativity-scars.book-chapter.md          34448 characters
    self-preservation-adapter.book-chapter.md 34057
    self-improvement.book-chapter.md          29442

against the 28000 one answer holds. `ops-cli/global/read/read.command.md:22` states "A read takes no line range" and `:26` "A body past what one answer holds returns what it is, and records nothing", so no spelling of the call returns them. The refusal names the remedy in its own words: "an authored file is split before it is changed." `links-resolve` therefore stands at 3 broken among the live documents rather than 0, and the three are identical in kind to the nine already repaired.

The population is larger than these three. 2988 pages under `pages/` are past the ceiling. 2935 of those are scraped chapters — 2144 `story-chapter-royal-road`, 791 `story-chapter-wandering-inn` — which no agent edits by hand and whose bodies `links-resolve.check.md:27` now excludes from judgement anyway. The remainder is authored work, and it is 13 pages:

    59310  pages/book-chapter/plato-apology-crito/001-apology.book-chapter.md
    38550  pages/book-chapter/all-about-alan/notes/central-loneliness.book-chapter.md
    33210  pages/book-chapter/all-about-alan/notes/creativity-scars.book-chapter.md
    32390  pages/book-chapter/all-about-alan/notes/self-preservation-adapter.book-chapter.md
    32356  pages/book-chapter/all-about-alan/notes/emotional-archaeology.book-chapter.md
    32172  pages/book-chapter/all-about-alan/notes/self-instrumentation.book-chapter.md
    31912  pages/book-chapter/all-about-alan/notes/safety.book-chapter.md
    31018  pages/book-chapter/all-about-alan/notes/love-decomposition.book-chapter.md
    30033  pages/book-chapter/all-about-alan/notes/discrete-self.book-chapter.md
    29802  pages/book-chapter/all-about-alan/notes/volatility-governor.book-chapter.md
    29396  pages/story-chapter-written/cornerstone/cornerstone/001-blind-ground.story-chapter-written.md
    28670  pages/book-chapter/plato-apology-crito/002-crito.book-chapter.md
    28001  pages/book-chapter/all-about-alan/notes/self-improvement.book-chapter.md

Ten of the thirteen are Alan's own notes about himself. Sizes are bytes here and the gate counts characters, so a file near the line reads larger to the gate than to `wc`: `self-improvement` is 28001 bytes and 29442 characters, and is refused rather than marginal.

Not measured: whether any of the other ten carries a fault a check reports today, and whether the ceiling is a limit of the answer or a policy that a different route — a read that records a body it streams past the caller — could satisfy without splitting anything.
