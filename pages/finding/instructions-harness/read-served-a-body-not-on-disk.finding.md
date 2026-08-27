---
id: 250620ee-ee35-5d65-9a11-cdbb4eb270b2
page-type-slug: finding
title: "Read served a body not on disk"
domain-slug: domain/global
---

# Claim

`tools/read.ts` served a body two lines longer than the file on disk, and stamped the reading with a time exactly six hours ahead of that file's modification time, on two files in one call.

# Evidence

Observed 2026-08-15 while editing the category rule corpus.

One call named eight files. For `page-types/category-rule-order.md` it printed "the whole file follows, 24 lines" and gave line 24 as "The last rule in the order matches everything." For `domains/category-rule.md` it gave line 22 ending "and its transaction goes to the last rule rather than to the next one."

Neither line was on disk. Commit `c49b731c0` had already struck the first and rewritten the second, and `git status` was clean. The file was 22 lines, not 24.

I composed two edits against that body. Both were refused for having no match, which is the gate working — but the refusal is the only thing that caught it, and a composer whose text happened to match anyway would have landed against a body it never read.

The stamps are the part I cannot explain away. A later call reported `page-types/category-rule-order.md` as "unchanged since you read it at 2026-08-15 17:34:02" and `domains/category-rule.md` at 17:37:10. Their modification times are 11:34:02 and 11:37:10. Six hours to the second, on both, and this machine is at UTC-6.

Against that: the same tool correctly reported six other documents as CHANGED SINCE YOU READ IT during this session, each modified within the preceding hours, and it now reports the file at its true 22 lines. So whatever this is, it is not a plain skew that would report everything unchanged.

Not measured: the mechanism. I did not read `tools/lib/read-log.ts`, `read-one.ts` or `governs-read.ts`, and I did not try to reproduce it. Whether the stale body and the six-hour stamp are one fault or two is open, and so is whether a body has ever been served stale to a composer whose edit then matched.
