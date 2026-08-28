---
id: aa81c257-3e35-5845-8ce5-1e5c6efadc95
slug: definition-names-two-concerns
page-type-slug: finding
title: "The code-quality Definition names two concerns and three things under it fall under neither"
domain-slug: domain/code-quality
---

# Claim

The Definition on `domains/code-quality.md` names two concerns where `domains/domain-definition.md` allows one — "how a body of code is organized and structured, and what has been left in it" — and three things standing under the domain fall under neither. The rules `Bounded Wait` and `Real Path` are correctness rather than shape, and the child domain `performance` is neither. The other five children fit: `code-comment` and `unused-code` the leftovers, `file-length`, `formatting` and `ops-complexity` the structure.

# Evidence

Read off the `review-instructions` reading of `domains/code-quality.md` finished 2026-08-21, read line by line, bottom to top, 21 entries. The reading kept the line, "Every Changed Line" putting a change to a Definition in front of Alan.

Its own recommendation, which is a recommendation and not a call: the Definition is what is behind, a domain that already owns `performance` being about how good the code is rather than only how it is arranged, and moving three things to fit a line is the larger act. The other reading is that the two rules belong on `coding.md` and `performance` belongs elsewhere.

Not measured here: I did not open the five children or the two rules, and I did not check what `coding.md` already carries.
