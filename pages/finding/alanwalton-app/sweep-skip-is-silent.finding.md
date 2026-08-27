---
id: f188292a-9c4b-5c6a-908a-17a3a58ae162
slug: sweep-skip-is-silent
page-type-slug: finding
title: "Sweep skip is silent"
domain-slug: domain/alanwalton-app
---

# Claim

The sim sweep's designed skip on a dirty Mac checkout is indistinguishable from a run that passed: exit 0, no alert, and nothing downstream says the scenarios did not execute. It skipped on two consecutive projects, #18577 and #18615, both of which changed what a widget draws.

# Evidence

`sweep-window-guard.ts`'s `decideSweepSkip` holds the window when the Mac checkout is dirty so that `git merge --ff-only` cannot abort. That guard is right in itself — the alternative is a sweep that fights another seat's in-flight build — and this is not a claim that it should run anyway.

What is missing is the SAYING. The skip exits 0 and raises no alert, so a seat that runs the sweep after landing and a seat whose sweep never executed report the same thing: nothing. Both #18577 and #18615 hit it, on 2026-08-10 and 2026-08-11, each time because another seat held an uncommitted change on the Mac. Two consecutive shell-touching projects went to Alan's build with the sweep's three scenarios ungraded, and in each case the delivering seat only knew because it went looking.

The population matters: the Mac is dirty precisely WHEN other seats are building, which is when shell changes are landing. So the skip is not randomly distributed against the risk — it correlates with it.

The nightly `mobile-sim-suite.service` is the stated backstop for shell-touching diffs that landed while the Mac napped, and it runs through the same guard. A nightly that silently skips is a backstop that reports the same on a clean night and a skipped one.

Not established: how many of the sweep's runs over any period actually skipped, or whether a skip is recorded anywhere a later reader could count. This finding is two observations, not a rate.

Distinct from `sweep-grades-the-workstation-tree.md`, which is about WHAT the sweep grades when it does run. This is about it not running and not saying so.
