# Formula name translations

Every page type whose `named-for` names its pages differently from the default, with the
formula that says what that `named-for` meant.

109 page types carry a `named-for`. 73 carry `"{slug}"`, the default. The 36 below name
differently. No page type inherits a non-default rule without stating one, so 36 is the whole
set of page types whose effective rule is non-default.

## What the translations rest on

`named-for` is not plain substitution. `page/name/naming/named-for.ts:16` puts the filled rule
through `pageStem`: NFKD-normalise, strip diacritics, remove apostrophes, turn every run of
non-alphanumeric characters into a dash, strip edge dashes, fold to lower case, bound at 100
characters. The formula language has no function that does any of this, so a formula answers
the raw joined text where the rule answers a stem. The "stems" flag marks each page type where
that difference shows on pages standing today.

`named-for` already answers nothing where a hole is unfilled. `filledBy` at
`page/name/naming/named-for.ts:39` returns null for the whole rule as soon as one hole is
absent, and `nameForNew` at `shared/pages-access/src/file-name.ts:127` throws. So the new rule
that a text literal answers absent is not a change of behaviour, and no page type is producing
a malformed name today.

Today's read path, `nameOf` at `page/name/naming/naming.ts:84`, falls through the rule to
`{slug}`, then to the stem of `{title}`, then to `{id}`. Where a hole below can be absent, the
proposed fallback is that chain rather than an invented one.

Both sides of `??` must be of one type: `{count} ?? "none"` over a number is refused
(`pages-system/formula/cases/refused-types-do-not-meet.ts:143`). So a number-valued rule
cannot take a text fallback.

A single hole with no text around it is a bare reference. A hole with text around it, or more
than one hole, needs a text literal.

## Translations

| Page type | `named-for` | Proposed formula | Pages | Flags |
| --- | --- | --- | --- | --- |
| `audhdalan-subscriber` | `{email}` | `{email} ?? {id}` | 3 | key optional; stems 3/3 |
| `calendar-event-source` | `{external-id}` | `{external-id}` | 1 | — |
| `character-build` | `{build-name}` | `{build-name} ?? {slug} ?? {id}` | 14 | key optional; stems 13/14; **collides** |
| `companion-build` | `{build-name}` | `{build-name} ?? {slug} ?? {id}` | 6 | key optional; stems 5/6 |
| `connection-activity` | `{title}` | `{title} ?? {slug} ?? {id}` | 25 | key optional; stems 25/25 |
| `error` | `{fingerprint}` | `{fingerprint}` | 340 | — |
| `gm-doctrine-pack` | `{external-id}` | `{external-id} ?? {id}` | 1 | key optional |
| `log-day` | `"{source-slug}-{date}"` | `"{source-slug}-{date}"` | 0 | **non-text**: `date` is `calendar-date` |
| `mobile-cut` | `"{app-slug}-{build-number}"` | `"{app-slug}-{build-number}" ?? {id}` | 0 | **number in text**: `build-number`; both keys optional |
| `notification-feed` | `{person-slug}` | `{person-slug}` | 1 | — |
| `person-access` | `"{person-slug}-{access-kind}-{target}"` | same | 15 | — |
| `person-authority` | `"{person-slug}-{authority-kind}-{target}"` | same | 10 | stems 2/10 |
| `persona-anchor-image` | `"{persona-slug}-anchor"` | same | 38 | — |
| `persona-cover-image` | `"{persona-slug}-l{relationship-level}"` | same | 38 | **number in text**: `relationship-level` |
| `pipeline` | `"{branch}-{commit}"` | `"{branch}-{commit}" ?? {slug} ?? {id}` | 0 | both keys optional |
| `seat-log-day` | `"{source-slug}-{seat-name}-{date}"` | same | 110 | **non-text**: `date` is `calendar-date` |
| `session-activity` | `{title}` | `{title} ?? {slug} ?? {id}` | 16 | key optional; stems 16/16 |
| `step` | `"{workflow-seq}-{name}"` | **cannot be written** | 0 | **cycle**: `{name}` is the property being computed; **number in text**: `workflow-seq` |
| `temper-account` | `{title}` | `{title} ?? {id}` | 4 | **absent on 1 of 4 pages** |
| `temper-account-character` | `{eso-character-id}` | `{eso-character-id} ?? {id}` | 29 | key optional |
| `temper-build-version` | `"{build}-{version-number}"` | **cannot be written** | 0 | **broken today**: neither key declared |
| `temper-companion-activation-buff` | `{key}` | `{key}` | 10 | — |
| `temper-companion-passive-metric` | `{key}` | `{key}` | 17 | — |
| `temper-companion-progress` | `{companion-id}` | `{companion-id} ?? {id}` | 8 | key optional |
| `temper-companion-skill-line` | `{key}` | `{key}` | 45 | — |
| `temper-companion-weapon-type` | `{key}` | `{key}` | 14 | — |
| `temper-completion-category` | `{key}` | `{key}` | 60 | stems 57/60 |
| `temper-dungeon` | `{key}` | `{key}` | 58 | stems 58/58 |
| `temper-eso-companion` | `{key}` | `{key}` | 9 | — |
| `temper-eso-companion-equipment-constant` | `{key}` | `{key}` | 24 | stems 24/24 |
| `temper-eso-player-equipment-constant` | `{key}` | `{key}` | 24 | stems 24/24 |
| `temper-inventory-chunk` | `"{inventory}-{chunk-index}"` | `"{inventory}-{chunk-index}" ?? {id}` | 455 | **number in text**: `chunk-index`; both keys optional |
| `temper-item-category-tree` | `{key}` | `{key}` | 439 | — |
| `temper-player` | `{title}` | `{title} ?? {id}` | 3 | key optional |
| `temper-watcher-enrolment` | `{account-user-id}` | `{account-user-id} ?? {id}` | 1 | key optional |
| `workflow` | `{seq}` | **cannot be written** | 0 | **non-text**: `seq` is a number and `name` is text |

