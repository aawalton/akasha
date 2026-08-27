---
id: 2638931b-d874-516d-a186-0af2acc12e25
slug: synthetic-roots-need-corpus
page-type-slug: finding
title: "Synthetic roots need corpus"
domain-slug: domain/global
---

# Claim

Nothing says a synthetic instructions root has to carry `refusals/`, and a root handed to an instrument that prints a refusal throws without it. The one live instance was found by breaking it rather than by any instrument naming it.

# Evidence

Landed over 2026-08-10, converting every gate and instructions check from prose in code to bodies read out of `refusals/`. `refusalText` throws where the document is not under the root it is given.

Surveyed on 2026-08-10: of the files under `tools/` that mint a throwaway root, only two hand one to code that composes a refusal — `lib/hook-probe.ts`, and `refusals-bound`'s own suite. Both now copy the corpus in. The rest do not meet the hazard at all, and the reason is structural rather than lucky: a gate composes its refusal against the real repository root, so a tree minted to be judged is never a root composed from. `gates/typecheck.ts` and `gates/document-conforms.ts` are that shape.

The one live break was `hooks-fire`'s probe sandbox. `hold-seat` and `hold-contract` each threw composing a refusal, each printed that the check had failed and the act proceeded unchecked, and each exited 0 — a hook refusing nothing, which is the state that check exists to find. Three earlier fixture breaks were caught by suites; this one was caught only by a full `run-checks`, because the sandbox is built inside the check rather than by a test. Repaired at `6607bd15`.

An earlier reading of this filed the exposure as growing with the corpus. That was wrong and is what the survey corrected: it grows only with the number of synthetic roots handed to refusal-printing code, which the shape of a gate holds near zero.
