---
id: b8a8c633-36c8-5f24-8f51-e5b82c77d4e2
page-type-slug: finding
title: "Mode refusal unreachable"
domain-slug: domain/global
---

# Claim

`ops page patch` carries a `--mode` refusal message that no invocation can reach, the help block's declared `choices` having already refused the same input with different words.

# Evidence

The verb declares `choices: ["prepend", "append", "find_replace"]` on `--mode`, so the standing parser refuses anything else before the body runs. The body then re-checks the same three values and raises its own message.

Measured before this namespace landed:

    ops page patch <id> --mode nope --body-file body.json
    exit 1 — `--mode: invalid value "nope" (expected one of: prepend, append, find_replace)`

That is the parser's wording. The body's own — `(expected "prepend", "append", or "find_replace")` — appears in no run.

The check is still load-bearing as a type narrowing: it is what proves the switch over the three operations exhaustive, which is why the switch needs no default arm. What is unreachable is only the message, and it was carried across the body move unchanged rather than repaired, a change made while moving being indistinguishable from the move.
