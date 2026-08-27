---
id: 1c562126-d457-5ace-8fc0-7cc39b2843fa
slug: name-blames-the-attributes-for-the-flex
page-type-slug: finding
title: "Name blames the attributes for the flex"
domain-slug: domain/agent-harness
---

# Claim

`seat --name` given a malformed `--flex` blames the attributes, which were right.

# Evidence

`tools/lib/seat-flex.ts` exports `refuseFlex`, whose message names the shape a flex value must take. `tools/seat.ts` calls it on the stating path and not on `--name`.

On `--name`, a flex failing `FLEX.test` makes `tools/lib/compose-seat-name.ts` return `null`, and `tools/seat.ts` speaks that `null` as `these attributes spell no name — state a persona, a domain, a role or a seq`. The caller is sent to look at the persona, domain and role, each of which was accepted, while the segment that was refused goes unnamed.

A spawn asks `--name` before it holds a row, so this is the reading a launcher gets.
