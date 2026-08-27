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

Where to look now the instructions repo has become akasha: `ops-app` is gone and that sense with it. `tools/lib/mobile-vocabulary.ts:7` still declares `KNOWN_APP_SLUGS`, now derived by `knownAppSlugs()` from `alanwalton/mobile-cli/src/lib/apps.ts`, and `APP_FLAG` at :11 still puts `--app` on every mobile command.

`product` stands in one Definition line, `domains/product.md` — "a piece of software a person uses" — under `global`. Nothing declares it in `domain-parents-slugs`. Every per-product folder domain declares `code-repo` instead.

Where to look now: that document is `pages/domain/products.domain.md`, slug `products`, still under `domain/global`, and it now reads "what this system makes for people to use". It is no longer an orphan — `supported-products`, `internal-products` and `discontinued-products` each carry `domain-parent-slug: domain/products`. No page carries a `code-repo:` key any more.

So the word the system speaks everywhere is undefined, and the word it defines is spoken nowhere.

The three iOS apps now stand as `ios-app` pages, which settles the phone-shell sense of `app` and leaves the routed-hostname sense of `ops-app` and the orphaned `product` untouched.

The two words still name one thing, and the sharpest instance is now a single line: `pages/page-property-definition/error-app.page-property-definition.md` declares `key: app` on the `error` page type and defines it as "the product it broke in". Its sibling `pages/page-property-definition/nav-app.page-property-definition.md` carries the same `key: app` and defines it as "the app whose navigation a nav item sits in". Nothing declares the two words the same.
