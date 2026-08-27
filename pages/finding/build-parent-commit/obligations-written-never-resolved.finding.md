---
id: 1e286b4e-075f-5753-9018-478d88d4b559
page-type-slug: finding
title: "Obligations written never resolved"
domain-slug: domain/global
---

# Claim

A parent seat that obeys line 19 is refused at its own last stage. That line has it write gaps onto the tree's `obligations`; nothing anywhere has it resolve them; and `ops project move-to` refuses the stage 4 move while any obligation is unresolved. Against writing a resolve line: the gate refuses in its own words, and `instructions-harness.md`'s Design is that anything a gate could refuse is not written as an instruction. For it: the refusal lands after every child is verified.

# Evidence

Raised by the review-instructions reading of `domains/tasks/projects/build-parent-commit.md` on 2026-08-07, which stated both faces and made no addition.

The argument that makes this more than a gate doing its job, in the reviewer's words: the seat has to work back from a status gate to an obligation it wrote four stages earlier. Whether that distance is worth a line is the judgment.

Both faces stand identically on `build-parent-deploy.md`, so a decision belongs at both sites.

I did not run `ops project move-to --help`; the obligation gate's behaviour is the reviewer's report of it. It also reports reading the four custody gates and the obligation gate in that help.
