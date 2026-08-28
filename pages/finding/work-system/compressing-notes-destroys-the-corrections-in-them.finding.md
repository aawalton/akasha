---
id: bcd837d5-83b6-5956-b131-c5748be215a6
page-type-slug: finding
title: "Compressing notes destroys the corrections in them"
slug: compressing-notes-destroys-the-corrections-in-them
domain-slug: domain/work-system
---

# Claim

Cutting a false line from an initiative's Notes leaves the document more correct and the record poorer. Nothing refuses it: Notes with a false line gone are well-formed, and `initiative.page-type.md:45` requires a done step not to stand there. So the instrument that keeps an initiative honest is the one that destroys corrections. Four verifications went this way, three at `0085b82266` and one at `a4f5321cf2`; the rules the first three overturned still stand in a file no check reaches.

# Evidence

`checks-system/a-remedy-that-erases-what-it-repairs` holds the general form. This case is sharper: what was erased was a verification rather than data. Somebody had done the checking, and the checking is what went.

WHAT WENT. `0085b82266` cut three particulars from `astra-page-naming.initiative.md`, each already checked and found false. Re-verified 2026-08-28: `temper-account-character` carries a slug on all 29 of its pages and declares no `named-for` at all; `step` declares `{seq}`, not `{name}`, and `seq` is declared on `page-type/page`; `mobile-cut` declares `"{app-slug}-{build-number}"`, both keys declared on it, and has no pages.

THE REMOVAL WAS RIGHT. The lines were false, `initiative.page-type.md:45` forbids a done step in Notes, and the section was at its ceiling. Nothing about the act was wrong; the loss was silent.

THE SUPERSEDED RULES SURVIVE. `pages/initiative/formula-name-translations.md` still tabulates what they overturned: line 57 gives `step` as `"{workflow-seq}-{name}"`, a cycle, changed at `f447599647`; line 59 gives `temper-account-character` as `{eso-character-id}`, removed at `ab1c875c54`; line 60 gives `temper-build-version` as `"{build}-{version-number}"`, removed at `228f6c9c42`. It carries no frontmatter and no page-type suffix, so it is not a page and no check reaches it.

ONE CORRECTION SURVIVED, written onto a finding instead of left in Notes: `build-version-named-for-undeclared-keys.finding.md`, amended at `981472cc83`. The same search over findings and initiatives returns that page for `temper-build-version` and nothing for the other three.

Amending it cost more than the correction: its Evidence stood at 2,468 against a 2,000 cap, so a finding predating the cap stands over it and any amendment forces a rewrite, not an edit.

A FOURTH, at `a4f5321cf2`. Notes said `suffix.ts:57` genuinely disagreed, calling `a.b.domain.md` no domain; `a28da29500` had repaired it. Re-verified 2026-08-28: `:58-59` is `pageTypeOf(relPath) === slug`, and `pageTypeOf("a.b.domain.md")` answers `domain`. How many more is unmeasured.
