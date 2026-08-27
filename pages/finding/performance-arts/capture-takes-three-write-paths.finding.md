---
id: 075a1dad-d047-5c76-955f-3d815934eab2
slug: capture-takes-three-write-paths
page-type-slug: finding
title: "Capture takes three write paths"
domain-slug: domain/performance-arts
---

# Claim

Capturing one song's read takes three write paths at three privilege tiers, and the cost falls mid-session. `ops music rate` writes `rating` and the prose fields; `singability`, `tags` and `emotions` are not flags on it at all and go through `ops page update`; adding a new `tags` option needs `ops property-definition update`, because the option set lives on the property definition rather than the page. So the friction is paid live, between a song and its dissection.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/performance-arts/rulings.md`,
which recorded the same three paths on 2026-07-27. Nothing has consolidated
since; I read the verbs rather than the prose about them.

`ops music rate --help` takes exactly `--target`, `--id`, `--rating`,
`--reaction`, `--personal-connections`, `--insights`, their `-file` variants
and `--json`. There is no `--singability`, no `--tags` and no `--emotions`, so
the three capture axes are unreachable from the verb built for capture.

`ops property-definition` is its own command group — create, delete,
hard-delete, list, show, undelete, update — and its create is described as
going "via the elevated property_definition_create RPC". A `tags` option is
part of the definition's `config.options`, not the page's value, which is the
same surface `ops audit rating-scale-drift` reads when it compares "the live
`config.options` of the three page-type SELECTs bound to the music rating
scale". So growing the tag vocabulary is a definition-tier act while recording
the tag is a page-tier one.

Why the placement matters, and it is the whole of the cost. All three writes
land during a listening session, between a song and its dissection — the one
window the loop exists to protect. `dirty/skills/performance-arts/SKILL.md:141`
makes this its fourth ranked principle, "The ledger never interrupts the talk",
and states that capture belongs "at the natural beat ... never sandwiched
between her response and the next song, because the point of the pause is that
her response is the last thing in the window." The tooling requires the
opposite of what the practice asks for.

This is filed as the engineering observation only. Whether to consolidate the
paths is unasked, and the status note attached to it in the source — that the
lead had named it a define-front candidate — is work-state, which that document
said itself is queried from rows and never written down.
