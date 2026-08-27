---
id: 1465ac7f-2f5e-5658-8ea0-c905df428284
page-type-slug: finding
title: "The staged recipient resolver reaches no ops at all"
domain-slug: workstation-service/recipient-resolver
---

# Claim

Every revive vector in `tools/tests/recipient-resolver-daemon.on-demand.test.ts` fails, because the staged daemon spawns an `ops` that resolves to no dispatcher, so each revive runs to its ceiling instead of answering.

# Evidence

Measured on 2026-08-19. Five of the seventeen vectors fail, and they are exactly the five that set `STUB_MODE: "revive"`. Each takes between 739ms and 743ms against the `STUB_REVIVE_TIMEOUT_MS` of 700, including the vector whose fake ops is meant to exit 0 at once, so all five are reaching the timeout rather than the answer.

The stage in `tools/tests/recipient-resolver-daemon-stage.ts` writes its fake ops to `<fake home>/code/ops` and drives the daemon with `HOME` set to the fake home and `CODE_ROOT` set to the fake code tree. `reviveViaOps` in `tools/lib/recipient-resolver-revive.ts` spawns the bare name `ops`, which on this workstation is `~/.local/bin/ops`. That shim resolves its dispatcher from `INSTRUCTIONS_ROOT`, defaulting to `$HOME/repos/instructions` — which under the fake home does not exist. The stage sets no `INSTRUCTIONS_ROOT`.

The failures predate the recipient resolver being pointed at seat pages: they reproduce identically in a worktree at `8b0823721`, the commit before that change. `778b7ec6c` earlier the same day set `CODE_ROOT` for these same vectors, so the fake code tree was already being reached for; whether `INSTRUCTIONS_ROOT` is the whole remainder was not tested.
