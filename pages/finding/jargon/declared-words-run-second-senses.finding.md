---
id: c2f28538-0b2e-5511-97a2-7540d38274bc
slug: declared-words-run-second-senses
page-type-slug: finding
title: "Declared words run second senses"
domain-slug: barred-meaning/jargon
---

# Claim

`domains/jargon.md` intends that a word declared as a domain carries that one sense on every document using it, and at least two do not. `recorder` is declared as a role — what a principal's live agent leaves behind in a corpus — and names a file-logging hook in a gate's live refusal message. `handler` is declared as one external human's inbound path and names an error handler in a hook script. The collision surface is wider than the single-word slugs: compounds collide too, as ordinary prose.

# Evidence

Measured 2026-08-07 closing the `declared-vocabulary` initiative, over `domains/**` and `tools/**`, excluding `dirty/`, `personas/` and `retired/`.

THE TWO CONFIRMED, each read at its site rather than taken on report.

- `recorder`. `domains/roles/recorder.md` declares "what a principal's live agent leaves behind in a corpus". `tools/gates/read-before-write.ts:64` returns "nothing is recording reads at ${logDir()} — the recorder hook is not installed, so CLOBBER PREVENTION IS ABSENT and a concurrent write will revert silently". That is a live refusal a seat reads at runtime, not a comment.
- `handler`. `domains/roles/handler.md` declares "one external human's inbound path, kept private to them". `tools/hooks/block-substituting-backtick.sh:54` reads "Nothing that can fail may run ahead of its own failure handler" — the ordinary programming sense.

ONE DISCOUNTED. `companion` was reported as a third: `create-persona-voice.md:18` says "another's companion animal", a fixed English phrase for a pet. A reader takes the ordinary sense and is right, so it is not the hazard `Plain Or Declared` names.

THE COVERAGE IS THE PART THAT MATTERS. 434 files declare a `domain-slug:`. A delegate triaged the single ordinary English words on the assumption that a compound cannot collide, read 17, and reported its population as 65; the true count of unhyphenated slugs outside personas and retired is 81. So a fifth of even the easy part was read, and its clean stretches cannot be told from unread ones.

THE ASSUMPTION UNDER THAT DENOMINATOR IS FALSE, tested rather than argued. Compounds collide as ordinary prose: `seat name` stands in nine files, `code check` in two, and `task body`, `domain design` and `agent life` in one each, each also a declared slug. So the population is not 81 and I did not establish what it is.

WHAT I DID NOT MEASURE. I did not enumerate the full population, read the other 64 single-word slugs, or check whether any compound's sites carry the declared sense — nine files saying `seat name` counts candidates, not collisions.
