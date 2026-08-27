---
id: 4800cdaa-bded-597e-8192-c1e6234c427f
slug: definition-clause-restates
page-type-slug: finding
title: "Definition clause restates"
domain-slug: domain/global
---

# Claim

The Definition bullet on `domains/commands/ops-graph-off-workstation.md` ends in a clause that restates the one before it. It reads `the workspace packages nothing running off this workstation reaches, found by reachability`, and `found by reachability` says again what `reaches` has already said. The verb's real distinction — that it computes the set from CI workflows and k8s manifests rather than having it judged by eye — is what the clause looks like it should carry, and does not.

# Evidence

Raised by the reviewer seat `claude-ops-graph-off-workstation-archivist-review-instructions`, reading the document line by line on 2026-08-13; its report is at `~/agents/claude-ops-graph-off-workstation-archivist-review-instructions/review-ops-graph-off-workstation.md`.

That seat ran `ops graph off-workstation --help` and the verb itself (187 of 393 workspace packages reached by nothing off this workstation, seeded from 451 roots), and searched the corpus for `off-workstation`, which appears only in this document and the command file. I did not re-run either.

It did not land the trim, on the ground that Every Changed Line on `domains/domain.md` reserves a domain's Definition to Alan and its dispatch released nothing. Writing a clause that does carry the distinction would be an addition resting on judgment rather than on an instrument, so that was left too.

Not measured: whether the nine sibling `ops graph …` documents carry the same restating clause, which would make this one instance of a pattern rather than a single line.
