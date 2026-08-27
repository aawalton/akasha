---
id: 9305e31f-ad8a-5a94-bba2-976bb8125164
slug: throwaway-scan-outside-negative-control
page-type-slug: finding
title: "Throwaway scan outside negative control"
domain-slug: domain/instrument
---

# Claim

`Negative Control` binds an instrument — code kept to be run again — and nothing binds a one-off scan whose answer goes straight into a decision, which is the form every silent all-clear this week actually took.

# Evidence

`pages/domain/instrument.domain.md` already carries it: "Make an instrument fail before you trust it. Show it the case it must catch while you build it." That is the whole rule and it is right.

It binds an instrument, defined a line above as "code kept to be run again, to find out what is true." A shell pipeline written to settle one question and thrown away is not that. It is read once, believed once and deleted, so the principle does not reach it.

Four failures in one night, every one a throwaway scan:

- Ported tests matched by filename stem inside `if ls | grep -q`. Under `pipefail`, `grep -q` exits on its first match, `ls` dies of SIGPIPE, the pipeline reports failure, and every match read as a miss.
- Four verbs grouped as one population for sharing a flag name, when one takes attribute slugs a caller invents and the other the row's own schema fields.
- Reach into the code repo measured at one hop and reported as "nothing reaches the registry any more", while a surviving module reached it at two.
- A prefix stripped as `/home/walton/code/` from paths beginning `/var/home/walton/code/`, leaving every target as `/varpackages/…`. The intersection of two lists that cannot overlap is empty, and empty was the expected answer.

The last is sharpest: the first three were wrong keys, this one the right key with a broken comparison, and both fail identically — silently, cleanly, agreeing with the author. It was caught only because a case it was obliged to find had arrived from elsewhere. With no known positive in it, it would have shipped a false all-clear into a deploy deleting 743 files.

The asymmetry is what makes this a rule rather than care. A scan returning hits is self-checking: the reader looks at them and a wrong one shows. A scan returning nothing is unfalsifiable from its own output — blind, broken, wrongly keyed and genuinely clean are one result.

Filed rather than written because it changes a domain and may be the wrong shape: a widening of `Negative Control`, a rule of its own, or a line elsewhere.

Still unwritten on 2026-08-27. `Negative Control` stands on `pages/domain/instrument.domain.md` over the same definition — "code kept to be run again, to find out what is true" — and `one-off`, `throwaway`, `thrown away`, `scan returning nothing` and `all-clear` across all 1162 tracked `*.domain.md`, `*.page-type.md`, `*.command.md` and `*.role.md` pages reach only unrelated senses of the word.
