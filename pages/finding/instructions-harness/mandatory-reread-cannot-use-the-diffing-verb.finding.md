---
id: 8aed4dfa-7a0e-5666-aed3-cb54af8f0dae
page-type-slug: finding
title: "Mandatory reread cannot use the diffing verb"
domain-slug: domain/global
---

# Claim

The mandatory re-read notice refuses the shell along with the next act, so `tools/read.ts` — the verb that prints only what changed and records the read — is unavailable, and the whole body must be re-read through `Read`. A one-key frontmatter change cost a 67-line re-read.

# Evidence

Measured 2026-08-06, first-hand, four times during one perimeter pass: three on `domains/domain.md` and one on `domains/global.md`.

The notice reads: "Your next act is refused until you have re-read them, and the shell is refused with it — your attributes name what moved, so `Read` is the way through and no command is one: Re-read all 67 lines of /home/walton/instructions/domains/global.md".

Two things follow from refusing the shell. `bun ~/instructions/tools/read.ts` is a command, so it cannot be used — and that is the verb whose own behaviour is to print only what changed since the seat last read the file, and to record the read. The native `Read` prints the file.

The cost, measured on the fourth notice: the only difference between the two bodies of `domains/global.md` was one frontmatter key, `default: true`. The notice required all 67 lines, and finding the change meant diffing by eye against memory — which is the thing the notice says is unreliable.

The contrast is visible inside the same pass. When a schema staled under me, the door refused through the ordinary path and I re-read with `tools/read.ts`, which printed exactly this and nothing else:

    -import { Entry, Record, once } from "../tokens.ts"
    +import { LG, XXL, once } from "../tokens.ts"

Same need, same repo, one path shows the delta and the other cannot.

This is a different mechanism from the one recorded at `pages/finding/instructions-harness/pinned-surface-rewrite-is-discretionary.finding.md`, measured 2026-08-04: that notice carried a diff and was wrapped in language making the re-read discretionary. This one carries no diff and is enforced. I did not retire that finding, because I only have evidence about the path I hit — whether the discretionary path still exists for other surfaces was not measured.

Not established: whether the shell is refused to prevent a seat acting before re-reading, in which case a read-only exemption for `tools/read.ts` would be the shape of a repair rather than lifting the refusal.
