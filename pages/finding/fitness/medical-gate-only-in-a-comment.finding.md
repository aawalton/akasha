---
id: 640f3a35-ef58-5885-8241-0509a463d130
page-type-slug: finding
title: "Medical gate only in a comment"
domain-slug: domain/fitness
---

# Claim

The only statement of the medical gate on Alan's outdoor training is a code comment: `packages/alanwalton/daily-tracking/src/air-quality.ts` holds both his condition and the two duties it imposes, and `domains/code-quality.md` is the document saying that is where they must not be.

# Evidence

Measured 2026-08-07 while ingesting `dirty/skills/fitness/SKILL.md`.

`domains/code-quality.md` carries the Intent "No code comment carries an instruction" and the rule Code Comments: "**Never write an instruction as a code comment.**"

Two comments in `packages/alanwalton/daily-tracking/src/air-quality.ts` are instructions by that test. The module docblock: "Alan has asthmatic bronchitis — exerting amid particulates can trigger a weeks-long flare. Air quality is a hard medical gate on outdoor exertion, so the reading must be deterministic ... and the verdict must be conservative: when in doubt, keep him indoors." The `OutdoorVerdict` type's comment: "`indoor-only` — the hard gate ... Retract any outdoor nudge."

Keep him indoors when in doubt, and withdraw a nudge already given, are acts.

Neither is stated where a reader of the instructions tree can reach it. Searched `asthma`, `bronchitis`, `air quality`, `avoid-list` and `indoor-only`, each term on its own rather than as one alternation, with `rg -Uil --multiline-dotall`. Over `domains/` excluding `dirty/`: nothing. Over `~/books/`: nothing. Over `~/memory/`: nothing. `~/books/all-about-alan/` is live and holds `OVERVIEW.md`, `experiments`, `journal`, `notes`, `personas` and `projects`; his respiratory condition is in none of them. `domains/fitness.md` is a definition line with no `# Rules` section, and `domains/tasks/` has no fitness directory.

No mechanism refuses the act. `air-quality.ts` is by its own description "the PURE core", returning one of `clear`, `caution` and `indoor-only`; a coach reads the verdict and decides what to say.

It differs from `pages/finding/seat/seat-design-lives-in-code-comments.finding.md` in what is stranded: that measures seat-design reasoning across twenty modules; here one module holds the sole copy of a medical constraint on Alan's body.

Not judged: where the duty should land. Whether the medical fact may be written into `~/books/all-about-alan/` turns on `domains/folders/all-about-alan.md` Authorship, which I could not settle from here.
