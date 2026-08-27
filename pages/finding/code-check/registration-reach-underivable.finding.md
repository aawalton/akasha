---
id: ea19df76-2a06-519b-bb72-98f2100abc5a
slug: registration-reach-underivable
page-type-slug: finding
title: "Registration reach underivable"
domain-slug: domain/global
---

# Claim

`check-addon-control-name-global-collision` still takes its registration reach from a literal in the check, and the wrapper whose arrival broke it cannot be derived from what the check reads.

# Evidence

The rule matches a call by looking its name up in a table the check declares. #18358 widened that table from four names to five, adding the `registerPanel(lam, addonId, …)` wrapper that every LAM panel registration in the tree moved onto in July 2026 — a member that arrived after the list was written and went unmatched for weeks while the check stayed green. The repair satisfied that project's criteria and left the shape intact: a second wrapper arriving tomorrow is unmatched in exactly the same way, and the check reports clean.

Deriving the reach here is not the edit the other checks' derivation rows are. The forwarding wrapper is what would have to be derived — a function that passes one of its own parameters into a registration call, and the index it passes it at — and `registerPanel` is defined at `packages/temper/shared/interface/lam/src/register-panel.ts`, which is outside the check's population: `listAllAddons` returns 49 addon directories and that package is not one of them, so the check parses the wrapper's call sites and never its body. A derivation over the population as it stands would find addon-local wrappers only, miss the cross-package one the incident came from, and report its own count as coverage.

Measured in the #18358 worktree at 8b88e3c4a403b1f104de2926547feeb238995195 on 2026-08-10: 49 addons, 1,793 files scanned, 22 `registerPanel(…)` call sites outside the wrapper's own file, zero `RegisterAddonPanel` call sites left in addon source.
