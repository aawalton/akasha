---
id: 9a223669-2d47-55aa-8022-784f9159e187
slug: refusal-exits-unclassified
page-type-slug: finding
title: "Refusal exits unclassified"
domain-slug: page-type/person-access
---

# Claim

A person-access refusal reaches a CLI caller as exit 70, the unclassified-error code, so a caller cannot tell "you may not reach that page type" from a crash.

# Evidence

Observed on 2026-08-10 while verifying project #18341, which made a person's page-type access a row a guard reads and introduced `PersonAccessRefused`.

The importers throw `PersonAccessRefused` past the CLI's error classifier, so `ops book import` exits 70 on a refusal. The message is exact and nothing is written. The retired registry threw a plain `Error` and exited the same way, so the behaviour is preserved rather than introduced by that project, and its criteria did not reach it.

What makes it worth recording now is that the class of error changed meaning. Before, exit 70 covered an account nobody had configured — a setup gap. Now it also covers a deliberate refusal by an access record, which is a decision the system made and can explain. A caller scripting against these verbs sees one code for both, and for the refusal case the right handling is different: not retry, not report a fault, but tell the person they do not hold that access.

Giving refusals a classified exit means catching in each collection's command module, which is why it was out of scope for the project that surfaced it.
