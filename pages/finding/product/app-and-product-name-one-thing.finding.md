---
id: fd1df53b-7b50-58ce-b0a3-050fddb9d7c3
slug: app-and-product-name-one-thing
page-type-slug: finding
title: "App and product name one thing"
domain-slug: domain/global
---

# Claim

One concept carries two names across the layers: the interface says `app`, the domain system says `product`, and neither word reaches the other.

# Evidence

`app` stands in 31 Definition lines in the instructions repo, and carries at least two senses among them. In `ops-app` it is a routed public hostname — "every app declared in a tunnel-route manifest, with its hostname and the service behind it". In `alanwalton-ios` it is a phone shell — "the app on Alan's phone and the shell it runs in". Every mobile command takes `--app`, and `KNOWN_APP_SLUGS` in `tools/lib/mobile-vocabulary.ts` names alanwalton, atlas and smilingjenny.

`product` stands in one Definition line, `domains/product.md` — "a piece of software a person uses" — under `global`. Nothing declares it in `domain-parents-slugs`. Every per-product folder domain declares `code-repo` instead.

So the word the system speaks everywhere is undefined, and the word it defines is spoken nowhere.

The three iOS apps now stand as `ios-app` pages, which settles the phone-shell sense of `app` and leaves the routed-hostname sense of `ops-app` and the orphaned `product` untouched.
