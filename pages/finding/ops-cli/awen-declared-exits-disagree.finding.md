---
id: 74accae4-babe-54a7-8bf4-9d3003e8717e
page-type-slug: finding
title: "Awen declared exits disagree"
domain-slug: domain/ops-cli
---

# Claim

Three `ops awen` verbs declare an exit code in their help block that the running verb does not produce. The help is the caller-facing contract, and in each case it names a code the body never raises.

# Evidence

Measured 2026-08-13, capturing every invocation of nineteen `awen` verbs before and after moving their bodies into the instructions repository, at instructions commit `cbc4fd1c5`. Each case below was run and its exit code recorded, against the delegating verb at commit `2cafb9ddd` and against the moved body; both produce the code named here, so this predates the move and survived it unchanged.

`ops awen publish-turn` declares `{ code: 2, meaning: "No such game, ..." }`. A game that is not there exits **70**. `resolveGameForPublish` in `packages/alanwalton/awen/src/awen/publish-turn.ts` raises a plain `Error`, which `exitCodeForThrowable` classifies as nothing and reports as an unhandled defect. The missing-TURN refusal beside it is a `DataError` and does exit 2, so the two halves of one declared line disagree with each other.

`ops awen update-game` declares `{ code: 1, meaning: "Malformed flag JSON" }`. A malformed `--display-config`, `--gm-context`, `--gm-reference` or `--spec` exits **2**: `readJsonValue` in `game-verb-shared.ts` raises a `DataError`.

`ops awen update-display-defaults`, `update-doctrine-pack` and `update-reveal-spec` each describe `--content` as "(required)" in the flag's own description while not declaring `required: true`. The parser therefore admits an invocation with no `--content`, and the body refuses it as a `DataError` at 2 — so a caller reading the description expects the parser's exit 1 for a missing required flag and gets 2.

Not measured: whether any caller or script branches on these codes. Nothing was changed — a refusal's class is what decides its exit code, and altering one while moving a body would be a behaviour change indistinguishable from the move afterwards.

Raised by the `move-command-bodies` run over the `awen` namespace, which had to preserve each code exactly and so had to read every one of them.
