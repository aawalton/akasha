---
id: 01a04615-305f-7b56-995d-0efcc02c79c6
page-type-slug: all-about-alan-topic
title: "What I Gave Up Leaving Postgres"
slug: what-i-gave-up-leaving-postgres
topic-parents-slugs: why-i-keep-my-data-in-files
---

# Definition

- **What I Gave Up Leaving Postgres** — the trade I actually made moving my data out of a database and into files

# Design

I have not really given up anything so far, except the convenience of having things like indexes and caching already built.

Postgres is ultimately built on files anyway, so I am effectively rebuilding a similar system with a different set of constraints.

In most cases performance has improved overall.

Getting full version history from git by default has been really nice, and we have built an opt-out for cases that do not need it and move too fast.

Reusing the git content caches is also really nice.

# Questions

Robust indexing and caching, a formula expression language, a query language and a service to make the store reachable from outside are all still being built.

The query language is there to replace what a traditional database does well without holding the data in two separate places and taking the skew risk. Whether one store serves both the known-item question and the search at scale is not yet shown.

Which cases take the version-history opt-out, and what makes them too fast for it, is unwritten.
