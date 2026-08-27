---
id: a6b095a6-e532-58bd-b095-ac96a090a152
slug: red-is-an-undeclared-coinage
page-type-slug: finding
title: "Red is an undeclared coinage"
domain-slug: barred-meaning/project
---

# Claim

`Plain Or Declared` landed on 2026-08-06 and nothing has been swept against it. "A red" is used as a noun six times across five build tasks, no `domains/red.md` declares it, and `terms-in-reach` cannot see the gap because it only tracks terms already declared.

# Evidence

Measured 2026-08-06, hours after the principle landed.

`domains/global.md` — "**Plain Or Declared** — Write the plain phrase; where you give a word a sense of its own, declare it as a domain first. Nobody looks up a word they read as ordinary, so the wrong sense is carried off silently. A declared word is exempt only in its declared sense. It binds instruction, never how a persona speaks."

"A red" as a noun, counted: build-child-commit 1, build-singleton-commit 1, build-parent-commit 1, build-parent-deploy 2, build-singleton-deploy 1 — six uses over five files. Example, `build-parent-deploy.md:35`: "**Escalate** a red your tree's own commits did not cause."

`ls domains/red.md` returns "No such file or directory", so the word is not declared anywhere.

Why no instrument reports it: the reading that raised it states `terms-in-reach` tracks declared terms only, so an undeclared coinage is invisible to it by construction. That makes this class of breach unreportable rather than merely unreported.

The reading's stated preference was to declare the word rather than rewrite five files to "a failing check", on the ground that "a red" is doing real work — it names a verdict state rather than a single failing check. It did not act, because the choice is corpus-wide and the principle is a day old.

Not established: how many other undeclared coinages the corpus carries. Six uses of one word were counted; no sweep was run, and the instrument that would run one cannot see this class.
