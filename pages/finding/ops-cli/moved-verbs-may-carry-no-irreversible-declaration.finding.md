---
id: 73807cab-9c25-52b2-b764-ff34f83a53a1
page-type-slug: finding
title: "Moved verbs may carry no irreversible declaration"
domain-slug: domain/ops-cli
---

# Claim

`ops contacts delete` removes a contact from Alan's address book and declares no `irreversible:`, though `CommandHelp` admits one. It is unlikely to be the only verb in that position, and nothing measures the set.

# Evidence

Found 2026-08-13 by the seat moving the `contacts` bodies, which left the help exactly as it stood: step 4 of `move-command-bodies` says a change made while moving a body cannot be told from the move, so declaring it there would have hidden it inside a diff about something else.

That is why this is filed rather than fixed. The narrow case is one flag on one verb. The question it opens is whether the 520 landed surfaces carry `irreversible:` wherever the act is irreversible, which no check asks — and the surfaces were landed byte-identical to the code repository's, so whatever was missing there is missing here.

`domains/role.md` carries the Irreversibility rule, which says to look at what an irreversible act lands on before making it. A declaration is how a verb tells a reader which class it is in; absent, the reader is left to infer from the name.
