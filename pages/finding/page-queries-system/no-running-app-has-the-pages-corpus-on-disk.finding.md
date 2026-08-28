---
id: d91f3877-89ec-5297-88e3-e208ff6361c8
page-type-slug: finding
slug: no-running-app-has-the-pages-corpus-on-disk
title: "No app running today clones akasha, so none has the pages corpus the read half was closed on"
domain-slug: domain/page-queries-system
---

# Claim

The reason the pages system service initiative gives for having no read half — that each pod`s init container clones akasha, so `pages/` stands on its own filesystem — holds for no app running today. All six deployed web apps clone `alan/code.git` rather than akasha, and carry no `pages/` directory at all. Their server-side page reads dial the deleted `page-query-service` with no local corpus to fall back to.

# Evidence

Measured 2026-08-28 against akasha main at `ef29bc413d`, read-only against the live cluster.

`kubectl` over the six app deployments — `alanwalton/web`, `alanwalton/atlas`, `temper/web`, `audhdalan/web`, `archive-of-worlds/web` and `smilingjenny/web` — gives the same two readings for every one: a `workingDir` under `/app/repo/packages/`, and an init container cloning `alan/code.git`. Not one clones `alan/akasha.git`.

In `web-874d9684f-jcxg6`, up 2d11h: `/app/repo` stands at `7af7b4464c`, its `remote.origin.url` is `.../alan/code.git`, its top level holds `packages/` and no `pages/`, and `ls /app/repo/pages` exits 1 with `No such file or directory`. In akasha, `git cat-file -t 7af7b4464c` answers `Not a valid object name`, so the commit the pods run is in no akasha history.

The repository already says otherwise, and that is the gap: `alanwalton/web/generated/web-deployment.generated.yaml:213` clones `alan/akasha.git` into `/app/repo`, and `:122` sets `workingDir: /app/repo/alanwalton/web`. So the corpus arrives at each app`s next deploy, as `pages/initiative/astra-pages-system-service.initiative.md:22` states. Until that deploy the premise is false rather than pending, and the read half is closed on a condition nothing has yet met.

Not measured: how often any of the six reads pages server-side, and whether `code.git` still receives commits.
