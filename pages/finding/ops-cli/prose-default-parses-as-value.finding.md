---
id: aa9c95fc-4646-5a58-827a-1caabf32c345
slug: prose-default-parses-as-value
page-type-slug: finding
title: "Prose default parses as value"
domain-slug: domain/ops-cli
---

# Claim

A flag whose help declares a prose `default:` hands that prose back as the flag's VALUE when a moved body asks the standing parser for it, so a body that reads the flag and falls back gets the sentence describing the fallback instead of taking it.

# Evidence

`ops deletion-residue` declares `--instructions-root` with `default: "$INSTRUCTIONS_ROOT, else ~/instructions"`, which describes a fallback chain rather than naming a directory. `tools/lib/parse-args.ts:276` returns `def?.help.default` from `string()` whenever the flag is absent, and `parse-args.ts:277` routes it through `expandTilde` where the flag also declares `path: true`. So `parsed.string("--instructions-root")` on a bare invocation returns the literal string `$INSTRUCTIONS_ROOT, else ~/instructions`, which is not a path and is not undefined.

The pre-move body could not meet this: it parsed through `infra/cluster-checks/src/lib/cli-args.ts`, which knows nothing of the ops help block and returns `undefined` for a flag nobody passed, so the `?? optionalEnv("INSTRUCTIONS_ROOT") ?? join(homedir(), "instructions")` chain behind it ran as written. The trap appears only when the body moves onto the standing parser.

It is silent in both directions. A body that takes the prose as the root scans a directory that is not there, and `deletion-residue` reports an unreachable carrier as a first-class state on an exit-0 run — so the wrong root prints as a clean report rather than as a failure. Nothing in the declaration marks a `default:` as prose rather than as a value; the same key carries both — `readonly default?: string` on `HelpFlagCommon` at `tools/ops/surface.ts:12`.

Measured at `tools/commands/deletion-residue.ts` while moving its body: the landed verb compares the parsed value against the declared default read back off its own help block and treats a match as absent, which is a guard each moved verb would have to spell for itself.
