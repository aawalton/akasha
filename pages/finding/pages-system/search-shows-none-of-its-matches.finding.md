---
id: 8ba9faf2-1ced-53c7-b800-fe9286133688
page-type-slug: finding
title: "Search shows none of its matches"
domain-slug: domain/pages-system
---

# Claim

`ops page list --search` can match rows and print none of them, exiting 0, with a warning that reads as "too many to show" rather than "your matches were withheld". Measured: `--search "Where have I been"` over `--type project` displays zero rows while `--count` on the same search returns 1 and `--all` returns the row. A seat checking whether a project umbrella is live gets a clean, believable absence from the verb that exists to answer that question.

# Evidence

Measured 2026-08-08 in a headless seat running `ingest-instructions`, checking whether "project umbrella #15549", named by a quarantined head document, still resolved.

Three runs against one search:

    ops page list --type project --search "Where have I been"
    ⚠ result truncated: showing 0 row(s); more match. Use --all to stream every
      row, --count for the total, or --cursor <next_cursor> to page.
    exit=0

    ops page list --type project --search "Where have I been" --count
    1

    ops page list --type project --search "Where have I been" --all
    019f6930-5947-724f-b08b-2ad9b8f2643a  #15549 Where have I been — location
      traces + coverage vs target corpora (umbrella)

The default path displayed zero of ONE match. `--search 15549` and `--search location` behave the same, each printing the identical warning and no rows.

WHY THE WORDING COSTS. "showing 0 row(s); more match" reads as the ordinary truncation notice — a page bound hit, the rest behind `--all`. It is not: the bound withheld every row there was. Nothing distinguishes "the first page of many" from "all your matches, none shown", and the exit is 0 either way.

The direction is the expensive one. The estate's standing guidance is that a live carrier is often a database ROW rather than a file, and that a repo search returns an honest-looking nothing for one. `ops page list --search` is the verb that guidance points at. A seat following it correctly gets the same false absence it was sent there to avoid — and under a task whose ruling is to lean toward removal, a false absence is a cut.

I nearly recorded #15549 as a dead pointer on the first run. What found it was `ops page list --type project --properties externalId,title --all | grep -w 15549`.

NOT MEASURED: whether this holds for other `--type` values or without `--type`; whether the bound applies before or after the search predicate; how many standing verdicts rest on a bare `--search`.