Six page types have no pages on disk, so absence in them was judged from their declarations
rather than from files: `log-day`, `mobile-cut`, `pipeline`, `step`, `temper-build-version`,
`workflow`.

## How many page types need a number or a boolean written into text

Four page types are certain, each naming a key declared `type: number`:

- `persona-cover-image` — `relationship-level` inside `"{persona-slug}-l{relationship-level}"`, 38 pages standing, values 1 to 5.
- `temper-inventory-chunk` — `chunk-index` inside `"{inventory}-{chunk-index}"`, 455 pages standing, values 0 upward.
- `mobile-cut` — `build-number` inside `"{app-slug}-{build-number}"`.
- `workflow` — `{seq}`, the universal `page-seq`, standing as the whole of a text property rather than inside a literal. It cannot even be given a text fallback, both sides of `??` having to meet.

Two more depend on how a type not yet mapped to a formula value is read:

- `step` — `workflow-seq` is a `relation-seq`, which names a page by its number-typed `seq`.
- `temper-build-version` — `version-number` is not declared anywhere, so its type cannot be read.

So four certainly, six at most.

No page type writes a boolean into text.

The corpus already assumes this works and says it is unsettled:
`pages-system/formula/cases/case-form.ts:237` runs `"{count} of them"` over `count: num(3)`
and expects `"3 of them"`, commented "Filling a number into a text literal is not settled by
the specification".

Separately, `log-day` and `seat-log-day` write a `calendar-date` into a text literal.
`calendar-date` is not one of the six values in `pages/list/formula-values.list.md` at all, and
nothing maps a property type to a formula value.

## Holes that can actually be absent, and what to do

Only one absence shows on pages standing today:

- `temper-account` — 1 of its 4 pages carries no `title` at all
  (`pages/temper-account/019f99ae-d759-7c20-8bbc-bd1aa353a77a.temper-account.md` holds only
  `id` and `page-type-slug`). Recommend the fallback in the formula: `{title} ?? {id}`. The
  other three carry a uuid as their title, so the fallback changes nothing for them.

Fourteen more name a key that is optional in its declaration though every page standing fills
it: `audhdalan-subscriber`, `character-build`, `companion-build`, `connection-activity`,
`gm-doctrine-pack`, `mobile-cut`, `pipeline`, `session-activity`, `step`,
`temper-account-character`, `temper-companion-progress`, `temper-inventory-chunk`,
`temper-player`, `temper-watcher-enrolment`. For these, recommend the fallback on the key's own
definition rather than in the formula, so every formula reading the key is whole
(`pages-system/formula/cases/text-literals.ts` shows both ways out).

The remaining page types name only keys declared `required: true`, or universal keys their
pages all carry, and need nothing.

## Flags

- `step` — `"{workflow-seq}-{name}"` names `{name}`, which is the universal computed property this formula produces; a cycle, refused when the page type is checked.
- `temper-build-version` — `"{build}-{version-number}"` names `build` and `version-number`; the page type declares neither and neither is universal, so it is refused at check and broken today.
- `workflow` — `{seq}` is a number standing as the whole of a text property, and cannot be said at all without a way to write a number as text.
- `character-build` — names already collide: 8 pages stem to `new-build`, 2 to `zzverify-planclerk`.
- All 36 pass through `pageStem`, which the language cannot express. 30 have pages standing; on 10 of those the stem differs from the raw joined text, so those 10 change name unless stemming is kept outside the formula.
