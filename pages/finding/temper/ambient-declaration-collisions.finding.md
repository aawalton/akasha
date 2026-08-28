---
id: 9543df77-aafd-5df8-b471-00898fc0df31
slug: ambient-declaration-collisions
page-type-slug: finding
title: "Ambient declaration collisions"
domain-slug: domain/temper
---

# Claim

161 ambient ESO global declarations across repo-owned `.d.ts` files carry contradictory signatures (out of 295 declared in more than one file, out of 8,208 ambient top-level names total); harmless per-package, but any unified type-checking program spanning packages resolves a contradiction by declaration order silently, fabricating findings (measured: 5 at 3 positions, all `zo_plainstrfind` sites) and able to mask real ones (unmeasured, not measurable without a per-package baseline).

# Evidence

Project #16045 (domain `temper`, parent #15872 "Temper in-game readiness audit"), owner ember, created 2026-07-25T10:16:08Z, `someday_maybe`, no objective. Found by #16015's worker; filed as a peer of #16035, not a child.

**Originating observation.** The worker was about to rewrite `list.ts:444` when the reported type (`number`) contradicted the declaration it had just read (`zo_plainstrfind ... : boolean`); it stopped rather than write the edit. `zo_plainstrfind` has five declarations: `boolean` in three files, `number | undefined` in two. ESO defines it as `string.find(str, sub, 1, true)`, so `boolean` is factually wrong, not a stylistic split.

**Measured blast radius.** 8,208 ambient top-level names in repo-owned `.d.ts`; 295 declared in more than one file; 161 contradictory. Per-package each is harmless — a package sees only its own declaration. Reachable only when a program spans packages, which `check-typesafety-bundle` does.

**Both directions.** A unified program resolves a duplicate ambient by declaration order, silently. Wrong direction: a package whose own declaration is right gets checked against a neighbour's wrong one — measured, 5 sites, all `zo_plainstrfind`, caught only because a human noticed the contradiction. Masking direction: a package whose declaration would raise an observation gets checked against a neighbour's permissive one and it never appears — unmeasured, not measurable without a per-package baseline. Caveat: "none currently moves an observation" describes today's set only; it changes every commit.

**Partially run, fidelity-correct instrument.** Per-package programs (each checked against its own declarations) ran for 7 of 373 packages, resolving a 23-site accounting: 15 genuine+5 collision+3 strictNullChecks=23, matching #15992's independent denominator. Open: running all 373 against a shard design set by memory limit.

Capture broke off at a paragraph boundary; the rest was never filled in. Moved off `notes` 2026-08-15.
