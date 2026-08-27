---
id: 2e040edb-a4e2-559e-b342-550fb00e8eea
page-type-slug: finding
title: "Scripts typechecked by nothing"
domain-slug: domain/global
---

# Claim

Nothing typechecks `scripts/` anywhere in the code repository: no tsconfig `include` covers that directory, so a script under it compiles for nobody and a type error in one reaches production unseen.

# Evidence

Found 2026-08-11 by the seat holding #18769, while changing `packages/agents/cli/scripts/create-identity-definitions.script.ts` — the script that writes the seat projection's property-definition rows.

That file carried a real defect: `Page` used and never imported. It predated the change, and every gate in the repository passed over it, because no tsconfig `include` names `scripts/` at any level. The defect is fixed at `eb0cf8ed9`; the hole that hid it is not.

A script is not a lesser file for being called a script. This one writes the rows a seat's name is validated against, and a type error in it fails at run time on a path nobody runs often.
