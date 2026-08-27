---
id: 3292b37b-9bf9-5a23-aaef-d7156af092c6
page-type-slug: finding
title: "Select none arm refused"
domain-slug: domain/pages-system
---

# Claim

A property typed `select(...) | none` admits `none` in its own definition but refuses it on a page, and the refusal message lists `none` among the values it will take.

# Evidence

Measured 2026-08-18, landing `properties/seat-conditions-effort-level.md` and `seat-conditions-current.md` in the instructions repo.

The property definition carried `type: select(slug) | none`, `required: true`, and a `values:` list of `auto`, `low`, `medium`, `high`, `xhigh`, `max`. Every gate passed and it landed at commit `281e320a`.

Writing `effort-level: none` onto the page it defines was then refused by `page-holds-properties`, one key of six:

    `effort-level: none` is not one of a stated set, a kebab-case slug or `none`, one of
    `auto`, `low`, `medium`, `high`, `xhigh`, `max`, which is what `select(slug) | none`
    narrowed on `seat-conditions` states

The message names `none` as admissible in the same sentence that refuses it, so the two halves are computed from different readings of the type.

The `| none` arm holds for other base types. `properties/seat-conditions-subagent-model.md` states `type: text | none` with `required: true`, and `seat-conditions-current.md` carries `subagent-model: none`, which landed at `92f782d2` under the same gate in the same call that refused the select. `path | none` and `relation-slug | none` also stand in `properties/`, so the arm is spelled and used.

Worked around at commit `059917bf` by dropping the arm to plain `select(slug)` and folding `none` into the `values:` list. That lands, and the value reads correctly, but it spells the sentinel as an ordinary member of the set — which `page-property-type-none.md` distinguishes, holding that a property admits `none` only where its type says so.

Not measured: whether the fault is in parsing the type or in checking the value; whether `path | none` and `relation-slug | none` were ever exercised with an actual `none` on a page; whether any other stated set in `properties/` is carrying this workaround already.
