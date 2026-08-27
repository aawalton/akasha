---
id: 30d87dc7-92a9-57eb-a8e0-7789d551b3d5
page-type-slug: finding
title: "Project commit drops hash subject"
domain-slug: barred-meaning/project
---

# Claim

`ops project commit` silently drops a commit message's subject line when it begins with `#`.

# Evidence

Git treats a line beginning with `#` as a comment and strips it from a message supplied by file, which is what `--message-file` supplies. A subject written `#18243: a project's status stands on its document` therefore never reaches the commit, and what lands as the subject is the first line of the body — a paragraph. Nothing reports it: the verb exits 0, prints the SHA, and records it on the row.

Observed on #18243, twice in one run. Both commits landed with a paragraph as their subject, and the loss was found only by reading `git log --oneline` afterwards. The same run's neighbours on main carry `18233:` and `18246:` prefixes without the `#`, so the convention that avoids this is already in use and undeclared — which is what leaves each new author to rediscover it.

The seq is the one thing a project's commits most want in their subject, and `#<seq>` is how every other surface spells a project, so the failing spelling is the one a writer reaches for first.
