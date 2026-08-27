---
id: 63b71c19-cccf-5078-a31a-c0988f03b527
page-type-slug: finding
title: "Force fail step field ambiguity"
domain-slug: page-type/pipeline
---

# Claim

`ops pipeline force-fail-step`'s `--exit-code`/`--fail-reason` write into the same fields the engine uses for observed data (`failReason`'s other values -- PodDeleted, OutOfcpu, capacity-starved:<node> -- are engine-made; default exit-code 137 is indistinguishable from a real SIGKILL), so an operator's typed guess and an engine's measurement are byte-identical on read, and a downstream reader treats the guess as evidence.

# Evidence

Project #16416 (someday_maybe, pipeline). Captured, never defined; this text is the capture, moved off the row's retired `notes` attribute 2026-08-15.

Observed force-failing a wedged CI step: `bun ops pipeline force-fail-step --pod <pod> --exit-code 137 --fail-reason WedgedSyscallSpin`. Both are operator-supplied, not measurements. `exitCode 137` was typed; the help says "(default 137, SIGKILL -- truthful for an operator-terminated step)" -- no kernel signal occurred. `failReason WedgedSyscallSpin` was the filer's hypothesis; the field's other occupants (PodDeleted, OutOfcpu, capacity-starved:<node>) are engine observations.

The dispatched worker read both as system evidence, building an OOM hypothesis on the 137 ("terminal SIGKILL... Reclaim thrash ends in an OOM kill, which is what 137 is") and independently concluding the engine had a spin detector. After retraction: "I DID read it as data; it is in my notes as 'the engine has a detector for this condition,' which was wrong." Its diagnosis: "That is a defect in the field, not in you: a column that accepts both a measurement and a conclusion will get read as a measurement every time."

Neither was the weak link: the filer knew it was a guess; the worker was careful (caught its own `$?`-captures-`head` error, refused to let a clean local run stand for an untested CI path). The column has no provenance slot: a conclusion and an observation are byte-identical on read -- same shape as the BY-WHOM failures on #16344, a true reading, its source silently substituted, via a schema not a relay.

Suggested, not binding: separate the two structurally -- engine observations keep `failReason` closed; operator terminations get a distinct field (`operatorNote`) plus marker, `force-fail-step` writing there by construction. If one field stays, constrain it to a closed, non-diagnostic vocabulary (`OperatorTerminatedNoProgress` states what was done, not why). Related: `--exit-code` defaulting to 137 is the same problem, smaller.
