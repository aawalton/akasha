---
id: dd7a1cfa-b3e2-5a67-ac92-3a644dda7371
page-type-slug: finding
title: "Browser test fixture exit undeclared"
domain-slug: domain/ops-cli
---

# Claim

The four `ops browser-test ensure-*` fixture verbs declare exit 1 for a missing throwaway user, and actually exit 70 on that path, because the capability raises an unclassified `Error`.

# Evidence

Each of `ensure-idle-game`, `ensure-reader-fixture`, `ensure-reader-audio-fixture` and `ensure-awen-game` declares exit 1 as "throwaway user missing, write failure, or guard refused the protected real user".

Run against an email no user carries, all four print `throwaway user <addr> not found — run `ops browser-test ensure-user` first` on stderr and exit 70. `selectThrowawayUserId` in `packages/shared/browser-test-harness/src/ensure-idle-game.ts` raises a bare `new Error`, which `exitCodeForThrowable` cannot classify, so it takes the unhandled-defect code rather than the declared one. The same shape stands in `ensureThrowawayUser`, whose failures are declared exit 1 too.

Measured on 2026-08-13 on both sides of moving these four bodies into this repository: exit 70 before the move and 70 after, stdout and stderr byte-identical. The capability stayed in the code repository and is called rather than copied, so the move neither caused this nor could correct it from here.
