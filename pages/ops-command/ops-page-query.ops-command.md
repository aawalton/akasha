---
id: 3acf3e3f-6d56-57c1-9434-dc07bd917b9b
page-type-slug: ops-command
title: "Ops page query"
slug: ops-page-query
domain-parent-slug: domain/ops-page
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/page/query.ts
path: page query
---

# Definition

- **Ops page query** — one named page query's answer, as JSON.

# Design

A query is named rather than a file reached for.

A query naming no `keys:` carries every value except the attachments, and names those it left out.

A query is answered only once every argument it names under `takes:` is given.

A property a query names that cannot be worked out refuses the query rather than answering it.

# Help

Runs the page query standing at `pages/page-query/<name>.page-query.md` and prints its answer. This is how
anything asks a question of these pages: it names a query rather than reaching for a file, so
what the answer is made of stays settled in the query.

The answer is `{ "n": <matched>, "rows": [ { "at": …, "values": { … } } ], "groups": [ … ],
"value": …, "over": … }`. A key a query names under `keys:` arrives in `values`, including
one whose property is declared an attachment — its value is read from the file beside the page.

A query naming no `keys:` carries every value except the attachments, which are read only when
asked for by name. `omitted` names the attachment keys such an answer left out, so a value
standing in a file beside the page reads as stated absence rather than as nothing being there.

A query naming arguments under `takes:` is answered only once every one is given. Each is
typed there, checked against that type, and bound where the query writes `$<name>` in a test.
A list argument takes commas or a repeated flag.

A query is refused rather than answered where a property it names cannot be worked out, or
where the property it reduces under `target:` is declared by nothing on its page type. Both
would otherwise come back as a clean number no reader could tell from a real one.
