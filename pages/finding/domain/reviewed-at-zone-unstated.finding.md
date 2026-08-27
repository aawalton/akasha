---
id: 8abfcd2c-eb29-5144-8a49-f5a2fc702fd8
page-type-slug: finding
title: "Reviewed at zone unstated"
domain-slug: page-type/domain
---

# Claim

Twelve `reviewed-at:` records under `domains/` carry the UTC day rather than the local day their commit was made on, against a corpus that records the local day 405 times to 13 in the same window. Nothing states which clock the key runs on, so a seat stamping after local evening has no way to get it right except by measuring the corpus.

# Evidence

Measured over four days of `domains/`, counting every added `reviewed-at:` value against its own commit's local day and UTC day, on the commits where those two differ:

    git log --since="4 days ago" --format="C|%H|%at" -p -- 'domains' | awk -F'|' '
    /^C\|/ {t=$3; next}
    /^\+reviewed-at: / {v=$0; sub(/^\+reviewed-at: /,"",v);
      loc=strftime("%Y-%m-%d",t); utc=strftime("%Y-%m-%d",t,1);
      if (loc==utc) print "same\t"v"\t"loc; else print "SPLIT\tvalue="v"\tlocal="loc"\tutc="utc;
    }' | sort | uniq -c | sort -rn

Value equal to the local day: 405 records. Value equal to the UTC day: 13. The decisive group is 376 stamped `2026-08-13` by commits made when UTC already read `2026-08-14` — seats crossing UTC midnight and recording the local day regardless.

Of the 13, eleven landed on the night of 2026-08-12 and two on the night of 2026-08-13: `a79501cb8` on `domains/category-rule.md`, and `c5a123d72` on `domains/commands/ops-graph-off-workstation.md`. The second was mine and is reverted at `708d1583`; the other twelve stand.

What makes the mistake available: `ops instructions read` timestamps its records in UTC, so a seat reading its own record after local evening sees tomorrow's date with nothing to contradict it. `tools/document/schemas/domain.ts` declares the key as `{ type: "date" }` and names no zone. `tools/stale-reviews.ts` reads the value only through a pickaxe on the record line, never comparing it to a commit date, so it cannot catch a wrong one.

Not repaired here. Reverting a stamp lowers a document's recorded review currency and can name it as owed, costing a re-reading of something already read; establishing that cost is nil takes a per-document check, and these twelve belong to other seats' readings. On the one I did revert the cost proved nil: `bun tools/stale-reviews.ts` does not name it, the pickaxe finding `9776559`, which created the document already stamped.
