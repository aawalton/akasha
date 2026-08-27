---
id: ba948005-a3f3-5a5f-ac0e-24305d001e5f
slug: checks-folder-holds-audits
page-type-slug: finding
title: "Checks folder holds audits"
domain-slug: domain/global
---

# Claim

`tools/checks/` is the code spelling for what the corpus calls an audit. `domains/audit.md` defines an audit as "code run on what is already there, to find problems", and `domains/instructions-harness.md` declares its own child `instructions-audit` at `instructions-path: tools/checks/*.ts`. So the domain names the folder's contents audits while the folder and the `run-checks` command call them checks. That is a Ubiquitous Naming defect inside this domain's own area.

# Evidence

Raised by a review-instructions seat on `domains/instructions-harness.md`. It is what made the Design entry that seat repaired ambiguous in the first place: `check` had one reading as the declared domain and another as the folder this repo ships, and the two picked out different mechanisms.

The reviewer reported that commit 325f7348 looks like the deliberate rename the folder never followed. It did not land the change: it is a horizontal change across `tools/**` plus the `run-checks` command, resting on judgment rather than settled by an instrument.

I did not read `domains/audit.md` or commit 325f7348, and I did not enumerate what a rename would touch. I did confirm the domain declares `instructions-audit` in its glossary alongside `instructions-gate` and `reference`.
